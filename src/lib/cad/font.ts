/** Industrial 5×7 block glyphs. Units are grid cells; scale later. */

type Rect = [number, number, number, number];

const G: Record<string, Rect[]> = {
  " ": [],
  "0": [
    [1, 0, 3, 1],
    [1, 6, 3, 1],
    [0, 1, 1, 5],
    [4, 1, 1, 5],
  ],
  "1": [
    [2, 0, 1, 7],
    [1, 1, 1, 1],
    [1, 0, 3, 1],
  ],
  "2": [
    [0, 6, 5, 1],
    [4, 4, 1, 2],
    [0, 3, 5, 1],
    [0, 1, 1, 2],
    [0, 0, 5, 1],
  ],
  "3": [
    [0, 6, 5, 1],
    [4, 4, 1, 2],
    [1, 3, 4, 1],
    [4, 1, 1, 2],
    [0, 0, 5, 1],
  ],
  N: [
    [0, 0, 1, 7],
    [4, 0, 1, 7],
    [1, 4, 1, 2],
    [2, 3, 1, 2],
    [3, 2, 1, 2],
  ],
  O: [
    [1, 0, 3, 1],
    [1, 6, 3, 1],
    [0, 1, 1, 5],
    [4, 1, 1, 5],
  ],
  D: [
    [0, 0, 1, 7],
    [1, 0, 3, 1],
    [1, 6, 3, 1],
    [4, 1, 1, 5],
  ],
  E: [
    [0, 0, 1, 7],
    [1, 0, 4, 1],
    [1, 3, 3, 1],
    [1, 6, 4, 1],
  ],
};

export const GLYPH_W = 5;
export const GLYPH_H = 7;
export const GLYPH_GAP = 1.2;

export function glyphRects(ch: string): Rect[] {
  return G[ch] ?? G[ch.toUpperCase()] ?? [];
}

export function textWidth(text: string, height: number) {
  const s = height / GLYPH_H;
  const n = text.length;
  return (n * GLYPH_W + (n - 1) * GLYPH_GAP) * s;
}

export function forEachGlyphCell(
  text: string,
  height: number,
  cb: (x: number, y: number, w: number, h: number) => void,
) {
  const s = height / GLYPH_H;
  const total = textWidth(text, height);
  let cursor = -total / 2;
  for (const ch of text) {
    for (const [gx, gy, gw, gh] of glyphRects(ch)) {
      cb(cursor + gx * s, (gy - GLYPH_H / 2) * s, gw * s, gh * s);
    }
    cursor += (GLYPH_W + GLYPH_GAP) * s;
  }
}
