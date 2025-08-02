# 🧠 Prompt: Generic PersistenceService (PouchDB + RxJS) with Envelopes

You are building a generic `PersistenceService` in Angular that wraps **PouchDB** using **RxJS** to provide reactive, envelope-based, model-agnostic CRUD access to a local database.

This service uses a standard envelope format to isolate application data from persistence concerns like `_id` and `_rev`.

---

## ✅ Envelope Format

All stored documents conform to the `DocEnvelope<T>` format:

```ts
export interface DocEnvelope<T> {
  _id: string;
  _rev?: string;
  data: T;
}
```

---

## ✅ Exposed Methods

### `getDoc<T>(id: string): Observable<DocEnvelope<T> | undefined>`

Fetch a single envelope by `_id`. Emits `undefined` if not found.

---

### `getAllByPrefix<T>(prefix: string): Observable<DocEnvelope<T>[]>`

Return all envelopes whose `_id` starts with the given prefix.

---

### `putDoc<T>(doc: DocEnvelope<T>): Observable<any>`

Insert or update an envelope document in the local database.

---

### `removeDoc<T>(doc: DocEnvelope<T>): Observable<any>`

Delete a document envelope using its `_id` and `_rev`.

---

### `changes$: Observable<PouchDB.Core.ChangesResponseChange>`

Live stream of all changes in the database (using `db.changes({ live: true })`). Emits full change objects with shared replay and teardown cleanup.

---

## ⚙️ Usage Patterns

- Downstream domain services like `WorkflowPersistenceService` or `EventService` consume this API without needing to understand persistence.
- Business models (`Workflow`, `Event`, etc.) live inside the `data` field of the envelope.
- All methods use `Observable` wrappers to support reactive pipelines and Angular idioms.

---

## 🧪 Example Usage

```ts
// Get one document
persistence.getDoc<Item>('item:abc').subscribe(env => console.log(env?.data));

// Save a document
persistence.putDoc({
  _id: 'event:123',
  data: { ... }
}).subscribe();

// Watch live changes
persistence.changes$.subscribe(change => console.log(change));
```

---

## 📦 Future-Proofing

- All business logic is decoupled from PouchDB: this layer can be swapped out with IndexedDB, REST, or Firebase.
- Envelopes make syncing and rollback safer and more uniform.
- Linters and types can enforce usage of envelopes throughout the app.
