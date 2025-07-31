# 🧠 Prompt: Workflow Admin UI (Viewer + Editor)

You are building a feature module called `workflow-admin` for managing and editing workflow definitions stored in PouchDB.

This module uses the existing `WorkflowPersistenceService` to provide:
- A list view of all workflows
- A detail view for individual workflow documents
- Optional in-place editing of workflow JSON

---

## ✅ Functional Requirements

### `/workflow-admin`
- Component: `WorkflowBrowserPage`
- Fetches all workflows via `WorkflowPersistenceService.getAll()`
- Displays:
  - Workflow `_id`
  - `label` if present
  - Link to open workflow detail page

### `/workflow-admin/:id`
- Component: `WorkflowDetailPage`
- Fetches workflow via `WorkflowPersistenceService.getWorkflow(id)`
- Displays:
  - Full workflow object as formatted JSON
  - Optional "Edit" button to enable JSON editing
  - Optional "Save" button to call `putWorkflow(workflow)`
  - Show `_id` and `_rev`

---

## 📁 Output Structure

Write files to:

```
src/app/features/workflow-admin/
```

Include:

```
workflow-admin.routes.ts        # Angular Routes definition
workflow-admin.module.ts        # NgModule
pages/
  workflow-browser.page.ts      # Displays all workflows
  workflow-detail.page.ts       # Shows a single workflow
components/
  workflow-list.component.ts    # List UI component
  workflow-editor.component.ts  # JSON editor component
+workflow-admin.prompt.md       # This prompt file
```

---

## 📌 Routing

Register routes:

```ts
{
  path: 'workflow-admin',
  component: WorkflowBrowserPage
},
{
  path: 'workflow-admin/:id',
  component: WorkflowDetailPage
}
```

---

## 🔄 Future Enhancements

- Add UI preview of stepper/steps
- Enable live test mode for workflows
- Add new workflow creation flow

---

## 🧩 Dependencies

- Angular RouterModule
- WorkflowPersistenceService
- JSON textarea or viewer (basic pre/code or optional Monaco editor)

This prompt scaffolds a basic admin UI for browsing, inspecting, and editing workflows in a local-first, reactive Angular application.
