"use client"

interface BrandLogoProps {
  className?: string
  size?: "sm" | "md" | "lg"
}

export function BrandLogo({ className = "", size = "md" }: BrandLogoProps) {
  const sizes = {
    sm: { logo: 40, icon: 20 },
    md: { logo: 56, icon: 28 },
    lg: { logo: 72, icon: 36 },
  }

  const { logo, icon } = sizes[size]

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div 
        className="relative flex items-center justify-center rounded-2xl bg-white shadow-lg"
        style={{ width: logo, height: logo }}
      >
        {/* Combined Energy Symbol - Lightning + Flame fusion */}
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: icon, height: icon }}
          className="relative z-10"
        >
          {/* Outer glow effect */}
          <defs>
            <linearGradient id="energyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" />
              <stop offset="50%" stopColor="hsl(142, 76%, 36%)" />
              <stop offset="100%" stopColor="hsl(142, 70%, 45%)" />
            </linearGradient>
            <linearGradient id="flameGradient" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="hsl(25, 95%, 53%)" />
              <stop offset="100%" stopColor="hsl(38, 92%, 50%)" />
            </linearGradient>
          </defs>
          
          {/* Lightning bolt - electricity symbol */}
          <path
            d="M26 4L12 24h10l-4 20 14-24H22l4-16z"
            fill="url(#energyGradient)"
            className="drop-shadow-sm"
          />
          
          {/* Flame accent - gas symbol */}
          <path
            d="M34 28c0 5.5-3.5 10-8 10s-8-4.5-8-10c0-4 3-7 5-9 0 2 1 4 3 4s3-2 3-4c2 2 5 5 5 9z"
            fill="url(#flameGradient)"
            opacity="0.9"
            className="drop-shadow-sm"
          />
          
          {/* Inner flame highlight */}
          <path
            d="M30 30c0 3-2 5.5-4 5.5s-4-2.5-4-5.5c0-2 1.5-3.5 2.5-4.5 0 1 0.5 2 1.5 2s1.5-1 1.5-2c1 1 2.5 2.5 2.5 4.5z"
            fill="hsl(45, 93%, 58%)"
            opacity="0.8"
          />
        </svg>
        
        {/* Subtle border ring */}
        <div 
          className="absolute inset-0 rounded-2xl ring-1 ring-primary/10"
          style={{ width: logo, height: logo }}
        />
      </div>
    </div>
  )
}

export function BrandHeader() {
  return (
    <div className="bg-primary px-4 py-8 md:py-10 text-center">
      {/* Logo */}
      <BrandLogo size="lg" className="mb-4" />
      
      {/* Brand Name */}
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary-foreground tracking-tight">
        JECONOMISEMONENERGIE.EU
      </h1>
      
      {/* Tagline */}
      <p className="text-primary-foreground/90 text-sm md:text-base mt-2 font-medium max-w-md mx-auto">
        Réduisez jusqu{"'"}à 35% votre facture d{"'"}énergie en Belgique
      </p>
      
      {/* Trust badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mt-5 text-primary-foreground/80">
        <div className="flex items-center gap-1.5 text-xs md:text-sm">
          <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Comparaison gratuite</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs md:text-sm">
          <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Sans engagement</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs md:text-sm">
          <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Réponse rapide</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs md:text-sm">
          <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Offres adaptées</span>
        </div>
      </div>
    </div>
  )
}
