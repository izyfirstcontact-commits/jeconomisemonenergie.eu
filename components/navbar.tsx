"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { BrandLogo } from "./brand-logo"
import { ThemeToggle } from "./theme-toggle"
import { DashboardPopover } from "./dashboard/dashboard-popover"
import { Button } from "@/components/ui/button"
import { ChevronDown, Menu, X } from "lucide-react"

const navLinks = [
  { label: "Fonctionnalites", href: "/#features" },
  { label: "Economies", href: "/#economies" },
  { label: "Temoignages", href: "/#avis" },
  { label: "FAQ", href: "/#faq" },
]

const guideLinks = [
  { label: "Guide des comparateurs énergie", href: "/guides/comparateurs-prix-electricite-gaz-belgique" },
  { label: "Comparateur énergie Belgique", href: "/comparateur-energie-belgique" },
  { label: "Meilleur tarif élec & gaz", href: "/meilleur-tarif-electricite-gaz-belgique" },
  { label: "Changer de fournisseur", href: "/changer-fournisseur-electricite-gaz-belgique" },
  { label: "Avis fournisseurs belges", href: "/avis-fournisseurs-energie-belgique" },
  { label: "Tarif social Wallonie & Flandre", href: "/tarif-social-energie" },
  { label: "Prime énergie Bruxelles 2026", href: "/prime-energie-bruxelles-2026" },
  { label: "CWaPE & simulateur", href: "/cwape-simulateur" },
]

interface NavbarProps {
  isLoggedIn?: boolean
  userEmail?: string
}

export function Navbar({ isLoggedIn = false, userEmail }: NavbarProps) {
  const [open, setOpen] = useState(false)
  const [guidesOpen, setGuidesOpen] = useState(false)
  const [mobileGuidesOpen, setMobileGuidesOpen] = useState(false)

  return (
    <header className="relative z-30 border-b border-border bg-card/80 backdrop-blur-xl">
      <div className="mx-auto flex w-full items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <BrandLogo size="sm" />
          <div className="min-w-0">
            <p className="text-sm sm:text-lg md:text-2xl font-bold text-foreground tracking-tight truncate">JECONOMISEMONENERGIE.EU</p>
            <p className="hidden sm:block text-xs text-muted-foreground">Votre comparateur belge</p>
          </div>
        </div>

        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition hover:text-foreground"
            >
              {item.label}
            </a>
          ))}

          <div
            className="relative"
            onMouseEnter={() => setGuidesOpen(true)}
            onMouseLeave={() => setGuidesOpen(false)}
          >
            <button
              type="button"
              onClick={() => setGuidesOpen((current) => !current)}
              className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition hover:text-foreground"
              aria-expanded={guidesOpen}
              aria-haspopup="true"
            >
              Guides
              <ChevronDown className={`size-4 transition-transform ${guidesOpen ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {guidesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-1/2 top-full z-40 w-72 -translate-x-1/2 pt-3"
                >
                  <div className="overflow-hidden rounded-2xl border border-border bg-card p-2 shadow-xl">
                    {guideLinks.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        className="block rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition hover:bg-accent hover:text-foreground"
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        <div className="hidden items-center gap-3 lg:flex flex-shrink-0">
          <ThemeToggle />
          {isLoggedIn ? (
            <>
              <a
                href="/dashboard"
                className="text-sm font-medium text-muted-foreground transition hover:text-foreground"
              >
                Dashboard
              </a>
              <DashboardPopover userEmail={userEmail} />
            </>
          ) : (
            <>
              <Button asChild size="sm" variant="ghost">
                <a href="/auth/login">Login</a>
              </Button>
              <Button asChild size="sm" className="text-sm font-semibold shadow-md hover:shadow-lg transition-shadow">
                <a href="/auth/sign-up">Sign up</a>
              </Button>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-card text-foreground transition hover:bg-accent lg:hidden"
          aria-label="Menu mobile"
          aria-expanded={open}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="lg:hidden"
          >
            <div className="space-y-4 border-t border-border bg-card px-4 py-5 backdrop-blur-xl">
              {navLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block rounded-2xl px-4 py-3 text-sm font-medium text-muted-foreground transition hover:bg-accent hover:text-foreground"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              ))}

              <div>
                <button
                  type="button"
                  onClick={() => setMobileGuidesOpen((current) => !current)}
                  className="flex w-full items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium text-muted-foreground transition hover:bg-accent hover:text-foreground"
                  aria-expanded={mobileGuidesOpen}
                >
                  Guides
                  <ChevronDown className={`size-4 transition-transform ${mobileGuidesOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {mobileGuidesOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-1 space-y-1 pl-3">
                        {guideLinks.map((item) => (
                          <a
                            key={item.href}
                            href={item.href}
                            className="block rounded-2xl px-4 py-2.5 text-sm text-muted-foreground transition hover:bg-accent hover:text-foreground"
                            onClick={() => setOpen(false)}
                          >
                            {item.label}
                          </a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex justify-center border-t border-border pt-4">
                <ThemeToggle />
              </div>

              {isLoggedIn ? (
                <>
                  <div className="border-t border-border pt-4 text-center">
                    <p className="text-sm text-muted-foreground mb-2">{userEmail}</p>
                    <Button asChild size="sm" variant="outline" className="w-full">
                      <a href="/dashboard">Dashboard</a>
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <Button asChild size="sm" variant="ghost" className="w-full">
                    <a href="/auth/login">Login</a>
                  </Button>
                  <Button asChild size="sm" className="w-full">
                    <a href="/auth/sign-up">Sign up</a>
                  </Button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
