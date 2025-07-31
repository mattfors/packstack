# 🧠 Prompt: WorkflowPersistenceService (Angular, RxJS, PouchDB-backed)

You are building a domain-specific `WorkflowPersistenceService` in Angular that wraps a generic `PersistenceService` to provide reactive access to `Workflow` documents.

This service specializes in:
- Fetching and updating workflows by ID
- Listing all workflows
- Observing workflow changes as live streams

---

## ✅ Functional Requirements

### Methods

- `workflow$(id: string): Observable<Workflow | undefined>`  
  Returns a live observable of a single `Workflow` document with the given ID.

- `allWorkflows$(): Observable<Workflow[]>`  
  Returns all `Workflow` documents with IDs prefixed by `workflow:`. This should reactively update when changes are detected via `PersistenceService.changes$`.

- `saveWorkflow(workflow: Workflow): Observable<any>`  
  Saves or updates a `Workflow` document.

- `deleteWorkflow(workflow: Workflow): Observable<any>`  
  Deletes a `Workflow` document. Accepts only workflows that include both `_id` and `_rev`.

---

## ⚙️ Implementation Notes

- Use the injected `PersistenceService` to perform all reads/writes
- Listen to `persistence.changes$` and re-emit filtered updates for workflows
- Always return **Observables**, never Promises
- The `_id` field must start with `"workflow:"`
- Catch errors and propagate using `throwError(() => err)`
- Use operators like `defer()`, `map()`, `filter()`, `distinctUntilChanged()`, `switchMap()`, etc.

---

## 📁 Output Path

Write this service to:

```
src/app/domain/workflows/workflow-persistence.service.ts
```

Class name should be `WorkflowPersistenceService`.

---

## 🧪 Example Usage

```ts
workflowPersistence.allWorkflows$().subscribe(workflows => ...);
workflowPersistence.workflow$('workflow:hello-world').subscribe(workflow => ...);
workflowPersistence.saveWorkflow({...}).subscribe();
workflowPersistence.deleteWorkflow({...}).subscribe();
```

---

## 🤖 For AI or Junior Dev Assistants

This service provides a clean API for working with `Workflow` documents, abstracting storage details.  
AI agents and junior devs should use this to load and modify workflows in components and editors.

- Avoid directly using the lower-level `PersistenceService` for workflow data.
- All changes to workflows should go through this domain service.
