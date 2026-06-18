# Edel Kiprop — Portfolio

A fast, dark-themed personal portfolio built with plain **HTML, CSS, and JavaScript** —
no build step, no dependencies. Open it in a browser and it just works.

## Structure

```
Portfolio/
├── index.html              # All content & page structure
├── css/
│   └── styles.css          # All styling (dark & bold, violet → cyan)
├── js/
│   └── main.js             # Typing effect, nav, scroll-spy, reveal animations
├── assets/
│   ├── favicon.svg         # Browser-tab icon (EK monogram)
│   ├── og-image.svg        # Social-share preview image
│   └── Edel-Kiprop-Resume.pdf
└── README.md
```

## Run it locally

**Option A — just open it:** double-click `index.html`.

**Option B — local server** (recommended; needed so the resume/links resolve cleanly):

```bash
# Python (already installed on this machine)
python -m http.server 8000
# then open http://localhost:8000
```

## Editing your content

Everything you'd normally change lives in **`index.html`**:

- **Hero text / tagline** — the `<section class="hero">` block. The rotating phrases
  are the `words` array near the top of `js/main.js`.
- **About** — the `#about` section.
- **Skills** — the `#skills` section (add/remove `<li>` chips).
- **Projects** — the `#projects` section. Duplicate a `<article class="project">`
  block to add another project. Add `project--reverse` to its class to flip the layout.
- **Experience / education** — the `#experience` timeline; copy a `timeline__item`.
- **Contact & socials** — the `#contact` section and the footer.

**Colors:** change the accent in `css/styles.css` → `:root` →
`--accent` (violet) and `--accent-2` (cyan). Everything else follows from those.

**Resume:** replace `assets/Edel-Kiprop-Resume.pdf` with an updated file of the same name.

## Deploy (free)

**GitHub Pages**
1. Create a repo and push these files.
2. Repo → **Settings → Pages → Source: `main` / root**.
3. Your site goes live at `https://<username>.github.io/<repo>/`.

**Netlify / Vercel**
- Drag-and-drop the `Portfolio` folder onto the dashboard, or connect the repo.
- No build command needed; the publish directory is the project root.

---

Built for Edel Chepkemboi Kiprop.
