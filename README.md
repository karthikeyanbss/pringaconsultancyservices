# PCS Angular (Base)

Minimal Angular 18 base project scaffold created in this workspace.

Quick start

1. Install dependencies:

```powershell
npm install
```

2. Run the dev server:

```powershell
npm start
```

Notes

- `package.json` contains basic dependencies and `start` script using `ng serve`.
- If you don't have the Angular CLI installed globally, `npx ng serve` will work as well.

Scaffolded features:

- `src/app/core/seo-meta.service.ts`
- `src/app/shared/*` shared components (`hero`, `service-card`, `cloud-badge`)
- `src/app/features/home` (landing)
- `src/app/features/services` (list + detail)
- `src/app/features/contact` (contact form)

How to add real founder photos

1. Save the uploaded Pringa image to `src/assets/illustrations/pringa.jpg` and Ramavarman's image to `src/assets/illustrations/ramavarman.jpg`.

2. If you prefer PNG, use the same filenames but with `.png` and update references in the templates.

Example PowerShell command (run from the workspace root) to copy an image into place:

```powershell
mkdir -Force src\assets\illustrations
cp .\path\to\PringaPhoto.jpg src\assets\illustrations\pringa.jpg
cp .\path\to\RamavarmanPhoto.jpg src\assets\illustrations\ramavarman.jpg
```

The home page will use these images automatically and fall back to the SVG avatars if the files are not present.


