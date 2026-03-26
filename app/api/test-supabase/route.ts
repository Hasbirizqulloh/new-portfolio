// Pastikan path import ini sesuai dengan lokasi file prisma.ts Anda
import prisma from '../../../src/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Memanggil data menggunakan model yang ada (Project)
    const allProjects = await prisma.project.findMany();

    return NextResponse.json({ data: allProjects });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Gagal mengambil data dari Supabase via Prisma" }, { status: 500 });
  }
}