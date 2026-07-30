import Link from "next/link"
import { Sparkles } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-card text-foreground py-12 md:py-16 border-t border-border">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="grid gap-8 md:gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="size-11 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground">
                <Sparkles className="size-5" />
              </div>
              <div>
                <p className="text-lg font-bold">JECONOMISEMONENERGIE.EU</p>
                <p className="text-sm text-muted-foreground">Service pour la Belgique</p>
              </div>
            </div>
            <p className="max-w-md text-sm leading-7 text-muted-foreground">
              Une expérience fluide, un accompagnement humain et des recommandations transparentes pour alléger votre facture.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Nos guides énergie</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="/comparateur-electricite-bruxelles" className="transition hover:text-foreground">
                  Électricité Bruxelles
                </Link>
              </li>
              <li>
                <Link href="/comparateur-gaz-wallonie" className="transition hover:text-foreground">
                  Gaz Wallonie
                </Link>
              </li>
              <li>
                <Link href="/prix-energie-flandre" className="transition hover:text-foreground">
                  Prix énergie Flandre
                </Link>
              </li>
              <li>
                <Link href="/changement-fournisseur-energie" className="transition hover:text-foreground">
                  Changer de fournisseur
                </Link>
              </li>
              <li>
                <Link href="/prime-energie-belgique" className="transition hover:text-foreground">
                  Primes énergie
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Informations</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="/politique-de-confidentialite" className="transition hover:text-foreground">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link href="/mentions-legales" className="transition hover:text-foreground">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link href="/conditions-generales" className="transition hover:text-foreground">
                  Conditions générales
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 md:mt-12 border-t border-border pt-8">
          {/* Branding Jeconomisemonenergie.eu */}
          <div className="mb-6 text-sm text-muted-foreground break-words">
            <p><span className="font-semibold text-foreground">Jeconomisemonenergie.eu - Service pour la Belgique</span> vous aide à comparer et réduire vos factures d&apos;énergie à Bruxelles, en Wallonie et en Flandre.</p>
            <a href="mailto:contactenergie@izyfirstcontact.fr" className="text-primary hover:underline break-all">contactenergie@izyfirstcontact.fr</a>
          </div>

          {/* Disclaimer légal */}
          <p className="mb-6 text-center text-xs leading-relaxed text-muted-foreground">
            Jeconomisemonenergie.eu agit uniquement en tant qu&apos;intermédiaire. Aucune relation contractuelle ne peut être établie entre Jeconomisemonenergie.eu et le client. Par conséquent, Jeconomisemonenergie.eu ne peut pas être tenu de respecter des engagements pour ou au nom du fournisseur en question.
            Par conséquent, il ne peut être tenu d&apos;honorer lui-même aucun engagement pour ou au nom du fournisseur en question
          </p>

          <div className="text-sm text-muted-foreground flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p>&copy; 2026 Jeconomisemonenergie.eu. Tous droits réservés.</p>
            <p>Belgique - Service client : +32 71 94 24 08</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
