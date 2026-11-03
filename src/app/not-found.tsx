import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-24 sm:px-6">
      <h1 className="text-3xl font-bold">Diese Seite gibt es nicht</h1>
      <p className="mt-4">Vielleicht hilft dir der Vergleichsrechner auf der Startseite weiter.</p>
      <Link href="/" className="mt-6 inline-flex rounded-full bg-petrol px-6 py-3 font-medium text-white hover:bg-petrol-dunkel">
        Zur Startseite
      </Link>
    </main>
  );
}
