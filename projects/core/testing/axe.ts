import axe from 'axe-core';

/**
 * Corre o axe sobre um elemento renderizado e falha o teste se houver violações.
 * O contraste de cor fica de fora porque o jsdom não calcula estilos; é verificado
 * no navegador pelo script `npm run test:a11y`, página a página.
 */
export async function expectNoA11yViolations(element: Element): Promise<void> {
  const result = await axe.run(element, {
    rules: { 'color-contrast': { enabled: false }, region: { enabled: false } },
  });
  const report = result.violations.map(
    (v) => `${v.id} (${v.impact}): ${v.help}\n  ${v.nodes.map((n) => n.html).join('\n  ')}`,
  );
  expect(report, report.join('\n')).toEqual([]);
}
