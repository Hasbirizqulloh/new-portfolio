import { Hero } from "@/components/sections/Hero";
import { CoreExpertise } from "@/components/sections/CoreExpertise";
import { getPublicSiteSettings } from "./actions/settings";

export default async function Home() {
  const settings = await getPublicSiteSettings();

  return (
    <main className="flex flex-col min-h-screen">
      <Hero settings={settings} />
      <CoreExpertise settings={settings} />
    </main>
  );
}
