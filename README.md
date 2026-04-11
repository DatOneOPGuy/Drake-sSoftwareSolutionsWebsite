# Drake's Software Solutions — Website

Marketing site for **Drake's Software Solutions**, a freelance software development studio based in South Carolina.

Built on Next.js 15 (App Router), React 19, TypeScript, Chakra UI v3, Framer Motion, and Three.js / @react-three/fiber.

## Stack

- Next.js 15 / React 19 / TypeScript
- Chakra UI v3 with custom red accent tokens (`accentRed`, `accentRedDeep`, `accentFlame`)
- Framer Motion for scroll-triggered section reveals
- Three.js custom GLSL shader hero (`components/three/ShaderPlane.tsx`)
- Dark theme only, served via `next-themes`

## Sections

`Hero` → `About` → `Services` → `Process` → `Case Studies` → `Tech strip` → `Capabilities` → `FAQ` → `Contact`

## Getting started

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` — local dev server
- `npm run build` — production build
- `npm run start` — start production server
- `npm run lint` — ESLint

## Before deploying

Search the codebase for `TODO` and fill in:

- Real email address in `components/sections/Contact.tsx` and `components/ui/Footer.tsx`
- Real GitHub / LinkedIn URLs in the same files
- Real case studies in `components/sections/CaseStudies.tsx`

## Credits

Built on a template generously shared by Mahmoud Elfeel — significantly redesigned and rebranded for Drake's Software Solutions.
