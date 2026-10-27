/** Rectângulo em píxeis. */
export interface MxRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

/** Puxadores de redimensionar: cantos e lados. */
export type MxCropHandle = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw';

/** Mantém o rectângulo dentro dos limites, sem mudar o tamanho (a não ser que não caiba). */
export function mxClampRect(r: MxRect, bounds: MxRect): MxRect {
  const width = Math.min(r.width, bounds.width);
  const height = Math.min(r.height, bounds.height);
  return {
    width,
    height,
    x: Math.min(Math.max(r.x, bounds.x), bounds.x + bounds.width - width),
    y: Math.min(Math.max(r.y, bounds.y), bounds.y + bounds.height - height),
  };
}

/** Maior rectângulo com a proporção dada, centrado nos limites (ocupa `fill` do espaço). */
export function mxCenteredRect(bounds: MxRect, ratio: number | null, fill = 0.8): MxRect {
  let width = bounds.width * fill;
  let height = bounds.height * fill;
  if (ratio) {
    if (width / height > ratio) width = height * ratio;
    else height = width / ratio;
  }
  return {
    x: bounds.x + (bounds.width - width) / 2,
    y: bounds.y + (bounds.height - height) / 2,
    width,
    height,
  };
}

/**
 * Redimensiona a partir de um puxador por (dx, dy), respeitando a proporção, o tamanho
 * mínimo e os limites. O lado oposto ao puxador fica parado.
 */
export function mxResizeRect(
  r: MxRect,
  handle: MxCropHandle,
  dx: number,
  dy: number,
  bounds: MxRect,
  ratio: number | null,
  min = 24,
): MxRect {
  let { x, y, width, height } = r;
  const right = x + width;
  const bottom = y + height;
  if (handle.includes('e'))
    width = Math.min(Math.max(width + dx, min), bounds.x + bounds.width - x);
  if (handle.includes('w')) {
    const nx = Math.min(Math.max(x + dx, bounds.x), right - min);
    width = right - nx;
    x = nx;
  }
  if (handle.includes('s'))
    height = Math.min(Math.max(height + dy, min), bounds.y + bounds.height - y);
  if (handle.includes('n')) {
    const ny = Math.min(Math.max(y + dy, bounds.y), bottom - min);
    height = bottom - ny;
    y = ny;
  }
  if (ratio) {
    // o eixo que o puxador controla manda; nos cantos, o maior movimento
    const horizontal =
      handle === 'e' || handle === 'w' || (handle.length === 2 && Math.abs(dx) >= Math.abs(dy));
    if (horizontal) height = width / ratio;
    else width = height * ratio;
    // não sair dos limites: reduz ambos
    const maxW = handle.includes('w') ? right - bounds.x : bounds.x + bounds.width - x;
    const maxH = handle.includes('n') ? bottom - bounds.y : bounds.y + bounds.height - y;
    const k = Math.min(1, maxW / width, maxH / height);
    width *= k;
    height *= k;
    if (handle.includes('w')) x = right - width;
    if (handle.includes('n')) y = bottom - height;
    if (handle === 'e' || handle === 'w')
      y = Math.min(
        Math.max(r.y + (r.height - height) / 2, bounds.y),
        bounds.y + bounds.height - height,
      );
    if (handle === 'n' || handle === 's')
      x = Math.min(
        Math.max(r.x + (r.width - width) / 2, bounds.x),
        bounds.x + bounds.width - width,
      );
  }
  return { x, y, width, height };
}
