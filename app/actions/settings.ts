"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function updateSiteSetting(key: string, value: string) {
  const session = await auth();

  if (!session) {
    return { success: false, error: "Unauthorized" };
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

export async function updateSiteSettings(settings: { key: string; value: string }[]) {
  const session = await auth();
  if (!session) return { success: false, error: "Unauthorized" };

  try {
    // Use a transaction to update all settings
    await prisma.$transaction(
      settings.map((s) =>
        prisma.siteSetting.upsert({
          where: { key: s.key },
          update: { value: s.value },
          create: { key: s.key, value: s.value },
        })
      )
    );

    revalidatePath("/");
    revalidatePath("/admin/home-editor");
    return { success: true };
  } catch (error) {
    console.error("Failed to update settings:", error);
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

export async function getPublicSiteSettings() {
  try {
    const settings = await prisma.siteSetting.findMany();
    // Convert to a record object for easier access
    const record: Record<string, string> = {};
    settings.forEach(s => {
      record[s.key] = s.value;
    });
    return record;
  } catch (error) {
    console.error("Failed to fetch public settings:", error);
    return {};
  }
}
