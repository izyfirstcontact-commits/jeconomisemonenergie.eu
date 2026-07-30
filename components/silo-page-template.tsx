import Link from "next/link"
import { ArrowRight, Calculator, Check, MapPin, Phone } from "lucide-react"
import { NavbarWithAuth } from "@/components/navbar-with-auth"
import { Footer } from "@/components/footer"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { SILO_PAGES, getFAQSchema, getBreadcrumbSchema } from "@/lib/seo"

export interface ContentSection {
  id: string
  heading: string
  paragraphs: string[]
  bullets?: string[]
}

interface SiloPageProps {
  slug: string
  h1: string
  intro: string
  region: string
  highlights: string[]
  sections: ContentSection[]
  faqs: { question: string; answer: string }[]
}

export function SiloPageTemplate({
  slug,
  h1,
  intro,
  region,
  highlights,
  sections,
  faqs,
}: SiloPageProps) {
  // Maillage interne : lien vers les autres pages silo
  const relatedPages = SILO_PAGES.filter((p) => p.slug !== slug)

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Accueil", url: "/" },
    { name: h1, url: `/${slug}` },
  ])
  const faqSchema = getFAQSchema(faqs)

  return (
    <div className="min-h-screen bg-background">
      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <NavbarWithAuth />

      <main className="pt-20">
        {/* Above-the-fold : H1 + CTA Calculer mon économie */}
        <section className="border-b border-border bg-card">
          <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
            {/* Breadcrumb */}
            <nav aria-label="Fil d'Ariane" className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="transition hover:text-foreground">
                Accueil
              </Link>
              <span aria-hidden="true">/</span>
              <span className="text-foreground">{region}</span>
            </nav>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              <MapPin className="size-3.5" />
              {region}
            </span>

            <h1 className="mt-4 text-2xl font-bold tracking-tight text-foreground text-balance md:text-4xl lg:text-[2.75rem] lg:leading-tight">
              {h1}
            </h1>

            <p className="mt-5 max-w-2xl text-sm md:text-lg leading-relaxed text-muted-foreground text-pretty">
              {intro}
            </p>

            {/* Highlights */}
            <ul className="mt-6 flex flex-wrap gap-2 md:gap-3">
              {highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 rounded-full border border-border bg-background px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm text-foreground"
                >
                  <Check className="size-4 text-primary shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            {/* CTA principal au-dessus de la ligne de flottaison */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/#formulaire"
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-2xl bg-primary px-7 text-base font-semibold text-primary-foreground shadow-md transition hover:bg-primary/90 hover:shadow-lg"
              >
                <Calculator className="size-5" />
                Calculer mon économie
              </Link>
              <a
                href="tel:+3271942408"
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-2xl border border-border bg-background px-7 text-base font-semibold text-foreground transition hover:bg-card"
              >
                <Phone className="size-4 text-primary" />
                071 94 24 08
              </a>
            </div>
          </div>
        </section>

        {/* Contenu principal */}
        <article className="mx-auto max-w-4xl px-4 py-10 md:py-12 sm:px-6 lg:px-8">
          {sections.map((section, index) => (
            <section key={section.id} id={section.id} className="mb-10 md:mb-12 scroll-mt-24">
              <h2 className="text-xl font-bold tracking-tight text-foreground md:text-3xl text-balance">
                {section.heading}
              </h2>
              <div className="mt-4 space-y-4">
                {section.paragraphs.map((paragraph, pIndex) => (
                  <p key={pIndex} className="text-sm md:text-base leading-relaxed text-muted-foreground text-pretty">
                    {paragraph}
                  </p>
                ))}
              </div>
              {section.bullets && section.bullets.length > 0 && (
                <ul className="mt-5 space-y-3">
                  {section.bullets.map((bullet, bIndex) => (
                    <li key={bIndex} className="flex items-start gap-3 text-sm md:text-base leading-relaxed text-muted-foreground">
                      <Check className="mt-1 size-5 shrink-0 text-primary" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* CTA intermédiaire après la 2e section */}
              {index === 1 && (
                <div className="mt-8 rounded-2xl border border-primary/20 bg-primary/5 p-5 md:p-6 text-center">
                  <h3 className="text-base md:text-lg font-semibold text-foreground text-balance">
                    Découvrez combien vous pouvez économiser
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Simulez gratuitement vos économies en moins de 2 minutes, sans engagement.
                  </p>
                  <Link
                    href="/#formulaire"
                    className="mt-4 inline-flex w-full sm:w-auto min-h-[48px] items-center justify-center gap-2 rounded-2xl bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-md transition hover:bg-primary/90"
                  >
                    <Calculator className="size-4" />
                    Calculer mon économie
                  </Link>
                </div>
              )}
            </section>
          ))}

          {/* FAQ avec schema */}
          <section id="faq" className="mb-10 md:mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold tracking-tight text-foreground md:text-3xl text-balance">
              Questions fréquentes — {region}
            </h2>
            <Accordion type="single" collapsible className="mt-6 space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="overflow-hidden rounded-2xl border border-border bg-card px-4 md:px-6 transition-all data-[state=open]:shadow-md"
                >
                  <AccordionTrigger className="py-5 text-left text-sm md:text-base font-semibold text-foreground hover:text-primary gap-3">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          {/* Maillage interne : pages liées */}
          <section className="mb-4 rounded-2xl border border-border bg-card p-6 sm:p-8">
            <h2 className="text-lg md:text-xl font-semibold text-foreground text-balance">Nos autres guides énergie en Belgique</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Approfondissez votre comparaison avec nos guides régionaux et thématiques.
            </p>
            <ul className="mt-5 grid gap-3 grid-cols-1 sm:grid-cols-2">
              {relatedPages.map((page) => (
                <li key={page.slug}>
                  <Link
                    href={`/${page.slug}`}
                    className="group flex items-center justify-between gap-3 rounded-xl border border-border bg-background px-4 py-3 text-sm font-medium text-foreground transition hover:border-primary/40 hover:bg-primary/5"
                  >
                    <span className="min-w-0 break-words">{page.h1.split(" : ")[0]}</span>
                    <ArrowRight className="size-4 shrink-0 text-primary transition group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* CTA final */}
          <section className="mt-8 rounded-2xl bg-primary p-6 md:p-8 text-center text-primary-foreground">
            <h2 className="text-xl md:text-2xl font-bold text-balance">Prêt à réduire votre facture d&apos;énergie ?</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-primary-foreground/90">
              Notre comparateur belge analyse votre situation et vous propose les meilleures offres
              disponibles dans votre région. Gratuit et sans engagement.
            </p>
            <Link
              href="/#formulaire"
              className="mt-6 inline-flex w-full sm:w-auto min-h-[52px] items-center justify-center gap-2 rounded-2xl bg-background px-7 text-base font-semibold text-foreground shadow-md transition hover:bg-card"
            >
              <Calculator className="size-5 text-primary" />
              Calculer mon économie
            </Link>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  )
}
