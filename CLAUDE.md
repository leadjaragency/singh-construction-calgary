# Singh Construction Calgary — Website

## Project Overview
A Next.js 14 single-page website for Singh Construction Calgary. The primary feature is a contact/enquiry form that automatically emails new leads to the company inbox via Resend.

## Stack
- **Framework**: Next.js 14 App Router + TypeScript
- **Styling**: Tailwind CSS
- **Email**: Resend (`npm install resend`)
- **Deployment**: Vercel (connects to GitHub repo)

## Key Environment Variables
These go in `.env.local` locally, and in the Vercel dashboard for production:
- `RESEND_API_KEY` — from resend.com (free account, 3,000 emails/month)
- `CONTACT_EMAIL_TO` — info@singhconstructions.ca
- `CONTACT_EMAIL_FROM` — `Singh Construction Calgary <onboarding@resend.dev>` (update to `noreply@singhconstructions.ca` once domain is verified in Resend)

## Email Flow
1. Visitor submits the contact form on the homepage
2. Browser POSTs JSON to `/api/contact`
3. `app/api/contact/route.ts` validates all fields server-side, checks honeypot
4. Resend sends a formatted email to `info@singhconstructions.ca`
5. Reply-To is set to the visitor's email — replying goes directly to them
6. Visitor sees a success confirmation message on screen

## Development
```bash
npm install
cp .env.example .env.local   # fill in RESEND_API_KEY
npm run dev                  # http://localhost:3000
```

## Deployment
Push to GitHub → Vercel auto-deploys. Add environment variables in Vercel dashboard (Settings > Environment Variables) before first deploy.

## Page Sections (single-page layout)
`Navbar` → `Hero` → `Services` → `About` → `Why Choose Us` → `Portfolio` → `Contact` → `Footer`

## Brand Colours (Dark Theme)
The site uses a dark background throughout — the company logo is gold with a transparent background and must always sit on dark surfaces.

| Token | Hex | Usage |
|---|---|---|
| Background | `#0D0D0D` | Page background (near-black) |
| Surface | `#1A1A1A` | Cards, form fields, sections |
| Divider | `#2A2A2A` | Borders, horizontal rules |
| Gold (primary) | `#D4A017` | Logo, headings, icon accents, borders |
| Gold hover | `#F0B429` | Interactive gold states |
| Body text | `#E5E5E5` | All paragraph text |
| Muted text | `#9A9A9A` | Labels, captions, placeholders |
| CTA button | `#D4A017` bg + `#0D0D0D` text | Primary call-to-action |

**Logo rule:** Always place the gold transparent-background logo on dark (`#0D0D0D` or `#1A1A1A`) backgrounds. Never on white or light backgrounds.

## Typography
- **Headings**: Montserrat (Bold 700) — via Next.js `next/font/google`
- **Body**: Inter (Regular 400, Medium 500) — via Next.js `next/font/google`

## File Structure
```
├── app/
│   ├── layout.tsx               # Root layout, fonts, SEO metadata
│   ├── page.tsx                 # Single-page homepage
│   ├── globals.css              # Tailwind base + CSS custom properties
│   └── api/contact/route.ts    # POST — validates form, sends email via Resend
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── Services.tsx
│   │   ├── About.tsx
│   │   ├── WhyChooseUs.tsx
│   │   ├── Portfolio.tsx
│   │   └── Contact.tsx
│   └── ui/
│       ├── ContactForm.tsx      # Form with validation, loading, success/error states
│       └── ServiceCard.tsx
├── lib/resend.ts                # Resend client singleton
├── types/contact.ts             # ContactFormData TypeScript type
├── public/images/               # Hero bg, about photo, portfolio photos
├── .env.local                   # Secrets — never commit
└── .env.example                 # Safe template to commit
```

## Contact Form Fields
| Field | Required | Notes |
|---|---|---|
| Full Name | Yes | |
| Email | Yes | validated format |
| Phone | Yes | critical for trades business |
| Service | Yes | dropdown |
| Budget Range | No | Under $10k / $10k–$50k / $50k–$100k / $100k+ |
| Message | Yes | textarea, min 20 chars |
| `website` (honeypot) | — | hidden field, silently rejects bots if filled |

## Services Offered
1. General Contracting
2. Home Renovations
3. Commercial Construction
4. Custom Home Builds
5. Basement Development
6. Project Management

## SEO
Target keywords: `construction company Calgary`, `general contractor Calgary`, `home renovations Calgary`, `basement development Calgary`

## Verification Checklist
- [ ] `npm run dev` starts without errors
- [ ] Form submits and email arrives at info@singhconstructions.ca (check spam folder)
- [ ] Form shows success message after submit
- [ ] Form shows error message + fallback phone if submission fails
- [ ] Empty form shows validation errors
- [ ] Honeypot: manually filling hidden field sends no email
- [ ] Mobile-responsive at 375px width
- [ ] All nav links scroll to correct sections
- [ ] Phone number is a `tel:` link (tappable on mobile)
- [ ] No browser console errors
- [ ] Vercel production deploy: env vars added, form works end-to-end
