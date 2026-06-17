"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { MessageStatus } from "@prisma/client";

/**
 * Mengambil semua pesan untuk halaman admin
 */
export async function getAdminMessages() {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  try {
    return await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Failed to fetch messages:", error);
    return [];
  }
}

/**
 * Mengubah status pesan
 */
export async function updateMessageStatus(id: string, status: MessageStatus) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  try {
    const updated = await prisma.contactMessage.update({
      where: { id },
      data: { status },
    });

    revalidatePath("/admin/messages");
    revalidatePath("/admin/dashboard");
    return { success: true, data: updated };
  } catch (error) {
    console.error("Failed to update message status:", error);
    return { success: false, error: "Gagal mengubah status pesan." };
  }
}

/**
 * Menghapus pesan
 */
export async function deleteMessage(id: string) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  try {
    await prisma.contactMessage.delete({
      where: { id },
    });

    revalidatePath("/admin/messages");
    revalidatePath("/admin/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete message:", error);
    return { success: false, error: "Gagal menghapus pesan." };
  }
}
