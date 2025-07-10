import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Remco Stoeten - Frontend Developer & TypeScript Specialist',
  description: 'Frontend developer specializing in TypeScript, React & Next.js. Building scalable web applications from Magento 2 e-commerce platforms to modern SaaS solutions.',
  keywords: 'Frontend Developer, TypeScript, React, Next.js, Magento 2, Web Development, SaaS, E-commerce',
  authors: [{ name: 'Remco Stoeten', url: 'https://remcostoeten.nl' }],
  creator: 'Remco Stoeten',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://remcostoeten.nl',
    title: 'Remco Stoeten - Frontend Developer',
    description: 'Frontend developer specializing in TypeScript, React & Next.js. Building scalable web applications.',
    siteName: 'Remco Stoeten Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Remco Stoeten - Frontend Developer',
    description: 'Frontend developer specializing in TypeScript, React & Next.js. Building scalable web applications.',
    creator: '@remcostoeten',
  },
  viewport: 'width=device-width, initial-scale=1',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1a1a' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
