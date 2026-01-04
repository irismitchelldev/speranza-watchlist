export type Tier = { label: string; code: string; min: number };

export const TIERS: Tier[] = [
  { label: "Friendly Fool", code: "F", min: 0 },
  { label: "Sketchy Operative", code: "C", min: 5 },
  { label: "Not To Be Trusted", code: "B", min: 15 },
  { label: "Certified Menace", code: "A", min: 40 },
  { label: "Supreme Antagonist", code: "S", min: 100 },
];

export function tierFor(count: number): Tier {
  let best = TIERS[0];
  for (const t of TIERS) if (count >= t.min) best = t;
  return best;
}

