import { About, EducationItem, CertificationItem } from "@/components/sections/About";
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

    const settings = settingsRaw.reduce((acc, curr) => {
        acc[curr.key] = curr.value;
        return acc;
    }, {} as Record<string, string>);

    const resumeUrl = settings.resumeUrl || "#";

    const educations: EducationItem[] = dbEducations.map((e) => ({
        id: e.id,
        degree: e.degree,
        institution: e.institution,
        description: e.description || "",
        startYear: e.startYear,
        endYear: e.endYear,
    }));

    const certifications: CertificationItem[] = dbCertifications.map((c) => ({
        id: c.id,
        name: c.name,
        issuer: c.issuer,
        description: c.description || "",
        issuedDate: c.issuedDate,
        credentialUrl: c.credentialUrl,
    }));

    return (
        <main className="flex flex-col min-h-screen">
            <About 
                settings={settings}
                educations={educations} 
                certifications={certifications} 
                resumeUrl={resumeUrl}
            />
        </main>
    );
}
