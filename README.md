# Portfolio (Next.js + TypeScript + TailwindCSS)

Personal portfolio projekat baziran na Next.js App Router-u.

## Pokretanje lokalno

```bash
npm install
npm run dev
```

Otvori `http://localhost:3000`.

## Build

```bash
npm run build
npm run start
```

`npm run build` kreira produkcioni build, a `npm run start` podiže produkcioni server lokalno.

## Deploy na Vercel

### Opcija 1: Vercel Dashboard

1. Push projekta na GitHub.
2. Uloguj se na [Vercel](https://vercel.com) i klikni `Add New -> Project`.
3. Importuj GitHub repozitorijum.
4. Vercel automatski prepoznaje Next.js i build komande.
5. Klikni `Deploy`.

### Opcija 2: Vercel CLI

```bash
npm i -g vercel
vercel
vercel --prod
```

Prvi `vercel` radi inicijalno povezivanje projekta, a `vercel --prod` radi produkcioni deploy.
