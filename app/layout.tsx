import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { CookieBanner } from '@/components/cookie-banner'
import { FloatingHelpWidget } from '@/components/floating-help-widget'
import { MetaPixelDebugger } from '@/components/meta-pixel-debugger'
import { LanguageProvider } from '@/components/language-provider'
import { getLocalBusinessSchema, getOrganizationSchema } from '@/lib/seo'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://jeconomisemonenergie.eu'),
  title: {
    default: 'Comparateur énergie en Wallonie | Jeconomisemonenergie.eu',
    template: '%s | Jeconomisemonenergie.eu'
  },
  description: 'Service d’accompagnement pour comparer les offres d’électricité et de gaz en Wallonie, destiné aux particuliers et aux professionnels.',
  keywords: ['comparateur énergie Wallonie', 'comparateur électricité Wallonie', 'comparateur gaz Wallonie', 'fournisseur énergie Wallonie', 'Jeconomisemonenergie.eu'],
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
    title: 'Comparateur énergie en Wallonie | Jeconomisemonenergie.eu',
    description: 'Accompagnement pour les particuliers et les professionnels qui souhaitent comparer les options d’électricité et de gaz en Wallonie.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Jeconomisemonenergie.eu - Comparateur énergie en Wallonie',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Comparateur énergie en Wallonie | Jeconomisemonenergie.eu',
    description: 'Accompagnement pour les particuliers et les professionnels qui souhaitent comparer les options d’électricité et de gaz en Wallonie.',
    images: ['/og-image.jpg'],
  },
  other: {
    'content-language': 'fr-BE',
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
    description: 'Service d’accompagnement pour comparer les options d’électricité et de gaz en Wallonie, pour les particuliers et les professionnels.',
    publisher: {
      '@type': 'Organization',
      name: 'Jeconomisemonenergie.eu',
      logo: 'https://jeconomisemonenergie.eu/logo.png'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'contactenergie@izyfirstcontact.fr',
      areaServed: 'Wallonie',
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
        <Script id="tiktok-pixel" strategy="afterInteractive">
          {`!function (w, d, t) {
            w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.load=function(e){var r="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{};ttq._i[e]=[];var n=document.createElement("script");n.async=!0;n.src=r+"?sdkid="+e+"&lib="+t;document.getElementsByTagName("script")[0].parentNode.insertBefore(n,document.getElementsByTagName("script")[0])};ttq.load('D89NDK3C77U5H2VHGBOG');ttq.page();
          }(window, document, 'ttq');`}
        </Script>
        {/* Meta Pixel Code */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init', '639424978923873');fbq('track', 'PageView');`}
        </Script>
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
        <>
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
          <LanguageProvider>
            {children}
          </LanguageProvider>
          <CookieBanner />
          <FloatingHelpWidget />
          <MetaPixelDebugger />
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </>
      </body>
    </html>
  )
}
