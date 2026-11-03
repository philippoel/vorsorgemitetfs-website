import Vergleichsrechner from "@/components/Vergleichsrechner";
import { JUSTAVD, STAND } from "@/lib/seite";

const KURZ = [
  { zahl: "bis 540 €", text: "Grundzulage im Jahr, wenn du 1.800 € selbst einzahlst" },
  { zahl: "300 €", text: "zusätzlich pro Kind und Jahr, schon ab 300 € Eigenbeitrag" },
  { zahl: "ab 1.1.2027", text: "kannst du ein Altersvorsorgedepot abschließen" },
];

const UNTERSCHIEDE: [string, string, string][] = [
  ["Zulagen vom Staat", "keine", "bis 540 € im Jahr, dazu bis 300 € je Kind"],
  ["Steuern während der Sparphase", "Vorabpauschale und Abgeltungsteuer auf Ausschüttungen", "keine, Erträge wachsen steuerfrei"],
  ["Steuern bei Auszahlung", "26,375 % auf den Gewinn, bei Aktien-ETFs nur auf 70 % davon", "persönlicher Steuersatz auf die ganze Auszahlung"],
  ["Zugriff aufs Geld", "jederzeit", "ab 65, vorher nur für die eigene Immobilie"],
  ["Auszahlung", "wie du willst", "Auszahlungsplan bis mindestens 85, einmal bis zu 30 % auf einen Schlag"],
  ["Anlage", "jeder ETF, den dein Broker anbietet", "ETFs und Fonds, die der Anbieter für das Depot zulässt"],
  ["Höchstbetrag", "keiner", "Förderung für bis zu 1.800 € Eigenbeitrag im Jahr"],
  ["Vererben", "ganz normal", "an Ehe- oder Lebenspartner förderunschädlich, sonst gehen Zulagen zurück"],
];

const FRAGEN = [
  {
    frage: "Was ist das Altersvorsorgedepot?",
    antwort:
      "Ein Wertpapierdepot für die Rente, das der Staat mit Zulagen fördert. Es löst ab dem 1. Januar 2027 die Riester-Rente im Neugeschäft ab. Anders als bei Riester gibt es keine Pflicht zur Beitragsgarantie, das Geld kann vollständig in ETFs und Fonds fließen.",
  },
  {
    frage: "Kann ich mein ETF-Depot beim Broker einfach umwandeln?",
    antwort:
      "Nein. Das Altersvorsorgedepot ist ein eigener Vertrag bei einem zugelassenen Anbieter. Dein bisheriges Depot läuft unabhängig davon weiter. Bestehende ETF-Anteile kannst du nicht als geförderte Einzahlung übertragen.",
  },
  {
    frage: "Lohnt sich das Altersvorsorgedepot auch ohne Kinder?",
    antwort:
      "Meistens ja, wenn du das Geld wirklich bis zur Rente liegen lassen willst. Die Grundzulage bringt bei kleinen Beiträgen 50 % obendrauf, bei 150 € im Monat immer noch 30 %. Wie viel am Ende übrig bleibt, hängt stark von den Kosten des Anbieters und deinem Steuersatz im Alter ab. Probier es im Rechner aus.",
  },
  {
    frage: "Was passiert, wenn ich vor 65 an das Geld muss?",
    antwort:
      "Eine Kündigung ist möglich, dann musst du aber die Zulagen und Steuervorteile zurückzahlen. Ausnahme ist die eigene Immobilie: Dafür kannst du Kapital entnehmen. Geld, das du vielleicht früher brauchst, gehört deshalb besser in einen freien Sparplan.",
  },
  {
    frage: "Welche ETFs sind für die Altersvorsorge sinnvoll?",
    antwort:
      "Für Jahrzehnte eignen sich breit gestreute Aktien-ETFs, zum Beispiel auf einen Weltindex. Wichtig sind niedrige laufende Kosten und dass du auch in schlechten Börsenjahren dabeibleibst. Eine Empfehlung für einen bestimmten ETF geben wir hier nicht.",
  },
];

export default function Startseite() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FRAGEN.map((f) => ({ "@type": "Question", name: f.frage, acceptedAnswer: { "@type": "Answer", text: f.antwort } })),
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Einstieg */}
      <section className="mx-auto max-w-6xl px-4 pt-14 pb-10 sm:px-6 sm:pt-20">
        <p className="inline-flex rounded-full bg-mint px-3 py-1 text-sm font-medium text-petrol-dunkel">Neu ab 2027: Förderung für ETF-Sparer</p>
        <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">
          Fürs Alter mit ETFs sparen: frei oder gefördert?
        </h1>
        <p className="mt-5 max-w-2xl text-lg">
          Bisher hast du für deine Rente mit ETFs einfach einen Sparplan beim Broker angelegt. Ab 2027 gibt es eine zweite
          Möglichkeit: das Altersvorsorgedepot. Darin kaufst du ebenfalls ETFs, und der Staat zahlt Zulagen dazu. Dafür bleibt das
          Geld bis zur Rente gebunden. Hier rechnest du aus, welcher Weg für dich mehr bringt.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#rechner" className="rounded-full bg-petrol px-6 py-3 font-medium text-white hover:bg-petrol-dunkel">
            Vergleich berechnen
          </a>
          <a href="#unterschiede" className="rounded-full border border-linie bg-white px-6 py-3 font-medium text-tinte hover:border-petrol">
            Unterschiede ansehen
          </a>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-3">
          {KURZ.map((k) => (
            <li key={k.zahl} className="rounded-2xl border border-linie bg-white p-5">
              <p className="zahl text-2xl font-bold text-petrol">{k.zahl}</p>
              <p className="mt-1 text-sm">{k.text}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Rechner */}
      <section id="rechner" className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <h2 className="text-3xl font-bold">Rechne deinen Vergleich</h2>
        <p className="mt-3 max-w-2xl">
          Gleiche ETFs, gleiche Sparrate, zwei Wege. Der Rechner zieht bei beiden die Kosten und die Steuern ab, damit du vergleichst,
          was dir am Ende wirklich bleibt.
        </p>
        <div className="mt-8">
          <Vergleichsrechner />
        </div>
      </section>

      {/* Unterschiede */}
      <section id="unterschiede" className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <h2 className="text-3xl font-bold">Freier Sparplan und Altersvorsorgedepot im Vergleich</h2>
        <p className="mt-3 max-w-2xl">
          In beiden Fällen sparst du in ETFs. Der Unterschied liegt in den Regeln drumherum: Förderung, Steuern und wann du an dein
          Geld kommst.
        </p>
        {/* Handy: untereinander statt Tabelle, damit keine Spalte abgeschnitten wird */}
        <dl className="mt-8 divide-y divide-linie rounded-2xl border border-linie bg-white md:hidden">
          {UNTERSCHIEDE.map(([merkmal, frei, avd]) => (
            <div key={merkmal} className="p-4 text-sm">
              <dt className="font-bold text-tinte">{merkmal}</dt>
              <dd className="mt-2 grid grid-cols-[7.5rem_1fr] gap-x-3 gap-y-1">
                <span className="text-leise">Freier Sparplan</span>
                <span>{frei}</span>
                <span className="font-medium text-petrol-dunkel">Vorsorgedepot</span>
                <span>{avd}</span>
              </dd>
            </div>
          ))}
        </dl>
        <div className="mt-8 hidden overflow-hidden rounded-2xl border border-linie bg-white md:block">
          <table className="w-full text-left text-sm">
            <thead className="bg-mint text-tinte">
              <tr>
                <th scope="col" className="p-4 font-medium"><span className="sr-only">Merkmal</span></th>
                <th scope="col" className="p-4 font-bold">Freier ETF-Sparplan</th>
                <th scope="col" className="p-4 font-bold">Altersvorsorgedepot</th>
              </tr>
            </thead>
            <tbody>
              {UNTERSCHIEDE.map(([merkmal, frei, avd]) => (
                <tr key={merkmal} className="border-t border-linie align-top">
                  <th scope="row" className="p-4 font-medium text-tinte">{merkmal}</th>
                  <td className="p-4">{frei}</td>
                  <td className="p-4">{avd}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-tinte p-6 text-[#d4e2e1]">
            <h3 className="text-lg font-bold text-white">Unsere Einschätzung: beides kombinieren</h3>
            <p className="mt-2">
              Für viele passt eine Aufteilung. Bis zu 150 € im Monat ins Altersvorsorgedepot, denn bis dahin reicht die Förderung.
              Was darüber hinaus geht und alles, was du vielleicht vor der Rente brauchst, in einen freien Sparplan. So nimmst du die
              Zulagen mit und bleibst trotzdem flexibel.
            </p>
          </div>
          <div className="rounded-2xl border border-linie bg-white p-6">
            <h3 className="text-lg font-bold">Wann der freie Sparplan besser passt</h3>
            <p className="mt-2">
              Wenn du nicht sicher bist, ob du das Geld bis 65 liegen lassen kannst. Wenn du schon im Alter einen hohen Steuersatz
              erwartest, etwa durch eine gute Betriebsrente oder Mieteinnahmen. Oder wenn ein Anbieter so teuer ist, dass die Kosten die
              Zulagen auffressen.
            </p>
          </div>
        </div>
      </section>

      {/* Grundlagen */}
      <section id="grundlagen" className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <h2 className="text-3xl font-bold">ETF-Grundlagen für die Rente</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Was ein ETF ist", "Ein Fonds, der einen Index nachbildet, zum Beispiel rund 1.400 große Unternehmen aus Industrieländern. Mit einer Rate kaufst du Anteile an allen auf einmal."],
            ["Warum breit streuen", "Geht ein Unternehmen pleite, fällt es im Weltindex kaum ins Gewicht. Ein einzelnes Land oder eine Branche kann dagegen jahrelang schwächeln."],
            ["Kosten im Blick", "0,5 % mehr Kosten im Jahr klingen nach wenig. Über 35 Jahre Sparplan fehlt dadurch aber fast ein Zehntel deines Depots."],
            ["Schwankungen aushalten", "Rückgänge von 30 % kommen an der Börse immer wieder vor. Wer dann verkauft, macht Verluste fest. Wer weiterspart, kauft günstig nach."],
          ].map(([titel, text]) => (
            <div key={titel} className="rounded-2xl border border-linie bg-white p-5">
              <h3 className="font-bold">{titel}</h3>
              <p className="mt-2 text-sm">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Fragen */}
      <section id="fragen" className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <h2 className="text-3xl font-bold">Häufige Fragen</h2>
        <div className="mt-6 divide-y divide-linie rounded-2xl border border-linie bg-white">
          {FRAGEN.map((f) => (
            <details key={f.frage} className="group p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-tinte">
                {f.frage}
                <span aria-hidden="true" className="text-xl text-petrol transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3">{f.antwort}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Nächster Schritt */}
      <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
        <div className="rounded-2xl bg-petrol p-8 text-white sm:p-10">
          <h2 className="text-3xl font-bold text-white">Lieber einmal persönlich durchrechnen?</h2>
          <p className="mt-3 max-w-2xl text-[#d9efe7]">
            Wenn du einen alten Riester-Vertrag hast, Kinder, eine Immobilie planst oder einfach sichergehen willst: Philipp Oelmann
            aus Hannover rechnet mit dir aus, wie du ETF-Sparplan und Altersvorsorgedepot sinnvoll aufteilst. Das Erstgespräch ist
            kostenlos.
          </p>
          <a href={JUSTAVD} className="mt-6 inline-flex rounded-full bg-white px-6 py-3 font-medium text-petrol-dunkel hover:bg-mint">
            Zur Beratung auf justavd.de
          </a>
        </div>
        <p className="mt-6 text-xs text-leise">
          Stand: {STAND}. Grundlage ist das Altersvorsorgereformgesetz (Bundestag 27.03.2026, Bundesrat 08.05.2026). Einzelheiten
          können sich durch Vorgaben der Verwaltung noch ändern. Allgemeine Information, keine Anlageberatung.
        </p>
      </section>
    </main>
  );
}
