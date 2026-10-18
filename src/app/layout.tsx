import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { SiteHeader, SiteFooter } from '@/components/site-shell';
import './globals.css';
const serif = localFont({src:[{path:'./fonts/cormorant-normal.woff2',weight:'400',style:'normal'},{path:'./fonts/cormorant-italic.woff2',weight:'400',style:'italic'}],variable:'--font-serif',display:'swap'});
const sans = localFont({src:'./fonts/manrope.woff2',weight:'200 800',variable:'--font-sans',display:'swap'});
export const metadata: Metadata = {
  metadataBase: new URL('https://sanak-beauty-atelier.softclock2048.chatgpt.site'),
  title: {default: 'Sanak Beauty — Beauty, Naturally Yours.', template: '%s | Sanak Beauty'},
  description: 'Discover Sanak Beauty, an original luxury cosmetics demonstration. Thoughtfully imagined essentials, expressive color, and an interactive 3D beauty studio.',
  openGraph: {title: 'Sanak Beauty — Beauty, Naturally Yours.', description: 'Made to glow. Designed to feel. Explore an original beauty collection.', images: [{url: '/images/campaign.webp', width: 1536, height: 1024}]},
  icons: {icon: '/icon.svg'},
};
export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return <html lang="en"><body className={`${serif.variable} ${sans.variable}`}><SiteHeader/><main id="main">{children}</main><SiteFooter/></body></html>;
}
