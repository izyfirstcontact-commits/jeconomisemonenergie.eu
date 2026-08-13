import dynamic from "next/dynamic"
import { NavbarWithAuth } from "@/components/navbar-with-auth"
import { HeroSection } from "@/components/hero-section"
import { HeroCalculator } from "@/components/hero-calculator"
import { ClientTypeProvider } from "@/components/client-type-context"

const TarifsSection = dynamic(() => import("@/components/tarifs-section").then((mod) => mod.TarifsSection))
const TrustSection = dynamic(() => import("@/components/trust-section").then((mod) => mod.TrustSection))
const FeatureSection = dynamic(() => import("@/components/feature-section").then((mod) => mod.FeatureSection))
const SuppliersSection = dynamic(() => import("@/components/suppliers-section").then((mod) => mod.SuppliersSection))
const SavingsCards = dynamic(() => import("@/components/savings-cards").then((mod) => mod.SavingsCards))
const TestimonialsSection = dynamic(() => import("@/components/testimonials-section").then((mod) => mod.TestimonialsSection))
const TestimonialsGallery = dynamic(() => import("@/components/testimonials-gallery").then((mod) => mod.TestimonialsGallery))
const LifestyleSection = dynamic(() => import("@/components/lifestyle-section").then((mod) => mod.LifestyleSection))
const FAQSection = dynamic(() => import("@/components/faq-section").then((mod) => mod.FAQSection))
const FinalCTASection = dynamic(() => import("@/components/final-cta-section").then((mod) => mod.FinalCTASection))
const Footer = dynamic(() => import("@/components/footer").then((mod) => mod.Footer))
const MobileStickyCTA = dynamic(() => import("@/components/mobile-sticky-cta").then((mod) => mod.MobileStickyCTA))

export default function HomePage() {
  return (
    <ClientTypeProvider>
      <main className="min-h-screen">
        <NavbarWithAuth />
        <HeroSection />
        <section id="calculateur" className="py-12 md:py-20">
          <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
            <div className="mb-8 text-center md:mb-10">
              <h2 className="text-xl font-bold tracking-tight text-foreground md:text-3xl lg:text-4xl text-balance">
                Estimez vos économies en quelques secondes.
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
                Indiquez votre facture mensuelle et découvrez votre potentiel d{"'"}économie ainsi que votre score sur 100.
              </p>
            </div>
            <HeroCalculator />
          </div>
        </section>
        <TarifsSection />
        <TrustSection />
        <FeatureSection />
        <SuppliersSection />
        <SavingsCards />
        <TestimonialsSection />
        <TestimonialsGallery />
        <LifestyleSection />
        <FAQSection />
        <FinalCTASection />
        <Footer />
        <MobileStickyCTA />
      </main>
    </ClientTypeProvider>
  )
}
