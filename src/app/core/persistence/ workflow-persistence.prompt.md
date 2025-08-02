# 🧠 Prompt: WorkflowPersistenceService (Angular, RxJS, PouchDB-backed, Enveloped)

You are building a domain-specific `WorkflowPersistenceService` in Angular that wraps a generic `PersistenceService` to provide reactive access to `Workflow` documents stored inside `DocEnvelope<Workflow>` objects.

This service specializes in:
- Observing unwrapped `Workflow` documents for runtime components
- Returning full `DocEnvelope` for workflow editors and sync tools
- Tracking all workflow documents by ID prefix
- Providing write access only through full `DocEnvelope`, not raw objects

---

## ✅ Functional Requirements

### Methods

- `workflowEnvelope$(id: string): Observable<DocEnvelope<Workflow> | undefined>`  
  Returns a live observable of a single full `DocEnvelope` for the given workflow ID.

- `workflow$(id: string): Observable<Workflow | undefined>`  
  Returns just the `Workflow` data from the envelope. Suitable for runtime consumers like the UI engine.

- `allWorkflows$(): Observable<Workflow[]>`  
  Returns all workflow documents (unwrapped) whose `_id` starts with `workflow:`. Automatically updates when the database changes.

- `saveWorkflow(envelope: DocEnvelope<Workflow>): Observable<any>`  
  Saves or updates a workflow document. Requires an envelope (with `_id`, optional `_rev`, and `data`).

- `deleteWorkflow(envelope: DocEnvelope<Workflow>): Observable<any>`  
  Deletes a workflow document using its `_id` and `_rev`.

---

## ⚙️ Implementation Notes

- Use the injected `PersistenceService` for all reads/writes
- Stream `changes$` to trigger reloading for reactive observables
- Use `combineLatest()` + `switchMap()` to re-fetch live documents
- Use `shareReplay(1)` to avoid redundant queries
- Always wrap/unwrap via `DocEnvelope<T>`
- Prefer `map(env => env?.data)` to project wrapped → unwrapped
- Use `throwError(() => err)` for error propagation
- Do not expose save/delete for raw `Workflow` objects — only for envelopes

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
workflowPersistence.workflow$('workflow:hello-world').subscribe(workflow => ...);
workflowPersistence.workflowEnvelope$('workflow:hello-world').subscribe(env => ...);
workflowPersistence.allWorkflows$().subscribe(workflows => ...);
workflowPersistence.saveWorkflow({ _id: 'workflow:abc', data: {...} }).subscribe();
workflowPersistence.deleteWorkflow({ _id: 'workflow:abc', _rev: '1-xyz', data: {...} }).subscribe();
```

---

## 🤖 For AI or Junior Dev Assistants

This service provides a clean, domain-specific layer for managing `Workflow` documents.  
The separation between wrapped (`DocEnvelope`) and unwrapped (`Workflow`) is important for architectural clarity.

- Use `workflow$()` in UI components.
- Use `workflowEnvelope$()` in editors, tools, or sync-related features.
- Always pass envelopes to `saveWorkflow()` and `deleteWorkflow()`.

Do not manipulate `_id` or `_rev` manually in components — always go through this service.
