# Shelf — Online Library (UI prototype)

A first UI adaptation of the TemplateMo NovaPay template into an online library concept.

## Run locally

No build step or package installation is required. Open `index.html` in a browser, or serve the directory with a local static server:

```bash
python3 -m http.server 8080
```

Then visit http://localhost:8080.

## Current prototype

- Responsive library landing page using the original NovaPay dark-slate / sky-blue palette.
- Outfit headings and DM Sans body typography.
- Silk-style reveal and hover transitions.
- Local sample book catalog, client-side search, category filters and sorting.
- Favorite toggle (in-memory only).
- Mobile navigation.

## Not implemented yet

There is no backend, authentication, persistent database, real borrowing/return workflow, or API integration. The catalog is sample data in `library.js`. These are candidates for the product backlog and upcoming sprints.

## Original template attribution

The visual language is adapted from TemplateMo template #623, NovaPay. Original template credit: https://templatemo.com/ . The original template indicates use under CC BY 3.0; retain appropriate attribution when redistributing adapted work.
