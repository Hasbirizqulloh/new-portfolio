import { About, EducationItem, CertificationItem, WorkExperienceItem } from "@/components/sections/About";
import prisma from "@/lib/prisma";

export const metadata = {
    title: "About | DevPortfolio",
    description: "Learn more about Hasbirizqulloh, Fullstack & AI Engineer.",
};

export default async function AboutPage() {
    const dbEducations = await prisma.education.findMany({
        orderBy: { sortOrder: 'asc' }
    });
    const dbCertifications = await prisma.certification.findMany({
        orderBy: { sortOrder: 'asc' }
    });
    const dbExperiences = await prisma.workExperience.findMany({
        orderBy: { sortOrder: 'asc' }
    });
    
    // Ambil settings untuk about page
    const settingsRaw = await prisma.siteSetting.findMany({
        where: {
            key: {
                in: [
                    'resumeUrl',
                    'aboutTitleMain',
                    'aboutTitleHighlight',
                    'aboutTitleSuffix',
                    'aboutDescription1',
                    'aboutDescription2',
                    'aboutLocation',
                    'aboutFocus',
                    'aboutCoreStack'
                ]
            }
        }
    });

    const settings = settingsRaw.reduce((acc: Record<string, string>, curr: { key: string; value: string }) => {
        acc[curr.key] = curr.value;
        return acc;
    }, {} as Record<string, string>);

    const resumeUrl = settings.resumeUrl || "#";

    const educations: EducationItem[] = dbEducations.map((e: any) => ({
        id: e.id,
        degree: e.degree,
        institution: e.institution,
        description: e.description || "",
        startYear: e.startYear,
        endYear: e.endYear,
    }));

    const certifications: CertificationItem[] = dbCertifications.map((c: any) => ({
        id: c.id,
        name: c.name,
        issuer: c.issuer,
        description: c.description || "",
        issuedDate: c.issuedDate,
        credentialUrl: c.credentialUrl,
    }));

    const experiences: WorkExperienceItem[] = dbExperiences.map((exp: any) => ({
        id: exp.id,
        position: exp.position,
        company: exp.company,
        description: exp.description || "",
        startDate: exp.startDate,
        endDate: exp.endDate,
    }));

    return (
        <main className="flex flex-col min-h-screen">
            <About 
                settings={settings}
                educations={educations} 
                certifications={certifications}
                experiences={experiences}
                resumeUrl={resumeUrl}
            />
        </main>
    );
}

