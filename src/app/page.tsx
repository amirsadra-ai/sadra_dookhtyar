import { SiteHeader } from "@/components/marketing/site-header";
import { Hero } from "@/components/marketing/hero";
import { Problems } from "@/components/marketing/problems";
import { Features } from "@/components/marketing/features";
import { Showcase } from "@/components/marketing/showcase";
import { HowToStart } from "@/components/marketing/how-to-start";
import { WhyDooghtyar } from "@/components/marketing/why";
import { Faq } from "@/components/marketing/faq";
import { DemoCta } from "@/components/marketing/demo-cta";
import { SiteFooter } from "@/components/marketing/site-footer";

export default function Home() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main>
        <Hero />
        <Problems />
        <Features />
        <Showcase />
        <HowToStart />
        <WhyDooghtyar />
        <Faq />
        <DemoCta />
      </main>
      <SiteFooter />
    </div>
  );
}
