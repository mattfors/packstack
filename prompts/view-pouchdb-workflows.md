# Prompt: Preload and View Workflow Documents in PouchDB

You are building an Angular 19 app that uses PouchDB to store workflow JSONs. These `.workflow.json` files are located in `src/app/workflows/`.

## Objective

1. Preload workflow JSONs into PouchDB
2. Create a route to view all PouchDB workflows

---

## Requirements

### 1. Preload Workflow JSONs on App Startup

- Create a function `preloadWorkflows()` that:
  - Imports all `.workflow.json` files from `src/app/workflows/`
  - For each file:
    - Sets `_id: workflow:{id}` in PouchDB
    - Skips inserting if it already exists

Use native `PouchDB`.

---

### 2. Create Angular View to Inspect Workflows in PouchDB

- Make a **standalone component**: `WorkflowViewerComponent`
- When loaded (on `ngOnInit`), it:
  - Connects to the same PouchDB instance
  - Queries `allDocs({ startkey: 'workflow:', endkey: 'workflow:\uffff', include_docs: true })`
  - Displays a list of all workflows as:

```
<label> (id)</label>
```

- Add a route to this component at `/workflows`
- Use `async` pipe and signals or RxJS (either is fine)

---

## Constraints

- Angular 19, standalone components
- No UI framework (no Tailwind, no Material)
- No editing, no buttons — just viewing
- Code should be clean and ready to paste in

---

## Summary

Generate:
- `preloadWorkflows()` function to insert `.workflow.json` files into PouchDB at startup
- `WorkflowViewerComponent` that displays all `workflow:*` entries from PouchDB in a basic view
