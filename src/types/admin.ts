import { MessageStatus } from "@prisma/client";

export interface ProjectFormData {
  id: string | null;
  title: string;
  slug: string;
  description: string;
  content: string;
  category: string;
  coverImageUrl: string;
  liveDemoUrl: string;
  sourceCodeUrl: string;
  year: string;
  platform: string;
  client: string;
  architectureDescription: string;
  architectureImageUrl: string;
  technologies: string[];
  challenges: { title: string; challenge: string; solution: string }[];
  results: { metric: string; value: string; color: string }[];
}

export interface BlogFormData {
  id: string | null;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  coverImageUrl: string;
  isFeatured: boolean;
}

export interface AdminProject {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  coverImageUrl: string;
  createdAt: Date;
  updatedAt: Date;
  technologies?: {
    technologyId: string;
    technology: { name: string; iconUrl: string };
  }[];
}

export interface AdminBlog {
  id: string;
  title: string;
  slug: string;
  category: string;
  coverImageUrl: string;
  isFeatured: boolean;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AdminMessage {
  id: string;
  senderName: string;
  senderEmail: string;
  subject: string;
  message: string;
  status: MessageStatus;
  createdAt: Date;
}

export interface EducationType {
  id: string;
  institution: string;
  degree: string;
  startYear: string;
  endYear: string | null;
  description: string | null;
}

export interface CertificationType {
  id: string;
  name: string;
  issuer: string;
  issuedDate: string;
  credentialUrl: string | null;
  description: string | null;
}

export interface WorkExperienceType {
  id: string;
  position: string;
  company: string;
  description: string | null;
  startDate: string;
  endDate: string | null;
}
