import { Navbar } from "@/components/layout/Navbar";

const Footer = () => (
  <footer className="py-8 text-center text-gray-500 text-sm border-t border-white/5">
    © {new Date().getFullYear()} Hasbirizqulloh. Built with Next.js & Tailwind.
  </footer>
);

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
