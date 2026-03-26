import { Contact } from "@/components/sections/Contact";

export const metadata = {
    title: "Contact | DevPortfolio",
    description: "Get in touch with Hasbirizqulloh for collaboration and inquiries.",
};

export default function ContactPage() {
    return (
        <main className="flex flex-col min-h-screen relative">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#2f333a_1px,transparent_1px),linear-gradient(to_bottom,#2f333a_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:linear-gradient(to_bottom,transparent,black,transparent)] opacity-10 pointer-events-none z-0"></div>
            <Contact />
        </main>
    );
}
