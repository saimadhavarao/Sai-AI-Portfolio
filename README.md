# Sai AI/ML Engineering Portfolio

A Next.js portfolio for Sai Madhava Rao Lakkakula with six project case studies, an interactive 3D core, a keyboard command palette, the original resume and a grounded portfolio assistant. The app runs locally without credentials.

## Run on Windows

1. Install Node.js 22 LTS or newer, VS Code and Git for Windows. Run `node --version` and `npm.cmd --version` in PowerShell to verify Node and npm.
2. Right-click the ZIP and choose **Extract All**. In VS Code, choose **File > Open Folder** and select the inner `Sai-AI-Portfolio` folder containing `package.json`.
3. Open **Terminal > New Terminal** and run:

   ```powershell
   npm.cmd ci
   Copy-Item .env.example .env.local
   npm.cmd run dev
   ```

4. Open [localhost:3000](http://localhost:3000). Press Ctrl+C in the terminal to stop the server. The `.cmd` suffix works in PowerShell environments that block npm's PowerShell shim.

## Run the checks

```powershell
npm.cmd run lint
npm.cmd run typecheck
npm.cmd test
npm.cmd run build
npx.cmd playwright install chromium
npm.cmd run test:e2e
```

Playwright launches the built app on port 4317. To open the production build yourself, run `npm.cmd start`. See [TEST-REPORT.md](TEST-REPORT.md) for executed checks and browser instructions.

## Configure Ask My AI

Leave `ASSISTANT_API_KEY` blank to use local **Knowledge search**. To enable AI-assisted evidence selection, edit `.env.local` and restart the server:

```dotenv
ASSISTANT_API_KEY=your-provider-key
ASSISTANT_BASE_URL=https://api.openai.com/v1
ASSISTANT_MODEL=gpt-4.1-mini
```

The provider must implement OpenAI-compatible Chat Completions. The server retrieves approved portfolio passages and gives those passages and the visitor's standalone question to the model. The model returns evidence IDs. The server validates the IDs and renders the original approved text, so the model cannot add claims or external links to a reply. Unavailable or invalid provider responses use the local search. With a provider configured, visitor questions are sent to that provider. The interface keeps up to eight recent turns in page memory. Requests are capped at 480 characters, 4 KiB JSON and 12 per minute per rate-limit bucket. The rate limiter and provider concurrency cap are process-local.

The assistant has no access to personal accounts, no external action tools and no connection to the FRIDAY or JARVIS applications.

## Update content

| Change | File |
|---|---|
| Bio, contact details, work, education and skills | `data/profile.ts` |
| Cards, evidence, architecture and case study sections | `data/projects.ts` |
| Conceptual project illustrations | `components/project-art.tsx` |
| Benchmark charts and comparison panels | `components/case-study.tsx` |
| Assistant evidence, ranking and abstention | `lib/knowledge.ts` |
| Original resume and its preview | `public/Sai-Madhava-Rao-Lakkakula-Resume.pdf`, `public/resume-preview.png` |
| Social share image and icon | `public/social-preview.png`, `public/icon.svg` |
| Theme and responsive layouts | `app/globals.css` |

Update the PDF and its first-page preview together. The PDF email is `raosaimadhava@gmail.com`. The site and assistant use `rsaimadhava@gmail.com` as requested. The published PDF preserves the original bytes.

The portfolio uses Next.js App Router, strict TypeScript, self-hosted fonts, CSS motion and lazy-loaded Three.js. Small screens, coarse pointers, reduced motion and WebGL failures use an accessible SVG core. The project art is schematic. No stock imagery, screenshots of external apps or code from the reference portfolio are included.

See [DEPLOYMENT.md](DEPLOYMENT.md) for GitHub and Vercel setup and [CONTENT-SOURCES.md](docs/CONTENT-SOURCES.md) for the benchmark reconciliation.
