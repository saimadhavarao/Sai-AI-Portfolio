# Deploy on Vercel

## Push the source to GitHub

Create a new empty GitHub repository under your account. Leave its initial README and license unchecked. In the extracted project folder, run the commands below. Replace `YOUR-USERNAME` and `YOUR-REPO` with the new repository's details.

```powershell
git init
git add .
git status --short
git commit -m "Add AI engineering portfolio"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git push -u origin main
```

If Git requests an identity, configure your preferred GitHub commit name and email with `git config user.name` and `git config user.email`, then retry the commit. Keep `.env.local` out of commits and preserve `.env.example`.

## Deploy the repository

1. In Vercel, choose **Add New > Project** and import your GitHub repository.
2. Select **Next.js** and Node.js 22 or newer. Set the root directory to the folder with `package.json`. Use `npm ci` for the install command and `npm run build` for the build command.
3. In **Settings > Environment Variables**, set `SITE_URL` to your final HTTPS origin when known. Canonical URLs and sitemap entries derive from this value or Vercel's production URL. For AI mode, set `ASSISTANT_API_KEY`, `ASSISTANT_BASE_URL` and `ASSISTANT_MODEL` for the intended environment. Use the server-only names shown here.
4. Deploy or redeploy after changing the environment variables. The server-side assistant route requires a Next.js runtime.
5. Open the deployed URL, navigate to each case study and download the resume. Check `/robots.txt` and `/sitemap.xml`. Try a question in Ask My AI and check its response label.

Request budgets at larger scale should be enforced at the deployment edge or with a shared rate-limit store. Set a spend limit with the model provider before enabling public AI mode.

The source package contains the application. GitHub publication and Vercel deployment are performed from your accounts.
