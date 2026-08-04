import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, FileText, Users, Gift, FileX, RotateCcw, AlertTriangle, Scale, Building2, Mail } from "lucide-react"
import { Footer } from "@/components/footer"
import { NavbarWithAuth } from "@/components/navbar-with-auth"

export const metadata: Metadata = {
  title: "Conditions générales d'utilisation - Jeconomisemonenergie.eu",
  description: "Conditions générales d'utilisation du simulateur d'économies d'énergie jeconomisemonenergie.eu - Jeconomisemonenergie.eu.",
}

export default function ConditionsGeneralesPage() {
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
              Conditions générales d&apos;utilisation
            </h1>
            <p className="text-muted-foreground">
              Les présentes conditions régissent l&apos;utilisation du simulateur d&apos;économies d&apos;énergie proposé sur jeconomisemonenergie.eu.
            </p>
          </div>

          {/* Content */}
          <div className="space-y-8">
            {/* Article 1 - Objet */}
            <section className="bg-card rounded-2xl border border-border p-6 sm:p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <FileText className="size-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">Article 1 - Objet</h2>
                  <p className="text-sm text-muted-foreground">Description du service</p>
                </div>
              </div>
              
              <p className="text-muted-foreground leading-relaxed">
                Le site <span className="text-foreground font-medium">jeconomisemonenergie.eu</span> met à disposition un simulateur gratuit et sans engagement pour estimer vos économies d&apos;énergie.
              </p>
            </section>

            {/* Article 2 - Accès */}
            <section className="bg-card rounded-2xl border border-border p-6 sm:p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Users className="size-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">Article 2 - Accès au service</h2>
                  <p className="text-sm text-muted-foreground">Conditions d&apos;accès</p>
                </div>
              </div>
              
              <p className="text-muted-foreground leading-relaxed">
                Le service est réservé aux <span className="text-foreground font-medium">personnes majeures</span> résidant en <span className="text-foreground font-medium">Belgique</span>.
              </p>
            </section>

            {/* Article 3 - Gratuité */}
            <section className="bg-card rounded-2xl border border-border p-6 sm:p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Gift className="size-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">Article 3 - Gratuité</h2>
                  <p className="text-sm text-muted-foreground">Service gratuit</p>
                </div>
              </div>
              
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>
                  La simulation est <span className="text-foreground font-medium">100% gratuite</span>.
                </p>
                <p>
                  Jeconomisemonenergie.eu pourra vous recontacter par téléphone ou email si vous laissez vos coordonnées dans le formulaire.
                </p>
              </div>
            </section>

            {/* Article 4 - Absence de contrat */}
            <section className="bg-card rounded-2xl border border-border p-6 sm:p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <FileX className="size-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">Article 4 - Absence de contrat</h2>
                  <p className="text-sm text-muted-foreground">Aucun engagement</p>
                </div>
              </div>
              
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>
                  L&apos;utilisation du simulateur <span className="text-foreground font-medium">ne vaut pas souscription</span> à une offre commerciale.
                </p>
                <p>
                  Tout contrat ultérieur fera l&apos;objet d&apos;un <span className="text-foreground font-medium">document distinct</span> signé par les deux parties.
                </p>
              </div>
            </section>

            {/* Article 5 - Droit de rétractation */}
            <section className="bg-card rounded-2xl border border-border p-6 sm:p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <RotateCcw className="size-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">Article 5 - Droit de rétractation</h2>
                  <p className="text-sm text-muted-foreground">Vos droits en cas de contrat</p>
                </div>
              </div>
              
              <p className="text-muted-foreground leading-relaxed">
                Conformément au Code de droit économique Livre VI, vous disposez de <span className="text-foreground font-medium">14 jours</span> pour vous rétracter de tout contrat signé à distance avec Jeconomisemonenergie.eu.
              </p>
            </section>

            {/* Article 6 - Responsabilité */}
            <section className="bg-card rounded-2xl border border-border p-6 sm:p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <AlertTriangle className="size-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">Article 6 - Responsabilité</h2>
                  <p className="text-sm text-muted-foreground">Limitation de responsabilité</p>
                </div>
              </div>
              
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>
                  Les résultats du simulateur sont fournis <span className="text-foreground font-medium">à titre indicatif</span> et sont basés sur les données que vous fournissez.
                </p>
                <p>
                  Jeconomisemonenergie.eu <span className="text-foreground font-medium">ne garantit pas</span> l&apos;exactitude des économies annoncées par le simulateur.
                </p>
              </div>
            </section>

            {/* Article 7 - Loi applicable */}
            <section className="bg-card rounded-2xl border border-border p-6 sm:p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Scale className="size-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">Article 7 - Loi applicable</h2>
                  <p className="text-sm text-muted-foreground">Juridiction compétente</p>
                </div>
              </div>
              
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>
                  Les présentes conditions sont régies par le <span className="text-foreground font-medium">droit belge</span>.
                </p>
                <p>
                  En cas de litige, les tribunaux de l&apos;<span className="text-foreground font-medium">arrondissement judiciaire du Hainaut, division Charleroi</span> seront seuls compétents.
                </p>
              </div>
            </section>

            {/* À propos de Jeconomisemonenergie.eu */}
            <section className="bg-primary/5 rounded-2xl border border-primary/20 p-6 sm:p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="size-10 rounded-xl bg-primary flex items-center justify-center shrink-0">
                  <Building2 className="size-5 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">À propos de Jeconomisemonenergie.eu</h2>
                  <p className="text-sm text-muted-foreground">Qui sommes-nous ?</p>
                </div>
              </div>
              
              <div className="space-y-5 text-muted-foreground leading-relaxed">
                <p>
                  <span className="text-foreground font-medium">Jeconomisemonenergie.eu</span> vous aide à réduire vos factures d&apos;énergie en Belgique.
                </p>
                
                <p>
                  Un service en partenariat avec <span className="text-foreground font-medium">Jeconomisemonenergie.eu</span>, courtier spécialisé en optimisation des contrats d&apos;énergie pour particuliers.
                </p>
                
                <p>
                  Notre mission via jeconomisemonenergie.eu : vous aider à <span className="text-foreground font-medium">comprendre et réduire</span> vos factures d&apos;électricité et de gaz, <span className="text-foreground font-medium">sans engagement</span>.
                </p>
                
                <div className="bg-card rounded-xl p-5 sm:p-6 border border-primary/10">
                  <p className="text-sm">
                    <span className="text-foreground font-medium">Siège :</span> Bruxelles, Belgique
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 pt-2">
                  <Mail className="size-4 text-primary shrink-0" />
                  <span>Une question ?</span>
                  <a href="mailto:contactenergie@izyfirstcontact.fr" className="text-primary hover:underline font-medium break-all">
                    contactenergie@izyfirstcontact.fr
                  </a>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
