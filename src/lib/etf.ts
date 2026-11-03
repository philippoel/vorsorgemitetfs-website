/**
 * Vergleich: freier ETF-Sparplan gegen Altersvorsorgedepot (AVD) mit staatlicher Förderung.
 *
 * Zulagen wie im Altersvorsorgereformgesetz (Bundestag 27.03.2026, Bundesrat 08.05.2026, Start 01.01.2027),
 * gleiche Logik wie auf justavd.de:
 * - Grundzulage: 50 % auf die ersten 360 € Eigenbeitrag, 25 % auf den Rest bis 1.800 €, höchstens 540 € im Jahr
 * - Kinderzulage: 1 € je eingezahltem Euro, höchstens 300 € je Kind und Jahr
 * - Bonus 200 € einmalig bei Vertragsbeginn vor dem 25. Geburtstag
 *
 * Steuern grob vereinfacht, damit der Vergleich nicht schief wird:
 * - freies Depot: Abgeltungsteuer + Soli (26,375 %) auf den Gewinn bei Verkauf, 30 % Teilfreistellung für Aktien-ETFs,
 *   ohne Sparerpauschbetrag und Vorabpauschale
 * - AVD: Auszahlungen voll mit dem persönlichen Steuersatz im Alter (nachgelagerte Besteuerung),
 *   ohne Steuererstattung in der Ansparphase (Günstigerprüfung), die dem AVD zusätzlich helfen kann
 */

export const REGELN = {
  foerdergrenze: 1800,
  grundzulageMax: 540,
  kinderzulage: 300,
  startbonus: 200,
  abgeltungsteuer: 0.26375,
  teilfreistellung: 0.3,
} as const;

export type Eingaben = {
  alter: number;
  rentenalter: number;
  sparrateMonat: number;
  kinder: number;
  /** Rendite der ETFs vor Kosten in % p. a. */
  rendite: number;
  /** Laufende Kosten des freien Depots in % p. a. (TER + Depot) */
  kostenFrei: number;
  /** Effektivkosten des Altersvorsorgedepots in % p. a. */
  kostenAvd: number;
  /** Persönlicher Durchschnittssteuersatz im Alter in % */
  steuerAlter: number;
};

export type Seite = {
  eingezahlt: number;
  zulagen: number;
  depotwert: number;
  steuern: number;
  nachSteuern: number;
};

export type Vergleich = {
  jahre: number;
  zulageJahr: number;
  frei: Seite;
  avd: Seite;
  /** AVD minus freies Depot, nach Steuern */
  unterschied: number;
};

export function zulagenProJahr(eigenbeitragJahr: number, kinder: number) {
  const eigen = Math.max(0, eigenbeitragJahr);
  const grund = Math.min(Math.min(eigen, 360) * 0.5 + Math.min(Math.max(eigen - 360, 0), REGELN.foerdergrenze - 360) * 0.25, REGELN.grundzulageMax);
  const kind = Math.max(0, kinder) * Math.min(eigen, REGELN.kinderzulage);
  return grund + kind;
}

export function vergleiche(e: Eingaben): Vergleich {
  const jahre = Math.max(0, Math.round(e.rentenalter - e.alter));
  const beitrag = Math.max(0, e.sparrateMonat) * 12;
  const zulageJahr = zulagenProJahr(beitrag, e.kinder);
  const rFrei = (e.rendite - e.kostenFrei) / 100;
  const rAvd = (e.rendite - e.kostenAvd) / 100;

  let frei = 0;
  let avd = 0;
  let zulagen = 0;
  for (let j = 0; j < jahre; j++) {
    const zulage = zulageJahr + (j === 0 && e.alter < 25 ? REGELN.startbonus : 0);
    zulagen += zulage;
    // Einzahlung zu Jahresbeginn, Rendite über das Jahr
    frei = (frei + beitrag) * (1 + rFrei);
    avd = (avd + beitrag + zulage) * (1 + rAvd);
  }

  const eingezahlt = beitrag * jahre;
  const gewinnFrei = Math.max(0, frei - eingezahlt);
  const steuerFrei = gewinnFrei * (1 - REGELN.teilfreistellung) * REGELN.abgeltungsteuer;
  const steuerAvd = avd * (Math.max(0, e.steuerAlter) / 100);

  return {
    jahre,
    zulageJahr,
    frei: { eingezahlt, zulagen: 0, depotwert: frei, steuern: steuerFrei, nachSteuern: frei - steuerFrei },
    avd: { eingezahlt, zulagen, depotwert: avd, steuern: steuerAvd, nachSteuern: avd - steuerAvd },
    unterschied: avd - steuerAvd - (frei - steuerFrei),
  };
}

export const euro = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
export const prozent = (n: number) => n.toLocaleString("de-DE", { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + " %";
