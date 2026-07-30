import { Badge } from "@/components/ui/badge"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "Le service est-il vraiment gratuit ?",
    answer:
      "Oui. Notre comparateur est 100% gratuit et sans engagement. Nous sommes rémunérés par les fournisseurs seulement si vous choisissez une offre via notre plateforme.",
  },
  {
    question: "Combien de temps prend le changement de fournisseur ?",
    answer:
      "Très peu de temps. Après validation, le changement se fait généralement en 2 à 4 semaines sans interruption de service.",
  },
  {
    question: "Y a-t-il des frais de résiliation avec mon fournisseur actuel ?",
    answer:
      "Dans la plupart des cas, il n'y a pas de frais. Nos conseillers vérifient votre situation et vous informent clairement avant toute démarche.",
  },
  {
    question: "Mes données personnelles sont-elles en sécurité ?",
    answer:
      "Absolument. Nous respectons le RGPD et vos informations sont utilisées uniquement pour améliorer votre offre d'énergie.",
  },
  {
    question: "Puis-je garder mon compteur actuel ?",
    answer:
      "Oui. Le changement de fournisseur ne modifie pas votre compteur ni votre installation électrique.",
  },
  {
    question: "Jeconomisemonenergie.eu est-il compatible avec Sibelga, Ores et Fluvius ?",
    answer:
      "Oui, sur tout le territoire belge. Le gestionnaire de réseau de distribution (GRD) dépend de votre région : Sibelga à Bruxelles-Capitale, Ores (et RESA) en Wallonie, et Fluvius en Flandre. Le GRD ne change jamais lorsque vous changez de fournisseur : votre compteur, y compris un compteur bi-horaire, reste identique et notre comparaison fonctionne quel que soit votre GRD.",
  },
  {
    question: "Comment sont calculées les économies estimées ?",
    answer:
      "Nous comparons votre consommation actuelle avec les tarifs du marché pour vous proposer l'offre la plus avantageuse.",
  },
]

export function FAQSection() {
  return (
    <section id="faq" className="py-12 md:py-20 bg-background">
      <div className="mx-auto max-w-3xl px-4 md:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-14">
          <Badge className="bg-primary/10 text-primary border-primary/20 mb-4 font-medium">FAQ</Badge>
          <h2 className="text-xl font-bold tracking-tight text-foreground md:text-3xl lg:text-4xl text-balance">
            Vos questions, nos réponses claires.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm md:text-base leading-relaxed text-muted-foreground">
            Tout ce que vous devez savoir sur notre service, le changement de fournisseur et la protection des données.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="overflow-hidden rounded-2xl border border-border bg-card px-4 md:px-6 transition-all duration-300 data-[state=open]:shadow-md"
            >
              <AccordionTrigger className="flex w-full items-center justify-between gap-3 py-5 text-left text-sm md:text-base font-semibold text-foreground hover:text-primary">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-8 md:mt-14 rounded-2xl border border-border bg-card p-6 md:p-8 text-center shadow-sm">
          <h3 className="text-lg md:text-xl font-semibold text-foreground text-balance">Vous souhaitez en savoir plus ?</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Nos experts sont à votre disposition pour répondre à vos questions et vous accompagner sans engagement.
          </p>
          <a
            href="/#formulaire"
            className="mt-6 inline-flex w-full sm:w-auto items-center justify-center rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-md transition hover:bg-primary/90 hover:shadow-lg"
          >
            Contactez un conseiller gratuitement
          </a>
        </div>
      </div>
    </section>
  )
}
