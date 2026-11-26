import { defineConfig } from '@playwright/test';

const external = process.env.PLAYWRIGHT_BASE_URL;
const local = 'http://127.0.0.1:4317';
const chromiumPath = process.env.PLAYWRIGHT_CHROMIUM_PATH;
export default defineConfig({
  testDir: './tests/e2e',
  workers: 1,
  timeout: 30_000,
  use: {
    baseURL: external || local,
    launchOptions: chromiumPath ? { executablePath: chromiumPath, args: ['--no-sandbox', '--enable-unsafe-swiftshader'] } : undefined,
  },
  webServer: external ? undefined : {
    command: 'npm run start -- --hostname 127.0.0.1 --port 4317',
    url: local,
    timeout: 30_000,
    reuseExistingServer: false,
    env: { ASSISTANT_API_KEY: '' },
  },
});
