"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

/**
 * Mengambil semua proyek untuk daftar di Admin
 */
export async function getAdminProjects() {
  const session = await auth();
  if (!session) {
    console.error("[getAdminProjects] No Session Found");
    return [];
  }

  try {
    console.log("[getAdminProjects] Fetching projects from database...");
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
    });
    console.log(`[getAdminProjects] Found ${projects.length} projects.`);
    return projects;
  } catch (error) {
    console.error("[getAdminProjects] Database Error:", error);
    return [];
  }
}

/**
 * Menghapus proyek
 */
export async function deleteProject(id: string) {
  const session = await auth();
  if (!session) return { success: false, error: "Unauthorized" };

  try {
    await prisma.project.delete({
      where: { id }
    });
    
    revalidatePath("/projects");
    revalidatePath("/admin/projects");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete project:", error);
    return { success: false, error: "Gagal menghapus proyek." };
  }
}

/**
 * Menyimpan atau memperbarui proyek (Upsert)
 */
export async function saveProject(data: any) {
  const session = await auth();
  if (!session) return { success: false, error: "Unauthorized" };

  const { 
    id, 
    title, 
    slug, 
    description, 
    content, 
    category, 
    coverImageUrl, 
    liveDemoUrl, 
    sourceCodeUrl,
    year,
    platform,
    client,
    architectureDescription,
    architectureImageUrl,
    technologies,
    challenges,
    results
  } = data;

  try {
    const result = await prisma.$transaction(async (tx) => {
      // 1. Upsert Project dasar
      const project = await tx.project.upsert({
        where: { id: id || 'new-id' },
        update: {
          title, slug, description, content, category, 
          coverImageUrl, liveDemoUrl, sourceCodeUrl,
          year, platform, client,
          architectureDescription, architectureImageUrl
        },
        create: {
          title, slug, description, content, category, 
          coverImageUrl, liveDemoUrl, sourceCodeUrl,
          year, platform, client,
          architectureDescription, architectureImageUrl
        }
      });

      // 2. Sync Technologies (Hapus yang lama, tambah yang baru)
      if (technologies) {
        await tx.projectTechnology.deleteMany({ where: { projectId: project.id } });
        await tx.projectTechnology.createMany({
          data: technologies.map((techId: string) => ({
            projectId: project.id,
            technologyId: techId
          }))
        });
      }

      // 3. Sync Challenges
      if (challenges) {
        await tx.projectChallenge.deleteMany({ where: { projectId: project.id } });
        await tx.projectChallenge.createMany({
          data: challenges.map((c: any) => ({
            projectId: project.id,
            title: c.title,
            challenge: c.challenge,
            solution: c.solution
          }))
        });
      }

      // 4. Sync Results
      if (results) {
        await tx.projectResult.deleteMany({ where: { projectId: project.id } });
        await tx.projectResult.createMany({
          data: results.map((r: any) => ({
            projectId: project.id,
            metric: r.metric,
            value: r.value,
            color: r.color
          }))
        });
      }

      return project;
    });

    revalidatePath("/projects");
    revalidatePath(`/projects/${result.slug}`);
    revalidatePath("/admin/projects");
    
    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to save project:", error);
    return { success: false, error: "Gagal menyimpan proyek. Pastikan Slug tidak duplikat." };
  }
}

/**
 * Mengambil detail proyek untuk form edit
 */
export async function getProjectById(id: string) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  return await prisma.project.findUnique({
    where: { id },
    include: {
      technologies: true,
      challenges: true,
      results: true
    }
  });
}

/**
 * Mengambil daftar semua teknologi untuk dropdown/pilihan
 */
export async function getAllTechnologies() {
  return await prisma.technology.findMany({
    orderBy: { name: 'asc' }
  });
}

/**
 * Membuat teknologi baru secara dinamis
 */
export async function createTechnology(name: string, category: string = "Other") {
  const session = await auth();
  if (!session) return { success: false, error: "Unauthorized" };

  try {
    const existing = await prisma.technology.findUnique({ where: { name } });
    if (existing) {
      // If it exists but has a different category, maybe update it? 
      // For now, just return existing
      return { success: true, technology: existing };
    }

    const newTech = await prisma.technology.create({
      data: { name, category }
    });
    return { success: true, technology: newTech };
  } catch (error: any) {
    console.error("Error creating technology:", error);
    return { success: false, error: error.message };
  }
}
