# PEIS Data Verification Guide

This guide defines the minimum verification workflow for adding and maintaining Education PhD supervisor records in PEIS.

## Adding Supervisors

1. Copy `data/template_supervisor.json`.
2. Create a stable `supervisor_id` using the format `sup-{country-or-region}-{university-slug}-{person-slug}`.
3. Fill all required fields in the copied object.
4. Add field-level evidence under the `evidence` object.
5. Set `verification_status` to `draft` while collecting evidence.
6. Move the record into the `supervisors` array in `data/supervisors.json`.
7. Set `verification_status` to `verified` only after required fields are supported by accepted sources.

Do not add invented names, emails, webpages, publication counts, research interests, or supervision status.

## Required Field Evidence

Each verified supervisor should include evidence for:

- `name`
- `email`
- `personal_homepage_url`
- `department_homepage_url`
- `academic_title`
- `research_fields`
- `publication`
- `phd_supervisor_status`

Each evidence entry uses:

```json
{
  "source_url": "https://official-source.example.edu/profile",
  "checked_date": "YYYY-MM-DD",
  "notes": null
}
```

## Accepted Sources

Preferred sources:

- Official university profile pages
- Official faculty or school directory pages
- Official department pages
- Official doctoral programme or research-degree pages
- Official CV pages hosted by the university

Acceptable supplementary sources:

- Google Scholar profiles
- Scopus profiles
- Web of Science profiles
- ORCID profiles
- CNKI author pages
- Publisher pages for recent publications

Not accepted as sole evidence:

- AI-generated summaries
- Memory or informal notes
- Social media pages
- Unverified third-party biography pages
- Student forum posts

## Verification Status

Use only these values:

- `draft`: Record is incomplete or still being checked.
- `verified`: Required fields have accepted sources and checked dates.
- `needs_review`: A source is ambiguous, missing, moved, or conflicts with another source.
- `outdated`: The record has not been reviewed within the update cycle or contains known stale information.

## Update Cycle

Review verified records every 6-12 months.

Immediately mark a record as `needs_review` when:

- A homepage URL breaks.
- An email disappears from official pages.
- A professor changes institution.
- A PhD programme page changes supervision eligibility wording.
- Publication counts are older than 12 months.

Mark a record as `outdated` when it has not been reviewed within the current update cycle.

## Publication Counts

Publication counts must include a source and checked date. If a count comes from multiple databases, record the database in `evidence.publication.notes`.

Do not mix all-publication counts with SSCI/CSSCI counts without explanation.

## Country And Region

Use `country` for the sovereign or administrative location label used in the database.

Use `region` for PEIS filtering:

- `Hong Kong`
- `Mainland China`
- `Global`
- `not_verified`

## Supervisor IDs

`supervisor_id` is the permanent primary key. Do not change it after publication.

If a supervisor changes university, keep the same `supervisor_id` and update the university fields with new evidence.
