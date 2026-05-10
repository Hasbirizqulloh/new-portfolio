
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

const connectionString = `${process.env.DATABASE_URL}`;

const prismaClientSingleton = () => {
    // Buat connection pool
    const pool = new Pool({ 
        connectionString,
        max: 10,     // Batasi jumlah maksimal koneksi per pool
        idleTimeoutMillis: 30000, 
    });

    // Sambungkan pool ke Prisma Adapter
    const adapter = new PrismaPg(pool as any);

    // Oper adapter ke dalam constructor
    return new PrismaClient({ adapter });
};

// Mencegah Next.js membuat koneksi baru setiap kali file berubah (Hot Reload)
declare const globalThis: {
    prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') {
    globalThis.prismaGlobal = prisma;
}