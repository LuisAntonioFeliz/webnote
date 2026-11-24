# Apple / Analog Hybrid Style Reference (Webnote)
> Tablet-first student note-taking app in a warm chalk gallery. Center product renders as the visual event, with typography and controls kept deliberately quiet around it.

**Theme:** light (Warm Chalk & Analog Tones)

Webnote treats the application as a digital study studio: a warm chalk canvas occupies the background while precise ink-blue typography and graphite tones give each claim and body of text a controlled, editorial weight. The page blends clean layout storytelling with flat, shadowless feature surfaces, using a restrained slate green exclusively for primary actions and key conversion controls.

## Tokens — Colors (Custom Palette)

| Name | Value | Token | Role |
|------|-------|-------|------|
| App Background (Blanco Tiza) | `#F3F2EC` | `--color-chalk-bg` | Primary page canvas, dashboard background, and general app surface |
| Accent / Actions (Verde Pizarra) | `#658D6D` | `--color-slate-green` | Primary conversion controls, primary buttons, and key interactive highlights |
| Headings (Azul Tinta) | `#263746` | `--color-ink-blue` | Titles, major headings, and primary display text simulating classic pen ink |
| General Text (Gris Grafito) | `#646762` | `--color-graphite` | Primary body copy, paragraphs, and high-emphasis reading text |
| Secondary Text (Gris Lápiz) | `#858781` | `--color-pencil-gray` | Secondary copy, metadata, timestamps, and low-emphasis text |
| Card & Modal Surface (Blanco Cálido) | `#FAF9F5` | `--color-warm-card` | Feature card surfaces, modal windows, and container elements harmonized with chalk background |
| Hairline Border (Borde Cálido Tiza) | `#E2DFD5` | `--color-warm-border` | 1px dividers, control outlines, and subtle card borders aligned with the warm palette |

### Notebook Canvas Palette (Specific to Writing Area)
| Notebook Element | Value | Token | Role |
|------------------|-------|-------|------|
| Paper Background | `#FAF9F3` | `--notebook-paper` | Warm organic paper fill for the writing canvas |
| Horizontal Lines | `#9CB9D8` | `--notebook-lines` | Soft blue ruled lines across the notebook page |
| Margin Line | `#C71585` | `--notebook-margin` | Distinct vertical pink/raspberry margin line |

---

## Tokens — Typography & Layout

### Typography
- **Headings & Display:** SF Pro Display / Inter (Weights: 500, 600) — Used with precise tight tracking for large titles in `#263746`.
- **Body & Controls:** SF Pro Text / Inter (Weights: 400, 500) — Used for general text in `#646762` and secondary info in `#858781`.

### Spacing & Shapes
- **Base unit:** 4px
- **Card & Media Border Radius:** 28px
- **Buttons & Action Pills:** 9999px (fully rounded)
- **Inputs:** 980px
- **Borders & Dividers:** Use 1px `#E2DFD5` for clean, subtle separation without harsh contrast.
- **Shadows:** Avoid heavy drop shadows; surfaces rely on flat `#FAF9F5` against `#F3F2EC` with subtle 1px borders (`#E2DFD5`).

---

## Tailwind v4 Configuration (`globals.css`)

```css
@theme {
  /* Custom Webnote App Palette */
  --color-chalk-bg: #F3F2EC;
  --color-slate-green: #658D6D;
  --color-ink-blue: #263746;
  --color-graphite: #646762;
  --color-pencil-gray: #858781;
  --color-warm-card: #FAF9F5;
  --color-warm-border: #E2DFD5;

  /* Notebook Canvas Palette */
  --notebook-paper: #FAF9F3;
  --notebook-lines: #9CB9D8;
  --notebook-margin: #C71585;

  /* Typography */
  --font-sf-pro-display: 'SF Pro Display', ui-sans-serif, system-ui, -apple-system, sans-serif;
  --font-sf-pro-text: 'SF Pro Text', ui-sans-serif, system-ui, -apple-system, sans-serif;

  /* Border Radius */
  --radius-cards: 28px;
  --radius-pills: 36px;
  --radius-buttons: 9999px;

  /* Borders */
  --border-subtle: 1px solid #E2DFD5;
}