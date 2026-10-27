import { defineConfig, devices } from '@playwright/test';

/**
 * Testes end-to-end do site de documentação: teclado, foco e acessibilidade
 * com as sobreposições abertas (menus, diálogos, calendário...).
 *
 *   npm run build:docs
 *   npm run test:e2e
 *
 * Na primeira vez: npx playwright install chromium
 */
export default defineConfig({
  testDir: './e2e',
  timeout: 30_000,
  fullyParallel: true,
  reporter: process.env['CI'] ? 'github' : 'list',
  use: {
    baseURL: 'http://localhost:4310',
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'claro', use: { ...devices['Desktop Chrome'], colorScheme: 'light' } },
    { name: 'escuro', use: { ...devices['Desktop Chrome'], colorScheme: 'dark' }, grep: /@visual/ },
  ],
  webServer: {
    command: 'node scripts/serve-docs.mjs 4310',
    url: 'http://localhost:4310',
    reuseExistingServer: !process.env['CI'],
  },
});
