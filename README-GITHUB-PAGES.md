# CraveRush — Order Fast. Eat Happy.

CraveRush is a static React + Vite fast-food ordering prototype. It includes menu browsing, category filters, search, live cart interactions, delivery or pickup selection, promo code behavior, order totals, and a checkout handoff.

## GitHub Pages

The repository deploys automatically through `.github/workflows/deploy-pages.yml` whenever changes are pushed to `main`.

Expected site URL:

`https://hanszacharycalimlim-ctrl.github.io/craverush/`

In repository settings, open **Pages** and set **Build and deployment → Source** to **GitHub Actions** if GitHub has not selected it automatically.

## Local development

```bash
pnpm install
pnpm dev
```

## Build

```bash
pnpm check
pnpm build
```

The build output used by GitHub Pages is `dist/public`.
