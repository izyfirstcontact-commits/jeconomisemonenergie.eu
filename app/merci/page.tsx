import type { Metadata } from "next"
import Link from "next/link"
import { CheckCircle2, ArrowRight } from "lucide-react"
import { NavbarWithAuth } from "@/components/navbar-with-auth"
import { Footer } from "@/components/footer"
import { ReferralSection } from "@/components/referral-section"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Merci pour votre demande",
  description:
    "Votre demande a bien été enregistrée. Parrainez vos proches et aidez-les à réduire leurs factures d'énergie en Belgique.",
  robots: { index: false, follow: true },
}

export default function MerciPage() {
  return (
    <main className="min-h-screen">
      <NavbarWithAuth />

      <section className="px-4 py-16 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle2 className="size-9 text-primary" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
            Merci, votre demande est bien reçue !
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
            Un conseiller analyse votre profil et vous recontacte rapidement avec votre estimation personnalisée.
            En attendant, faites profiter vos proches.
          </p>
        </div>
      </section>

      <ReferralSection />

      <section className="px-4 py-12 text-center">
        <Button asChild variant="outline" size="lg" className="gap-2 bg-transparent">
          <Link href="/">
            Retour à l{"'"}accueil
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </section>

      <Footer />
    </main>
  )
}
