# 🧠 Prompt: Generic PersistenceService (PouchDB, RxJS, Observable-Based)

You are building a generic `PersistenceService` in Angular that wraps **PouchDB** using **RxJS** to provide reactive, model-agnostic CRUD access to a local database.

The goal is to abstract storage so that:
- Other services (like `WorkflowPersistenceService`) can consume domain-specific models without worrying about storage implementation.
- Future storage layers (REST, IndexedDB, Firebase) could replace PouchDB with minimal changes.

---

## ✅ Functional Requirements

### Core Methods

- `getDoc<T>(id: string): Observable<T | undefined>`  
  Fetch a document by ID. Should return `undefined` if not found.

- `getAllByPrefix<T>(prefix: string): Observable<T[]>`  
  Return all documents whose `_id` starts with a given prefix.

- `putDoc<T extends { _id: string }>(doc: T): Observable<any>`  
  Insert or update a document. Must return an `Observable`, not a `Promise`.

- `removeDoc<T extends { _id: string; _rev: string }>(doc: T): Observable<any>`  
  Delete a document by ID and revision. Must return an `Observable`, not a `Promise`.

### Change Tracking

- `changes$`: Observable stream of `PouchDB.Core.ChangesResponseChange`  
  This should wrap `db.changes({ live: true })` and emit change events as they happen.
  - Must include `shareReplay(1)` so subscribers don't miss events.
  - Must cancel the feed on unsubscribe.

---

## ⚙️ Implementation Constraints

- Use `pouchdb-browser`
- Expose all methods using `Observable`, not `Promise`
- Use RxJS operators: `from()`, `defer()`, `map()`, `catchError()`, `throwError()`, `shareReplay(1)`
- Use `of(undefined)` to gracefully handle 404s in `getDoc()`
- Avoid `async`/`await` or `new Observable(...)` with `async` logic inside
- Must be `@Injectable({ providedIn: 'root' })`
- Must not throw raw errors from PouchDB — wrap in `throwError(() => err)`

---

## 📁 Output Path

Write this service to:

```
src/app/core/persistence/persistence.service.ts
```

Class name should be `PersistenceService`.

---

## 🧪 Example Usage

```ts
persistence.getDoc<Item>('item:abc').subscribe(item => ...);
persistence.getAllByPrefix<Workflow>('workflow:').subscribe(workflows => ...);
persistence.putDoc({ _id: 'workflow:test', label: 'Test' }).subscribe();
workflowPersistence.workflow$('workflow:hello-world').subscribe(...);
```

---

## 🤖 For AI or Junior Dev Assistants

This prompt is designed to enable generation of a robust, extensible persistence layer.

- Encourage downstream domain services (e.g. `workflow-persistence.service.ts`) to wrap this without duplicating logic.
- Ensure observables are used for all async operations to promote composability in Angular.
