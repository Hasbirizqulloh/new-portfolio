-- =============================================
-- PORTFOLIO DATABASE MIGRATION
-- Paste this SQL into Supabase Dashboard > SQL Editor > New Query > Run
-- =============================================

-- 1. ENUM: Message Status
CREATE TYPE "MessageStatus" AS ENUM ('UNREAD', 'READ', 'RESPONDED');

-- 2. TABLE: Project
CREATE TABLE "Project" (
  "id"                  UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  "title"               TEXT NOT NULL,
  "slug"                TEXT NOT NULL UNIQUE,
  "description"         TEXT NOT NULL,
  "content"             TEXT NOT NULL,
  "category"            TEXT NOT NULL,
  "coverImageUrl"       TEXT,
  "liveDemoUrl"         TEXT,
  "sourceCodeUrl"       TEXT,
  "architectureDetails" JSONB,
  "createdAt"           TIMESTAMPTZ DEFAULT now() NOT NULL,
  "updatedAt"           TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 3. TABLE: Technology
CREATE TABLE "Technology" (
  "id"       UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  "name"     TEXT NOT NULL UNIQUE,
  "iconType" TEXT
);

-- 4. TABLE: ProjectTechnology (Many-to-Many Relation)
CREATE TABLE "ProjectTechnology" (
  "projectId"    UUID NOT NULL REFERENCES "Project"("id") ON DELETE CASCADE,
  "technologyId" UUID NOT NULL REFERENCES "Technology"("id") ON DELETE CASCADE,
  PRIMARY KEY ("projectId", "technologyId")
);

-- 5. TABLE: BlogPost
CREATE TABLE "BlogPost" (
  "id"              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  "title"           TEXT NOT NULL,
  "slug"            TEXT NOT NULL UNIQUE,
  "excerpt"         TEXT NOT NULL,
  "content"         TEXT NOT NULL,
  "category"        TEXT NOT NULL,
  "coverImageUrl"   TEXT,
  "readTimeMinutes" INTEGER DEFAULT 5 NOT NULL,
  "author"          TEXT DEFAULT 'Hasbirizqulloh' NOT NULL,
  "isFeatured"      BOOLEAN DEFAULT false NOT NULL,
  "publishedAt"     TIMESTAMPTZ DEFAULT now() NOT NULL,
  "createdAt"       TIMESTAMPTZ DEFAULT now() NOT NULL,
  "updatedAt"       TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 6. TABLE: ContactMessage
CREATE TABLE "ContactMessage" (
  "id"          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  "senderName"  TEXT NOT NULL,
  "senderEmail" TEXT NOT NULL,
  "subject"     TEXT,
  "message"     TEXT NOT NULL,
  "status"      "MessageStatus" DEFAULT 'UNREAD' NOT NULL,
  "createdAt"   TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- =============================================
-- DISABLE RLS (Row Level Security) for development
-- Enable and configure RLS before going to production!
-- =============================================
ALTER TABLE "Project" DISABLE ROW LEVEL SECURITY;
ALTER TABLE "Technology" DISABLE ROW LEVEL SECURITY;
ALTER TABLE "ProjectTechnology" DISABLE ROW LEVEL SECURITY;
ALTER TABLE "BlogPost" DISABLE ROW LEVEL SECURITY;
ALTER TABLE "ContactMessage" DISABLE ROW LEVEL SECURITY;
