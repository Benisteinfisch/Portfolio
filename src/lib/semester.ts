// Berechnet das aktuelle Fachsemester anhand des Einschreibe-Semesters,
// damit die Angabe nie manuell aktualisiert werden muss.
//
// Einschreibung: Wintersemester 2024/25 (Oktober 2024) = 1. Semester.
// Semestergrenzen (Deutschland): Sommersemester ab 1. April, Wintersemester ab 1. Oktober.

const ENROLLMENT_ORDINAL = 2024 * 2 + 1; // WiSe 2024/25

function semesterOrdinal(d: Date): number {
  const year = d.getFullYear();
  const month = d.getMonth() + 1; // 1–12
  if (month >= 10) return year * 2 + 1; // WiSe (Okt–Dez)
  if (month >= 4) return year * 2; // SoSe (Apr–Sep)
  return (year - 1) * 2 + 1; // WiSe (Jan–Mär, gehört zum Vorjahres-Winter)
}

/** Aktuelles Fachsemester (mindestens 1). */
export function getCurrentSemester(now: Date = new Date()): number {
  return Math.max(1, semesterOrdinal(now) - ENROLLMENT_ORDINAL + 1);
}

/** Englische Ordnungszahl, z. B. 1 -> "1st", 4 -> "4th". */
export function ordinalEn(n: number): string {
  const suffixes = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
}
