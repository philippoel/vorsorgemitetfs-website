import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import Link from "next/link";
import Logo from "@/components/Logo";
import { JUSTAVD, SITE_URL } from "@/lib/seite";
import "./globals.css";

// Wird beim Bauen heruntergeladen und von der Seite selbst ausgeliefert (keine Anfrage an Google)
const dm = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-dm", display: "swap" });

export const viewport: Viewport = { themeColor: "#f5f8f7" };

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Vorsorge mit ETFs: freier Sparplan oder Altersvorsorgedepot?",
    template: "%s | vorsorgemitETFs",
  },
  description:
    "Ab 2027 fördert der Staat ETF-Sparen fürs Alter. Rechne nach, ob sich das Altersvorsorgedepot für dich gegenüber einem freien ETF-Sparplan lohnt.",
  openGraph: { siteName: "vorsorgemitETFs", locale: "de_DE", type: "website" },
  formatDetection: { telephone: false },
};

const NAV = [
  { href: "/#rechner", text: "Rechner" },
  { href: "/#unterschiede", text: "Unterschiede" },
  { href: "/#grundlagen", text: "ETF-Grundlagen" },
  { href: "/#fragen", text: "Fragen" },
];

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="de" className={`h-full antialiased ${dm.variable}`}>
      <body className="flex min-h-full flex-col font-sans">
        <header className="sticky top-0 z-20 border-b border-linie bg-grund/90 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
            <Link href="/" aria-label="vorsorgemitETFs, zur Startseite">
              <Logo />
            </Link>
            <nav aria-label="Hauptnavigation" className="hidden gap-6 text-sm font-medium md:flex">
              {NAV.map((n) => (
                <Link key={n.href} href={n.href} className="text-text hover:text-petrol-dunkel">
                  {n.text}
                </Link>
              ))}
            </nav>
            <Link
              href="/#rechner"
              className="rounded-full bg-petrol px-4 py-2 text-sm font-medium text-white hover:bg-petrol-dunkel"
            >
              Jetzt rechnen
            </Link>
          </div>
        </header>

        <div className="flex flex-1 flex-col">{children}</div>

        <footer className="mt-20 bg-tinte text-sm text-[#b9cccb]">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[2fr_1fr_1fr]">
            <div>
              <p className="font-bold text-white">vorsorgemitETFs</p>
              <p className="mt-2 max-w-md">
                Allgemeine Informationen zur Altersvorsorge mit ETFs, keine Anlageberatung. Alle Rechnungen sind Beispiele mit
                Annahmen, Wertpapiere können an Wert verlieren.
              </p>
              <p className="mt-3">
                Ein Angebot von Philipp Oelmann, Hannover. Persönliche Beratung auf{" "}
                <a href={JUSTAVD} className="text-white underline underline-offset-2 hover:text-sonne">
                  justavd.de
                </a>
                .
              </p>
            </div>
            <div>
              <p className="font-medium text-white">Auf dieser Seite</p>
              <ul className="mt-2 space-y-1.5">
                {NAV.map((n) => (
                  <li key={n.href}>
                    <Link href={n.href} className="hover:text-white">{n.text}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-medium text-white">Rechtliches</p>
              <ul className="mt-2 space-y-1.5">
                <li><Link href="/impressum/" className="hover:text-white">Impressum</Link></li>
                <li><Link href="/datenschutz/" className="hover:text-white">Datenschutz</Link></li>
              </ul>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
