import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Globe, Mail, Scale } from "lucide-react"
import { Footer } from "@/components/footer"
import { NavbarWithAuth } from "@/components/navbar-with-auth"

export const metadata: Metadata = {
  title: "Mentions légales - GvmEnergy",
  description: "Mentions légales du site jeconomisemonenergie.eu - GvmEnergy, votre comparateur d'énergie belge.",
}

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen bg-background">
      <NavbarWithAuth />
      
      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="size-4" />
            Retour à l&apos;accueil
          </Link>

          {/* Header */}
          <div className="mb-12">
            <h1 className="text-2xl font-bold text-foreground md:text-4xl mb-4 text-balance">
              Mentions légales
            </h1>
            <p className="text-muted-foreground">
              Informations légales concernant le site jeconomisemonenergie.eu
            </p>
          </div>

          {/* Content */}
          <div className="space-y-10">
            {/* Contact */}
            <section className="bg-card rounded-2xl border border-border p-6 sm:p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Mail className="size-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">Contact</h2>
                  <p className="text-sm text-muted-foreground">Coordonnées de l&apos;éditeur</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <a 
                  href="mailto:contactenergie@izyfirstcontact.fr" 
                  className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
                >
                  <Mail className="size-4 text-muted-foreground" />
                  contactenergie@izyfirstcontact.fr
                </a>
              </div>
            </section>

            {/* Hébergeur */}
            <section className="bg-card rounded-2xl border border-border p-6 sm:p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Globe className="size-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">Hébergeur</h2>
                  <p className="text-sm text-muted-foreground">Service d&apos;hébergement</p>
                </div>
              </div>
              
              <div className="space-y-2 text-foreground">
                <p className="font-medium">Vercel Inc.</p>
                <p className="text-muted-foreground">440 N Barranca Ave #4133, Covina, CA 91723, USA</p>
              </div>
            </section>

            {/* Activité */}
            <section className="bg-card rounded-2xl border border-border p-6 sm:p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Scale className="size-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">Activité et responsabilité</h2>
                  <p className="text-sm text-muted-foreground">Nature du service</p>
                </div>
              </div>
              
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Le site jeconomisemonenergie.eu propose un simulateur gratuit d&apos;économies d&apos;énergie. 
                  Jeconomisemonenergie.eu agit en tant qu&apos;intermédiaire indépendant et n&apos;est pas fournisseur d&apos;énergie. 
                  Aucun engagement contractuel ne découle de l&apos;utilisation du simulateur.
                </p>
              </div>
            </section>

            {/* Loi applicable */}
            <section className="bg-card rounded-2xl border border-border p-6 sm:p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Scale className="size-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">Loi applicable</h2>
                  <p className="text-sm text-muted-foreground">Juridiction compétente</p>
                </div>
              </div>
              
              <div className="space-y-2 text-muted-foreground leading-relaxed">
                <p>
                  <span className="text-foreground font-medium">Loi applicable :</span> Droit belge
                </p>
                <p>
                  <span className="text-foreground font-medium">Tribunaux compétents :</span> Arrondissement judiciaire du Hainaut, division Charleroi
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
