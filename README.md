# PhD Education Intelligence System (PEIS)

PEIS is a public static web tool for PhD applicants exploring education research fields, supervisor fit, and application strategy.

This is not a personal website, blog, or autobiographical portfolio. It is a browser-only intelligence system built with HTML, CSS, JavaScript, and JSON files.

PEIS supports English and Chinese interface switching from the top-right language control.

## Modules

- **Research Field Map**: expandable taxonomy for major education research areas.
- **Supervisor Database**: searchable and filterable placeholder supervisor dataset.
- **AI Recommendation Engine**: local rule-based scoring that returns the top five supervisor matches from applicant input.

## Scoring Formula

The recommendation engine uses this transparent weighted score:

```text
score =
  research_field_overlap * 0.4 +
  keyword_match * 0.2 +
  methodology_match * 0.3 +
  university_tier_bonus * 0.1
```

Region preference is handled inside the university tier bonus so the requested formula remains intact.

## File Structure

```text
/index.html
/style.css
/script.js
/data/research_fields.json
/data/supervisors.json
/README.md
```

## Data Notice

All supervisor entries are sample placeholder records for system demonstration. Applicants should verify names, emails, publications, availability, and department links through official university websites before making real application decisions.

## GitHub Pages Deployment

1. Push this repository to GitHub.
2. Open repository settings.
3. Go to **Pages**.
4. Select **Deploy from a branch**.
5. Choose the `main` branch and `/root` folder.
6. Save the settings.

The entry point is `index.html`, so the site is ready for GitHub Pages without a build step.

## Local Preview

Because the app loads JSON files, preview it through a local static server instead of directly opening `index.html` from the filesystem:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.
