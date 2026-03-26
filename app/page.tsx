import { Hero } from "@/components/sections/Hero";
import { CoreExpertise } from "@/components/sections/CoreExpertise";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Hero />
      <CoreExpertise />
    </main>
  );
}
