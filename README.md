This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Panel de estadísticas

La ruta `/admin` muestra visitas, visitantes únicos, clics por sección y el ranking de enlaces y videos. Copia `.env.example` a `.env.local` y configura `ADMIN_PASSWORD` y `ADMIN_SESSION_SECRET`.

- En Vercel, conecta una base Upstash Redis y agrega `UPSTASH_REDIS_REST_URL` y `UPSTASH_REDIS_REST_TOKEN` al proyecto. También se aceptan los nombres `KV_REST_API_URL` y `KV_REST_API_TOKEN`.
- En desarrollo local, las métricas se guardan en `data/analytics.json`.
- Con Docker, `/app/data` está declarado como volumen y debe montarse en almacenamiento persistente.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
