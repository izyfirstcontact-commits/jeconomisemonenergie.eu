import { NavbarWithAuth } from "@/components/navbar-with-auth"
import { HeroSection } from "@/components/hero-section"
import { HeroCalculator } from "@/components/hero-calculator"
import { TarifsSection } from "@/components/tarifs-section"
import { TrustSection } from "@/components/trust-section"
import { FeatureSection } from "@/components/feature-section"
import { SuppliersSection } from "@/components/suppliers-section"
import { SavingsCards } from "@/components/savings-cards"
import { TestimonialsSection } from "@/components/testimonials-section"
import { TestimonialsGallery } from "@/components/testimonials-gallery"
import { LifestyleSection } from "@/components/lifestyle-section"
import { FAQSection } from "@/components/faq-section"
import { FinalCTASection } from "@/components/final-cta-section"
import { Footer } from "@/components/footer"
import { MobileStickyCTA } from "@/components/mobile-sticky-cta"
import { ClientTypeProvider } from "@/components/client-type-context"

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
