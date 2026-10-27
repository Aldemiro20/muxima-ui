import { mxCenteredRect, mxClampRect, mxResizeRect } from './crop-math';

const B = { x: 0, y: 0, width: 400, height: 300 };

describe('contas do recorte', () => {
  it('centra com proporção e mantém dentro dos limites', () => {
    expect(mxCenteredRect(B, 1, 1)).toEqual({ x: 50, y: 0, width: 300, height: 300 });
    expect(mxClampRect({ x: 380, y: -20, width: 100, height: 100 }, B)).toEqual({
      x: 300,
      y: 0,
      width: 100,
      height: 100,
    });
  });

  it('redimensiona pelos puxadores com proporção, mínimo e limites', () => {
    const r = { x: 100, y: 100, width: 100, height: 100 };
    expect(mxResizeRect(r, 'se', 50, 10, B, 1)).toEqual({
      x: 100,
      y: 100,
      width: 150,
      height: 150,
    });
    // o lado oposto fica parado
    const w = mxResizeRect(r, 'w', -40, 0, B, null);
    expect(w.x + w.width).toBe(200);
    expect(w.width).toBe(140);
    // mínimo
    expect(mxResizeRect(r, 'e', -500, 0, B, null, 24).width).toBe(24);
    // não sai dos limites com proporção 16:9
    const big = mxResizeRect(r, 'se', 1000, 1000, B, 16 / 9);
    expect(big.x + big.width).toBeLessThanOrEqual(400.0001);
    expect(big.y + big.height).toBeLessThanOrEqual(300.0001);
    expect(big.width / big.height).toBeCloseTo(16 / 9, 3);
  });
});
