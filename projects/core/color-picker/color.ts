/** Cor em HSV (h 0–360, s e v 0–1) com opacidade a 0–1. */
export interface MxHsva {
  h: number;
  s: number;
  v: number;
  a: number;
}

const clamp = (n: number, min = 0, max = 1) => Math.min(Math.max(n, min), max);

/**
 * Lê uma cor escrita: "#1f6f78", "1f6f78", "#1f6", "#1f6f7880" ou "rgb(31, 111, 120)" / "rgba(...)".
 * Devolve o hex normalizado ("#1F6F78" ou "#1F6F7880" com opacidade) ou null.
 */
export function mxParseColor(text: string): string | null {
  const t = text.trim();
  const rgb = t.match(
    /^rgba?\(\s*(\d{1,3})\s*[,\s]\s*(\d{1,3})\s*[,\s]\s*(\d{1,3})\s*(?:[,/]\s*([\d.]+%?)\s*)?\)$/i,
  );
  if (rgb) {
    const [r, g, b] = [rgb[1], rgb[2], rgb[3]].map(Number);
    if ([r, g, b].some((n) => n > 255)) return null;
    let a = 1;
    if (rgb[4]) a = rgb[4].endsWith('%') ? Number(rgb[4].slice(0, -1)) / 100 : Number(rgb[4]);
    return rgbaToHex(r, g, b, clamp(a));
  }
  let h = t.replace(/^#/, '');
  if (!/^([0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(h)) return null;
  if (h.length <= 4) h = [...h].map((c) => c + c).join('');
  h = h.toUpperCase();
  if (h.length === 8 && h.endsWith('FF')) h = h.slice(0, 6);
  return '#' + h;
}

function rgbaToHex(r: number, g: number, b: number, a = 1): string {
  const x = (n: number) => Math.round(n).toString(16).padStart(2, '0').toUpperCase();
  return `#${x(r)}${x(g)}${x(b)}${a < 1 ? x(a * 255) : ''}`;
}

export function mxHexToRgba(hex: string): { r: number; g: number; b: number; a: number } {
  const h = (mxParseColor(hex) ?? '#000000').slice(1);
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
    a: h.length === 8 ? parseInt(h.slice(6, 8), 16) / 255 : 1,
  };
}

export function mxHexToHsva(hex: string): MxHsva {
  const { r, g, b, a } = mxHexToRgba(hex);
  const [rr, gg, bb] = [r / 255, g / 255, b / 255];
  const max = Math.max(rr, gg, bb);
  const min = Math.min(rr, gg, bb);
  const d = max - min;
  let h = 0;
  if (d) {
    if (max === rr) h = ((gg - bb) / d) % 6;
    else if (max === gg) h = (bb - rr) / d + 2;
    else h = (rr - gg) / d + 4;
    h *= 60;
    if (h < 0) h += 360;
  }
  return { h, s: max ? d / max : 0, v: max, a };
}

export function mxHsvaToHex({ h, s, v, a }: MxHsva): string {
  const f = (n: number) => {
    const k = (n + h / 60) % 6;
    return v - v * s * Math.max(0, Math.min(k, 4 - k, 1));
  };
  return rgbaToHex(f(5) * 255, f(3) * 255, f(1) * 255, a);
}

/** Contraste WCAG entre duas cores (1 a 21). */
export function mxContrast(a: string, b: string): number {
  const lum = (hex: string) => {
    const { r, g, b: bb } = mxHexToRgba(hex);
    const c = [r, g, bb].map((x) => {
      const s = x / 255;
      return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  };
  const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
}

const HUES: [number, string][] = [
  [15, 'vermelho'],
  [40, 'laranja'],
  [65, 'amarelo'],
  [80, 'verde-lima'],
  [160, 'verde'],
  [195, 'azul-petróleo'],
  [250, 'azul'],
  [285, 'roxo'],
  [330, 'magenta'],
  [360, 'vermelho'],
];

/** Nome aproximado da cor em português, para o leitor de ecrã: "azul escuro", "cinzento claro". */
export function mxColorName(hex: string): string {
  const { h, s, v } = mxHexToHsva(hex);
  if (v < 0.12) return 'preto';
  if (s < 0.12)
    return v > 0.92
      ? 'branco'
      : v > 0.6
        ? 'cinzento claro'
        : v > 0.3
          ? 'cinzento'
          : 'cinzento escuro';
  let name = HUES.find(([max]) => h < max)![1];
  if (name === 'laranja' && v < 0.6) name = 'castanho';
  // luminosidade HSL: escuro abaixo de 38%, claro acima de 70%
  const l = v * (1 - s / 2);
  const tone = l < 0.38 ? ' escuro' : l > 0.7 ? ' claro' : '';
  return name + tone;
}
