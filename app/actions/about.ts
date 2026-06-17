"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

// --- EDUCATION ACTIONS ---

export async function getEducation() {
  return await prisma.education.findMany({
    orderBy: { startYear: "desc" },
  });
}

export async function saveEducation(data: any) {
  const session = await auth();
  if (!session) return { success: false, error: "Unauthorized" };

  const { id, institution, degree, startYear, endYear, description } = data;
  try {
    await prisma.education.upsert({
      where: { id: id || 'new-edu' },
      update: { 
        institution, 
        degree, 
        startYear: parseInt(startYear), 
        endYear: endYear ? parseInt(endYear) : null, 
        description 
      },
      create: { 
        institution, 
        degree, 
        startYear: parseInt(startYear), 
        endYear: endYear ? parseInt(endYear) : null, 
        description 
      },
    });
    revalidatePath("/about");
    revalidatePath("/admin/about");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Gagal menyimpan pendidikan." };
  }
}

export async function deleteEducation(id: string) {
  try {
    const session = await auth();
    if (!session) return { success: false, error: "Unauthorized" };
    await prisma.education.delete({ where: { id } });
    revalidatePath("/about");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Gagal menghapus pendidikan." };
  }
}

// --- CERTIFICATION ACTIONS ---

export async function getCertifications() {
  return await prisma.certification.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function saveCertification(data: any) {
  const session = await auth();
  if (!session) return { success: false, error: "Unauthorized" };

  const { id, name, issuer, issuedDate, credentialUrl, description } = data;
  try {
    await prisma.certification.upsert({
      where: { id: id || 'new-cert' },
      update: { name, issuer, issuedDate, credentialUrl, description },
      create: { name, issuer, issuedDate, credentialUrl, description },
    });
    revalidatePath("/about");
    revalidatePath("/admin/about");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Gagal menyimpan sertifikasi." };
  }
}

export async function deleteCertification(id: string) {
  try {
    const session = await auth();
    if (!session) return { success: false, error: "Unauthorized" };
    await prisma.certification.delete({ where: { id } });
    revalidatePath("/about");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Gagal menghapus sertifikasi." };
  }
}
