import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

const connectionString = `${process.env.DATABASE_URL}`;

// Buat connection pool
const pool = new Pool({ connectionString });

// Sambungkan pool ke Prisma Adapter
const adapter = new PrismaPg(pool as any);

// Oper adapter ke dalam constructor
const prisma = new PrismaClient({ adapter });

export default prisma;