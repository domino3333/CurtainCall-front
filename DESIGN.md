---
name: CurtainCall Design System
version: 0.1.0
tokens:
  color:
    canvas: "#f6f2ec"
    canvasElevated: "#fffaf3"
    ink: "#191511"
    muted: "#756b60"
    line: "#e4d8ca"
    lineStrong: "#c9b7a4"
    curtain: "#8f1f2d"
    curtainDeep: "#4a1118"
    stageGold: "#c9923e"
    midnight: "#172033"
    sage: "#63796b"
  radius:
    sm: "6px"
    md: "8px"
  shadow:
    soft: "0 16px 36px rgba(70, 45, 22, 0.10)"
    lift: "0 24px 70px rgba(25, 21, 17, 0.16)"
  spacing:
    xs: "6px"
    sm: "10px"
    md: "16px"
    lg: "24px"
    xl: "36px"
    xxl: "56px"
---

# CurtainCall Visual Direction

CurtainCall should feel like a premium cultural guide, not a generic ticketing clone. The visual language borrows from theater materials: curtain red, warm paper, muted ink, restrained gold, and editorial spacing.

## Personality

- Calm, curated, and trustworthy.
- More cultural magazine than ecommerce mall.
- Rich enough to feel intentional, but still practical for search and repeated browsing.

## Layout Rules

- The first viewport must immediately show the CurtainCall brand, search, and real performance cards.
- Avoid oversized marketing hero sections that hide the product.
- Use full-width page bands and constrained content widths. Do not nest cards inside cards.
- Cards use 8px radius or less, stable image ratios, and clear metadata.

## Color Rules

- Curtain red is reserved for brand surfaces and primary interactions.
- Warm canvas backgrounds keep the page from looking like a default admin dashboard.
- Gold is an accent for counts, labels, and small highlights, not a full background.
- Avoid purple-blue gradients, beige-only monotony, and dark slate dominance.

## Typography

- Use system sans-serif for now.
- Headings should be editorial and compact, not oversized SaaS hero text.
- Body text should stay readable at 14-16px with line height around 1.5.

## Components

- Search is the main control and should be visually central.
- Filters are compact chips with clear active state.
- Cards must keep thumbnail dimensions stable with `aspect-ratio`.
- Status messages should be quiet and centered.

## Motion

- Use subtle hover lift only on cards and buttons.
- No animated decorative blobs or generic glassmorphism.
