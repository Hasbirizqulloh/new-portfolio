"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function updateSiteSetting(key: string, value: string) {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }

  try {
    const setting = await prisma.siteSetting.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });

    // Revalidate halaman about agar link resume langsung berubah
    revalidatePath("/about");
    revalidatePath("/admin/settings");

    return { success: true, data: setting };
  } catch (error) {
    console.error("Failed to update setting:", error);
    return { success: false, error: "Gagal memperbarui pengaturan." };
  }
}

export async function getSiteSettings() {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  try {
    const settings = await prisma.siteSetting.findMany();
    return settings;
  } catch (error) {
    console.error("Failed to fetch settings:", error);
    return [];
  }
}
