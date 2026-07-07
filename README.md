# PhD Education Intelligence System (PEIS)

PEIS is a public static web tool for PhD applicants exploring education research fields, verified Education PhD supervisor records, and transparent supervisor-fit recommendations.

This is not a personal website, blog, or autobiographical portfolio. It is a browser-only academic intelligence system built with HTML, CSS, JavaScript, and JSON files.

PEIS supports English and Chinese interface switching from the top-right language control.

## Current Data Policy

The supervisor database has been upgraded from demo records to a verification-first architecture.

- Fake supervisors are not allowed.
- Unverified emails, webpages, publication counts, research interests, and supervision status are not allowed.
- Empty fields should use `null`, an empty array, or `not_verified`.
- A supervisor record should only be published after source URLs support the factual fields.

The current `data/supervisors.json` file is intentionally empty until real supervisor records are manually verified.

## Modules

- **Research Field Map**: expandable taxonomy for major education research areas.
- **Supervisor Database**: searchable, filterable, sortable, and paginated verified supervisor dataset.
- **AI Recommendation Engine**: local rule-based scoring that returns the top five supervisor matches from applicant input.

## Scoring Formula

The recommendation engine uses this transparent weighted score:

```text
score =
  research_field_similarity * 0.40 +
  keyword_similarity * 0.25 +
  methodology_compatibility * 0.20 +
  university_research_environment * 0.15
```

The system returns a match score, component scores, and an explanation of the matched evidence.

## File Structure

```text
/index.html
/style.css
/script.js
/data/research_fields.json
/data/supervisors.json
/data/template_supervisor.json
/data/universities.json
/README.md
```

## Supervisor Schema

Each supervisor entry in `data/supervisors.json` must include:

- Basic information: `name`, `university`, `faculty_school`, `department`, `academic_title`, `email`, `personal_homepage_url`, `department_homepage_url`
- Academic classification: `region`, `university_tier`, `education_discipline_ranking_level`
- Research information: `research_fields`, `keywords`, `methodology`
- Academic productivity: `publication_count`, `recent_publications_last_5_years`, `SSCI_publications`, `CSSCI_publications`, `major_research_projects`
- Doctoral information: `phd_supervisor_status`, `doctoral_program`, `supervision_notes`
- Data quality: `source_urls`, `last_updated`, `verification_status`

Use `data/template_supervisor.json` as the copyable import format for future records.

## How To Add New Supervisors

1. Copy the object from `data/template_supervisor.json`.
2. Verify the supervisor through official university, faculty, department, or personal profile pages.
3. Verify doctoral supervision eligibility through an official doctoral programme, research degree, graduate school, or department source.
4. Verify publication counts through an official profile, CV, Google Scholar, Scopus, Web of Science, CNKI, or another clearly cited source.
5. Add all source links to `source_urls`.
6. Set `verification_status` to `verified` only when required fields are supported by sources.
7. Insert the object into the `supervisors` array in `data/supervisors.json`.

Do not infer an email, homepage, publication count, SSCI/CSSCI count, or PhD supervision status from memory or AI-generated text.

## Target Universities

`data/universities.json` stores the target-university index.

- Hong Kong target universities are listed with official university or education-unit URLs where verified.
- Mainland China Education discipline B+ or above records are prepared as a structured registry with fields `university_name`, `discipline_level`, and `education_school_url`.
- Mainland China entries should be added only after checking an authoritative discipline-evaluation source and the university's official education school page.

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
