"use client";

import { useState } from "react";
import { euro, prozent, vergleiche, type Seite } from "@/lib/etf";

function Regler(p: { label: string; wert: string; min: number; max: number; step: number; value: number; onChange: (n: number) => void }) {
  return (
    <label className="block">
      <span className="flex items-baseline justify-between gap-3 text-sm">
        {p.label} <strong className="zahl text-lg text-tinte">{p.wert}</strong>
      </span>
      <input
        type="range"
        min={p.min}
        max={p.max}
        step={p.step}
        value={p.value}
        onChange={(e) => p.onChange(Number(e.target.value))}
        className="mt-2 w-full"
      />
    </label>
  );
}

function Balken({ s, max, farbe }: { s: Seite; max: number; farbe: string }) {
  const ertrag = Math.max(0, s.nachSteuern - s.eingezahlt - s.zulagen);
  const teile = [
    { wert: s.eingezahlt, klasse: "bg-tinte/80", name: "eigene Einzahlungen" },
    { wert: s.zulagen, klasse: "bg-sonne", name: "Zulagen" },
    { wert: ertrag, klasse: farbe, name: "Erträge nach Steuern" },
  ];
  return (
    <div className="flex h-4 w-full overflow-hidden rounded-full bg-linie/60" role="img" aria-label={teile.map((t) => `${t.name} ${euro.format(t.wert)}`).join(", ")}>
      {teile.map((t) => (
        <div key={t.name} className={t.klasse} style={{ width: `${max > 0 ? (t.wert / max) * 100 : 0}%` }} />
      ))}
    </div>
  );
}

export default function Vergleichsrechner() {
  const [alter, setAlter] = useState(30);
  const [rate, setRate] = useState(100);
  const [kinder, setKinder] = useState(0);
  const [rendite, setRendite] = useState(6);
  const [kostenFrei, setKostenFrei] = useState(0.3);
  const [kostenAvd, setKostenAvd] = useState(1.0);
  const [steuer, setSteuer] = useState(15);

  const v = vergleiche({ alter, rentenalter: 67, sparrateMonat: rate, kinder, rendite, kostenFrei, kostenAvd, steuerAlter: steuer });
  const max = Math.max(v.frei.nachSteuern, v.avd.nachSteuern);
  const avdVorn = v.unterschied >= 0;

  const karten = [
    { titel: "Freier ETF-Sparplan", s: v.frei, farbe: "bg-schiefer", hinweis: `${prozent(kostenFrei)} Kosten, Abgeltungsteuer auf Gewinne` },
    { titel: "Altersvorsorgedepot", s: v.avd, farbe: "bg-petrol", hinweis: `${prozent(kostenAvd)} Kosten, ${steuer} % Steuer im Alter` },
  ];

  return (
    <div className="grid gap-6 rounded-2xl border border-linie bg-white p-5 shadow-sm sm:p-8 lg:grid-cols-[1fr_1.4fr]">
      <div className="space-y-5">
        <Regler label="Dein Alter" wert={`${alter} Jahre`} min={18} max={60} step={1} value={alter} onChange={setAlter} />
        <Regler label="Sparrate im Monat" wert={euro.format(rate)} min={10} max={150} step={5} value={rate} onChange={setRate} />
        <fieldset>
          <legend className="text-sm">Kinder mit Kindergeld</legend>
          <div className="mt-2 flex gap-2">
            {[0, 1, 2, 3, 4].map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => setKinder(k)}
                aria-pressed={kinder === k}
                className={`h-10 flex-1 rounded-lg border text-sm font-medium ${kinder === k ? "border-petrol bg-petrol text-white" : "border-linie bg-white text-tinte hover:border-petrol"}`}
              >
                {k}
              </button>
            ))}
          </div>
        </fieldset>

        <details className="rounded-xl bg-grund p-4">
          <summary className="cursor-pointer text-sm font-medium text-tinte">Annahmen anpassen</summary>
          <div className="mt-4 space-y-5">
            <Regler label="ETF-Rendite vor Kosten" wert={prozent(rendite)} min={2} max={9} step={0.5} value={rendite} onChange={setRendite} />
            <Regler label="Kosten freier Sparplan" wert={prozent(kostenFrei)} min={0} max={1.5} step={0.1} value={kostenFrei} onChange={setKostenFrei} />
            <Regler label="Kosten Altersvorsorgedepot" wert={prozent(kostenAvd)} min={0.2} max={2} step={0.1} value={kostenAvd} onChange={setKostenAvd} />
            <Regler label="Steuersatz im Alter" wert={`${steuer} %`} min={0} max={35} step={1} value={steuer} onChange={setSteuer} />
          </div>
        </details>
      </div>

      <div aria-live="polite">
        <p className="text-sm">Mit 67, nach Steuern, in {v.jahre} Jahren</p>
        <p className="mt-1 text-2xl font-bold text-tinte sm:text-3xl">
          {avdVorn ? "Das Altersvorsorgedepot liegt" : "Der freie Sparplan liegt"}{" "}
          <span className="zahl text-petrol">{euro.format(Math.abs(v.unterschied))}</span> vorn
        </p>

        <div className="mt-6 space-y-5">
          {karten.map((k) => (
            <div key={k.titel}>
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-medium">{k.titel}</h3>
                <span className="zahl text-xl font-bold text-tinte">{euro.format(k.s.nachSteuern)}</span>
              </div>
              <div className="mt-2">
                <Balken s={k.s} max={max} farbe={k.farbe} />
              </div>
              <p className="mt-1.5 text-xs text-leise">
                Depotwert {euro.format(k.s.depotwert)}, davon {euro.format(k.s.steuern)} Steuern. {k.hinweis}.
              </p>
            </div>
          ))}
        </div>

        <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-xs text-leise">
          <li className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-tinte/80" />Eigene Einzahlungen {euro.format(v.frei.eingezahlt)}</li>
          <li className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-sonne" />Zulagen {euro.format(v.avd.zulagen)}</li>
          <li className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-schiefer" /><span className="-ml-1 h-2.5 w-2.5 rounded-full bg-petrol" />Erträge nach Steuern</li>
        </ul>

        <p className="mt-5 rounded-xl bg-mint p-4 text-sm text-tinte">
          Der Staat legt dir im Jahr <strong className="zahl">{euro.format(v.zulageJahr)}</strong> dazu
          {alter < 25 ? ", im ersten Jahr zusätzlich 200 € Startbonus" : ""}. Beim freien Sparplan gibt es keine Zulagen.
        </p>
        <p className="mt-3 text-xs text-leise">
          Beispielrechnung ohne Gewähr. Gleichbleibende Rendite, Einzahlung zu Jahresbeginn. Freier Sparplan: 26,375 % auf den
          Gewinn mit 30 % Teilfreistellung, ohne Sparerpauschbetrag. Altersvorsorgedepot: ganze Auszahlung mit deinem Steuersatz im
          Alter, ohne mögliche Steuererstattung in der Sparphase. Echte Renditen schwanken, Verluste sind möglich.
        </p>
      </div>
    </div>
  );
}
