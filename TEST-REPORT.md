# Verification report

| Check | Result |
|---|---|
| Clean dependency install | `npm ci` installed 322 packages from the lockfile |
| Development | Next.js dev server returned HTTP 200 for the homepage |
| Production | `npm run build` passed and prerendered all six project routes |
| Static checks | ESLint and strict TypeScript passed |
| Unit tests | 5 passed |
| Browser suite with local knowledge search | 12 passed, with the configured-provider-only check skipped in this run |
| Browser suite with a configured provider | 2 passed against a local OpenAI-compatible fixture |
| SEO smoke test | Configured sitemap contained seven URLs. The robots route responded. |
| Public project links | All six GitHub repositories resolved and case-study URLs matched the supplied links |
| Resume | Opened the preview, downloaded the named PDF and checked its PDF signature. The packaged PDF is byte-for-byte identical to the final supplied file. |

Tests ran with Node.js 24.22.3, Next.js 15.5.29, Playwright 1.65.1 and Chromium 158 on Linux. The lockfile includes Windows x64 and ARM64 Next SWC packages.

## Browser coverage

- Homepage and each case study at 360, 390, 768, 1024, 1440 and 1920 pixels. No horizontal overflow in those checks.
- Keyboard command palette, project navigation, mobile menu, skills, resume preview and download, clipboard copy and contact URLs.
- WebGL canvas render, reduced-motion SVG fallback and disabled-WebGL fallback.
- Assistant input validation, cross-origin rejection, bounded payloads, request limiting, injection abstention, knowledge-search labels and linked evidence.
- Configured mode exercised the full browser-to-Next.js-to-provider path using a local mock. A live paid provider was not called.
- Desktop console and page error assertions ran during the primary navigation and resume journey.

The build reported 116 kB first-load JavaScript for the homepage and 106 kB for case-study routes. The Three.js scene loads separately when eligible. Lighthouse scores, live hosting and Windows execution were not measured in this Linux run.

## Screenshots

- [Desktop homepage](docs/screenshots/home-desktop.png)
- [Mobile homepage](docs/screenshots/home-mobile.png)
- [FRIDAY architecture](docs/screenshots/friday-case-study.png)

## Repeat the configured-mode check

Build the app first. In one PowerShell terminal run `node tests/mock-provider.mjs`. In a second terminal, run:

```powershell
$env:ASSISTANT_API_KEY = "test-only-server-key"
$env:ASSISTANT_MODEL = "test-fixture"
$env:ASSISTANT_BASE_URL = "http://127.0.0.1:4318/v1"
npm.cmd start -- --port 4319
```

In a third terminal run:

```powershell
$env:PLAYWRIGHT_BASE_URL = "http://127.0.0.1:4319"
$env:PLAYWRIGHT_CONFIGURED = "1"
npm.cmd run test:e2e -- --grep "configured provider|mobile navigation"
```
