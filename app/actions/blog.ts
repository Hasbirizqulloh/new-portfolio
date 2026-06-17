"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

/**
 * Mengambil semua blog post untuk Admin
 */
export async function getAdminBlogs() {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  try {
    return await prisma.blogPost.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
    return [];
  }
}

/**
 * Menyimpan atau memperbarui blog post
 */
export async function saveBlog(data: any) {
  const session = await auth();
  if (!session) return { success: false, error: "Unauthorized" };

  const { id, title, slug, content, excerpt, coverImageUrl, category, isFeatured } = data;

  try {
    const blog = await prisma.blogPost.upsert({
      where: { id: id || 'new-id' },
      update: { title, slug, content, excerpt, coverImageUrl, category, isFeatured },
      create: { title, slug, content, excerpt, coverImageUrl, category, isFeatured },
    });

    revalidatePath("/blog");
    revalidatePath(`/blog/${blog.slug}`);
    revalidatePath("/admin/blog");
    return { success: true, data: blog };
  } catch (error) {
    console.error("Failed to save blog:", error);
    return { success: false, error: "Gagal menyimpan blog. Pastikan slug unik." };
  }
}

/**
 * Menghapus blog post
 */
export async function deleteBlog(id: string) {
  const session = await auth();
  if (!session) return { success: false, error: "Unauthorized" };

  try {
    await prisma.blogPost.delete({ where: { id } });
    revalidatePath("/blog");
    revalidatePath("/admin/blog");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Gagal menghapus blog." };
  }
}

/**
 * Mengambil detail blog untuk form edit
 */
export async function getBlogById(id: string) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");
  return await prisma.blogPost.findUnique({ where: { id } });
}
