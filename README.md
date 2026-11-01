# The Elite Spa Centre — Pune

Astro + React multi-page spa website for Cloudflare Pages. Node.js 22 is configured for builds.

## Local development

- \`npm install\`
- \`npm run dev\`
- \`npm run build\`
- \`npm run preview\`

## Current site behaviour

- Appointment requests open WhatsApp; they are not stored and are not confirmed until the spa replies.
- Product checkout is an enquiry sent through WhatsApp. There is no payment gateway, inventory service or order-management backend.
- Product/service pricing is indicative and must be confirmed by the business.
- Product photographs are representative category imagery, not verified pack shots.
- The XML sitemap is generated at build time from the static pages and service catalogue.
- The site uses Cloudflare Pages headers for security policy and browser permissions.

## Before enabling online booking or sales

A real booking system needs confirmed working hours, staff/room capacity, appointment duration and buffer rules, cancellation policy, and an appointment-management backend. Online payments and order fulfilment need a payment provider account, business verification, settlement details, taxes, shipping/return policies, inventory ownership and secure server-side integration.


## Service media

- Service cards and the gallery use distinct, treatment-matched Pexels stock photographs. They are illustrative assets and are not photos of this specific spa location.
- Selected service pages include embedded Pexels stock video previews; each preview links to its original creator page. Pexels identifies these stock assets as free to use under its licence: https://www.pexels.com/license/.
- The Cloudflare Pages Content Security Policy allows the Pexels media CDN so videos can play on the site.
