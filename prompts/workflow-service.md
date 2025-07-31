# Prompt: Create RxJS-Based WorkflowService for Managing PouchDB Workflows

You are building an Angular 19 application using PouchDB to store JSON-based workflow documents. These workflows are stored in PouchDB with `_id` values like `workflow:{id}`.

---

## Objective

Create a **RxJS-style Angular service** called `WorkflowService` that:

1. Loads all workflow documents on startup
2. Keeps the list of workflows updated using the `db.changes()` live feed
3. Exposes a shared `BehaviorSubject<Workflow[]>` for all workflows
4. Provides a helper method to get a specific workflow as a filtered observable
5. Provides a method to update a workflow via `db.put()`

---

## Requirements

### Service Name

```ts
@Injectable({ providedIn: 'root' })
export class WorkflowService { ... }
```

---

### Core Members

```ts
private workflows$ = new BehaviorSubject<Workflow[]>([]);
```

---

### Public API

#### `loadWorkflows(): void`
- Loads all documents where `_id` starts with `workflow:`
- Pushes them into `workflows$`

#### `getWorkflows(): Observable<Workflow[]>`
- Returns `workflows$.asObservable()`

#### `getWorkflow(id: string): Observable<Workflow | undefined>`
- Returns `workflows$.pipe(map(...))`
- Filters to just the workflow with `id === id`

#### `updateWorkflow(doc: Workflow): Observable<any>`
- Calls `db.put(doc)`
- The change will be picked up by the `changes()` listener automatically

---

### Reactive Update Loop

- Subscribe to `db.changes({ since: 'now', live: true, include_docs: true })`
- On each change:
  - If `id.startsWith('workflow:')`, re-run `loadWorkflows()` or just patch the updated workflow into the array

---

## Constraints

- Use native `pouchdb-browser`
- Use RxJS (`BehaviorSubject`, `Observable`, `map`, etc.)
- No UI, no signals — service only
- Code should be production-ready and Angular 19 compatible

---

## Summary

Create a `WorkflowService` that:
- Loads workflows from PouchDB
- Tracks them in a shared observable
- Keeps them updated via the PouchDB changes feed
- Allows filtered access to a specific workflow by ID
- Supports editing workflows with `put()`
