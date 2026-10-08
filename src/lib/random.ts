/** Integer hash → [0, 1). Exact on every JS engine, so server and client markup match. */
export function seeded(i: number, salt: number) {
  let h = (i * 374761393 + salt * 668265263) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967296;
}

/** Trig results can differ in the last bits between engines; round before rendering. */
export const round = (n: number, places = 2) => Math.round(n * 10 ** places) / 10 ** places;
