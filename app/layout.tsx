import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { CookieBanner } from '@/components/cookie-banner'
import { FloatingHelpWidget } from '@/components/floating-help-widget'
import { MetaPixelDebugger } from '@/components/meta-pixel-debugger'
import { ThemeProvider } from '@/components/theme-provider'
import { getLocalBusinessSchema, getOrganizationSchema } from '@/lib/seo'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://jeconomisemonenergie.eu'),
  title: {
    default: 'Jeconomisemonenergie.eu | Comparateur Énergie Belgique 2026',
    template: '%s | Jeconomisemonenergie.eu'
  },
  description: 'Service belge pour comparer gaz & électricité. Engie, Luminus, TotalEnergies. Pour particuliers & PME à Bruxelles, Liège, Anvers. Gratuit.',
  keywords: ['comparateur énergie Belgique', 'comparateur électricité Belgique', 'comparateur gaz Belgique', 'Engie', 'Luminus', 'TotalEnergies', 'Jeconomisemonenergie.eu', 'courtier énergie Belgique'],
  authors: [{ name: 'Jeconomisemonenergie.eu', url: 'https://jeconomisemonenergie.eu' }],
  creator: 'Jeconomisemonenergie.eu',
  publisher: 'Jeconomisemonenergie.eu',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Vérification Google Search Console
    google: 'iGZL_nRJdRTefBG6F3jO_gm5eKBv2PTPndusDK05p1U',
  },
  openGraph: {
    type: 'website',
    locale: 'fr_BE',
    url: 'https://jeconomisemonenergie.eu',
    siteName: 'Jeconomisemonenergie.eu',
    title: 'Jeconomisemonenergie.eu | Comparateur Énergie Belgique 2026',
    description: 'Service belge pour comparer gaz & électricité. Engie, Luminus, TotalEnergies. Pour particuliers & PME à Bruxelles, Liège, Anvers. Gratuit.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Jeconomisemonenergie.eu - Comparateur énergie Belgique',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jeconomisemonenergie.eu | Comparateur Énergie Belgique 2026',
    description: 'Service belge pour comparer gaz & électricité. Engie, Luminus, TotalEnergies. Pour particuliers & PME à Bruxelles, Liège, Anvers. Gratuit.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://jeconomisemonenergie.eu/',
    languages: {
      'fr-BE': 'https://jeconomisemonenergie.eu/',
      'x-default': 'https://jeconomisemonenergie.eu/',
    },
  },
  other: {
    // Ciblage géographique Belgique à 100%
    'geo.region': 'BE',
    'geo.placename': 'Belgique',
    'geo.position': '50.8503;4.3517',
    'ICBM': '50.8503, 4.3517',
    'content-language': 'fr-BE',
    'distribution': 'Belgium',
    'coverage': 'Belgium',
    'target_country': 'BE',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
    ],
    apple: { url: '/apple-touch-icon.png', sizes: '180x180' },
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#16A34A',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Jeconomisemonenergie.eu',
    url: 'https://jeconomisemonenergie.eu',
    description: 'Jeconomisemonenergie.eu, service belge pour comparer le gaz et l\'électricité (Engie, Luminus, TotalEnergies) à Bruxelles, en Wallonie et en Flandre.',
    publisher: {
      '@type': 'Organization',
      name: 'Jeconomisemonenergie.eu',
      logo: 'https://jeconomisemonenergie.eu/logo.png'
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://jeconomisemonenergie.eu/search?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'contactenergie@izyfirstcontact.fr',
      areaServed: 'BE',
      availableLanguage: 'French'
    },
    funder: {
      '@type': 'Organization',
      name: 'Jeconomisemonenergie.eu',
      identifier: 'BCE 0713.842.992'
    }
  }

  return (
    <html lang="fr-BE" className="bg-background scroll-smooth">
      <head>
        {/* Google Tag Manager: defer until the page is interactive */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PQ7MX9HQ');`}
        </Script>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* JSON-LD LocalBusiness */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getLocalBusinessSchema()) }}
        />
        {/* JSON-LD Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getOrganizationSchema()) }}
        />
        {/* TikTok Pixel Code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function (w, d, t) {
                w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(
                var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script")
                ;n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};
                ttq.load('D89NDK3C77U5H2VHGBOG');
                ttq.page();
              }(window, document, 'ttq');
            `,
          }}
        />
        {/* Meta Pixel Code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '639424978923873');
              fbq('track', 'PageView');
            `,
          }}
        />
        {/* Google Ads Conversion Tracking */}
        <Script 
          async 
          src="https://www.googletagmanager.com/gtag/js?id=AW-18288090875"
          strategy="afterInteractive"
        />
        <Script id="google-ads-config" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-18288090875');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=639424978923873&ev=PageView&noscript=1"
          />
        </noscript>
      </head>
      <body className="font-sans antialiased selection:bg-primary/30 selection:text-primary-foreground transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {/* Google Tag Manager (noscript) */}
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-PQ7MX9HQ"
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
              title="Google Tag Manager"
            />
          </noscript>
          {/* End Google Tag Manager (noscript) */}
          {children}
          <CookieBanner />
          <FloatingHelpWidget />
          <MetaPixelDebugger />
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </ThemeProvider>
      </body>
    </html>
  )
}
