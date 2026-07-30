import Link from "next/link"
import { ArrowRight, BookOpen, Calculator, Check, Phone } from "lucide-react"
import { NavbarWithAuth } from "@/components/navbar-with-auth"
import { Footer } from "@/components/footer"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { GUIDE_PAGES, getFAQSchema, getBreadcrumbSchema } from "@/lib/seo"

// Blocs de contenu riches supportés dans une section de guide
export type GuideBlock =
  | { type: "paragraph"; text: string }
  | { type: "bullets"; items: string[] }
  | { type: "ordered"; items: string[] }
  | { type: "table"; caption?: string; headers: string[]; rows: string[][] }
  | { type: "note"; text: string }

export interface GuideSection {
  id: string
  heading: string
  blocks: GuideBlock[]
}

interface GuidePageProps {
  slug: string
  h1: string
  intro: string
  highlights: string[]
  ctaLabel: string
  sections: GuideSection[]
  faqs: { question: string; answer: string }[]
}

function Block({ block }: { block: GuideBlock }) {
  switch (block.type) {
    case "paragraph":
      return (
        <p className="text-sm md:text-base leading-relaxed text-muted-foreground text-pretty">
          {block.text}
        </p>
      )
    case "note":
      return (
        <p className="rounded-xl border border-border bg-card px-4 py-3 text-sm leading-relaxed text-muted-foreground italic">
          {block.text}
        </p>
      )
    case "bullets":
      return (
        <ul className="space-y-3">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-sm md:text-base leading-relaxed text-muted-foreground">
              <Check className="mt-1 size-5 shrink-0 text-primary" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )
    case "ordered":
      return (
        <ol className="space-y-3">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-sm md:text-base leading-relaxed text-muted-foreground">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                {i + 1}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      )
    case "table":
      return (
        <div className="overflow-x-auto rounded-2xl border border-border">
          <table className="w-full border-collapse text-left text-sm">
            {block.caption && (
              <caption className="sr-only">{block.caption}</caption>
            )}
            <thead>
              <tr className="bg-card">
                {block.headers.map((header, i) => (
                  <th
                    key={i}
                    scope="col"
                    className="border-b border-border px-4 py-3 font-semibold text-foreground"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr key={ri} className="even:bg-card/50">
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      className="border-b border-border px-4 py-3 text-muted-foreground last:border-b-0"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    default:
      return null
  }
}

export function GuidePageTemplate({
  slug,
  h1,
  intro,
  highlights,
  ctaLabel,
  sections,
  faqs,
}: GuidePageProps) {
  // Maillage interne : autres guides
  const relatedGuides = GUIDE_PAGES.filter((p) => p.slug !== slug)

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Accueil", url: "/" },
    { name: "Guides", url: "/guides" },
    { name: h1, url: `/guides/${slug}` },
  ])
  const faqSchema = getFAQSchema(faqs)

  return (
    <div className="min-h-screen bg-background">
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
        {/* Above-the-fold : H1 + CTA */}
        <section className="border-b border-border bg-card">
          <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
            <nav aria-label="Fil d'Ariane" className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="transition hover:text-foreground">
                Accueil
              </Link>
              <span aria-hidden="true">/</span>
              <span className="text-foreground">Guides</span>
            </nav>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              <BookOpen className="size-3.5" />
              Guide énergie Belgique
            </span>

            <h1 className="mt-4 text-2xl font-bold tracking-tight text-foreground text-balance md:text-4xl lg:text-[2.75rem] lg:leading-tight">
              {h1}
            </h1>

            <p className="mt-5 max-w-2xl text-sm md:text-lg leading-relaxed text-muted-foreground text-pretty">
              {intro}
            </p>

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

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/#formulaire"
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-2xl bg-primary px-7 text-base font-semibold text-primary-foreground shadow-md transition hover:bg-primary/90 hover:shadow-lg"
              >
                <Calculator className="size-5" />
                {ctaLabel}
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
              <div className="mt-4 space-y-5">
                {section.blocks.map((block, bIndex) => (
                  <Block key={bIndex} block={block} />
                ))}
              </div>

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
                    {ctaLabel}
                  </Link>
                </div>
              )}
            </section>
          ))}

          {/* FAQ avec schema */}
          <section id="faq" className="mb-10 md:mb-12 scroll-mt-24">
            <h2 className="text-xl font-bold tracking-tight text-foreground md:text-3xl text-balance">
              Questions fréquentes
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

          {/* Maillage interne : autres guides */}
          {relatedGuides.length > 0 && (
            <section className="mb-4 rounded-2xl border border-border bg-card p-6 sm:p-8">
              <h2 className="text-lg md:text-xl font-semibold text-foreground text-balance">Nos autres guides énergie en Belgique</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Approfondissez votre comparaison avec nos guides thématiques.
              </p>
              <ul className="mt-5 grid gap-3 grid-cols-1 sm:grid-cols-2">
                {relatedGuides.map((page) => (
                  <li key={page.slug}>
                    <Link
                      href={`/guides/${page.slug}`}
                      className="group flex items-center justify-between gap-3 rounded-xl border border-border bg-background px-4 py-3 text-sm font-medium text-foreground transition hover:border-primary/40 hover:bg-primary/5"
                    >
                      <span className="min-w-0 break-words">{page.h1.split(" : ")[0]}</span>
                      <ArrowRight className="size-4 shrink-0 text-primary transition group-hover:translate-x-1" />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

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
              {ctaLabel}
            </Link>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  )
}
