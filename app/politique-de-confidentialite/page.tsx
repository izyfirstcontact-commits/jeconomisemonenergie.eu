import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Building2, Clock, Cookie, Database, FileText, Globe, Lock, Mail, Shield, Users } from "lucide-react"
import { Footer } from "@/components/footer"
import { NavbarWithAuth } from "@/components/navbar-with-auth"
import { getAlternates } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Politique de confidentialité - Jeconomisemonenergie.eu",
  description: "Politique de confidentialité du site jeconomisemonenergie.eu - Jeconomisemonenergie.eu respecte le RGPD et protège vos données personnelles.",
  alternates: getAlternates("/politique-de-confidentialite"),
}

export default function PolitiqueConfidentialitePage() {
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
              Politique de confidentialité
            </h1>
            <p className="text-muted-foreground">
              Jeconomisemonenergie.eu respecte le RGPD et la loi belge du 30 juillet 2018 relative à la protection des personnes physiques à l&apos;égard des traitements de données à caractère personnel.
            </p>
          </div>

          {/* Content */}
          <div className="space-y-10">
            {/* 1. Responsable du traitement */}
            <section className="bg-card rounded-2xl border border-border p-6 sm:p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Building2 className="size-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">1. Responsable du traitement</h2>
                  <p className="text-sm text-muted-foreground">Identité et contact</p>
                </div>
              </div>
              
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  <span className="text-foreground font-medium">Responsable :</span> Jeconomisemonenergie.eu
                </p>
                <p>
                  <span className="text-foreground font-medium">Contact DPO :</span>{" "}
                  <a href="mailto:contactenergie@izyfirstcontact.fr" className="text-primary hover:underline">
                    contactenergie@izyfirstcontact.fr
                  </a>
                </p>
              </div>
            </section>

            {/* 2. Données collectées */}
            <section className="bg-card rounded-2xl border border-border p-6 sm:p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Database className="size-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">2. Données collectées</h2>
                  <p className="text-sm text-muted-foreground">Informations recueillies via le simulateur</p>
                </div>
              </div>
              
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-primary shrink-0" />
                  Nom et prénom
                </li>
                <li className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-primary shrink-0" />
                  Adresse email
                </li>
                <li className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-primary shrink-0" />
                  Numéro de téléphone
                </li>
                <li className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-primary shrink-0" />
                  Code postal
                </li>
                <li className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-primary shrink-0" />
                  Type de logement
                </li>
                <li className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-primary shrink-0" />
                  Données de consommation énergétique
                </li>
              </ul>
            </section>

            {/* 3. Finalité */}
            <section className="bg-card rounded-2xl border border-border p-6 sm:p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <FileText className="size-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">3. Finalité du traitement</h2>
                  <p className="text-sm text-muted-foreground">Pourquoi nous collectons vos données</p>
                </div>
              </div>
              
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Nous collectons vos données afin de vous recontacter pour vous proposer une étude personnalisée d&apos;économies d&apos;énergie.
                </p>
                <p>
                  <span className="text-foreground font-medium">Base légale :</span> Votre consentement explicite (article 6.1.a du RGPD).
                </p>
              </div>
            </section>

            {/* 4. Durée de conservation */}
            <section className="bg-card rounded-2xl border border-border p-6 sm:p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Clock className="size-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">4. Durée de conservation</h2>
                  <p className="text-sm text-muted-foreground">Combien de temps nous gardons vos données</p>
                </div>
              </div>
              
              <p className="text-muted-foreground leading-relaxed">
                Vos données sont conservées pendant <span className="text-foreground font-medium">3 ans</span> à compter du dernier contact, ou jusqu&apos;au retrait de votre consentement si celui-ci intervient avant.
              </p>
            </section>

            {/* 5. Destinataires */}
            <section className="bg-card rounded-2xl border border-border p-6 sm:p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Users className="size-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">5. Destinataires des données</h2>
                  <p className="text-sm text-muted-foreground">Qui a accès à vos informations</p>
                </div>
              </div>
              
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Vos données sont accessibles uniquement par Jeconomisemonenergie.eu et ses sous-traitants techniques strictement nécessaires au fonctionnement du service.
                </p>
                <p className="text-foreground font-medium">
                  Aucune revente de données à des tiers sans votre consentement explicite.
                </p>
              </div>
            </section>

            {/* 6. Transfert hors UE */}
            <section className="bg-card rounded-2xl border border-border p-6 sm:p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Globe className="size-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">6. Transfert hors Union Européenne</h2>
                  <p className="text-sm text-muted-foreground">Hébergement des données</p>
                </div>
              </div>
              
              <p className="text-muted-foreground leading-relaxed">
                L&apos;hébergement est assuré par Vercel (USA). Ce transfert est encadré par les <span className="text-foreground font-medium">Clauses Contractuelles Types</span> de la Commission Européenne, garantissant un niveau de protection adéquat de vos données.
              </p>
            </section>

            {/* 7. Vos droits */}
            <section className="bg-card rounded-2xl border border-border p-6 sm:p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Shield className="size-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">7. Vos droits</h2>
                  <p className="text-sm text-muted-foreground">Ce que vous pouvez faire</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Conformément au RGPD, vous disposez des droits suivants :
                </p>
                <ul className="grid gap-2 text-muted-foreground sm:grid-cols-2">
                  <li className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-primary shrink-0" />
                    Droit d&apos;accès
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-primary shrink-0" />
                    Droit de rectification
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-primary shrink-0" />
                    Droit à l&apos;effacement
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-primary shrink-0" />
                    Droit à la limitation
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-primary shrink-0" />
                    Droit d&apos;opposition
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-primary shrink-0" />
                    Droit à la portabilité
                  </li>
                </ul>
                <p className="text-muted-foreground leading-relaxed">
                  Pour exercer vos droits, contactez-nous à{" "}
                  <a href="mailto:contactenergie@izyfirstcontact.fr" className="text-primary hover:underline">
                    contactenergie@izyfirstcontact.fr
                  </a>
                </p>
              </div>
            </section>

            {/* 8. Réclamation */}
            <section className="bg-card rounded-2xl border border-border p-6 sm:p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Lock className="size-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">8. Réclamation</h2>
                  <p className="text-sm text-muted-foreground">Autorité de contrôle</p>
                </div>
              </div>
              
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une réclamation auprès de :
                </p>
                <div className="bg-muted/50 rounded-xl p-4">
                  <p className="text-foreground font-medium">Autorité de protection des données</p>
                  <p>Rue de la Presse 35, 1000 Bruxelles</p>
                  <a 
                    href="https://www.autoriteprotectiondonnees.be" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    www.autoriteprotectiondonnees.be
                  </a>
                </div>
              </div>
            </section>

            {/* 9. Cookies */}
            <section className="bg-card rounded-2xl border border-border p-6 sm:p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Cookie className="size-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">9. Cookies</h2>
                  <p className="text-sm text-muted-foreground">Utilisation des cookies</p>
                </div>
              </div>
              
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Seuls les <span className="text-foreground font-medium">cookies techniques</span> nécessaires au bon fonctionnement du simulateur sont utilisés sur ce site.
                </p>
                <p className="text-foreground font-medium">
                  Aucun cookie publicitaire ou de tracking n&apos;est déposé.
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
