# Prompt: Generate a minimal PouchDB-based PersistenceService for Angular

Create an Angular service called `PersistenceService` that wraps basic functionality for PouchDB.

## Features

- Use `pouchdb-browser`
- Initialize the database named `"app-db"`
- Expose the following methods:

### `getAllByPrefix<T>(prefix: string): Observable<T[]>`
- Uses `allDocs()` with `startkey` and `endkey` to find all documents with keys starting with `${prefix}:`
- Returns the `doc` values as an `Observable<T[]>`

### `getDoc<T>(id: string): Observable<T | undefined>`
- Uses `db.get()` to retrieve a document by ID
- Returns an `Observable<T | undefined>`

### `putDoc<T extends { _id: string }>(doc: T): Promise<any>`
- Uses `db.put()` to insert or update a document

### `observeChanges(): Observable<any>`
- Starts a live `db.changes()` listener that pushes events to an internal `BehaviorSubject`
- Returns an observable stream of those change events

## Constraints

- Use RxJS `Observable` and `BehaviorSubject`
- No Angular signals, just a pure service
- Must be `@Injectable({ providedIn: 'root' })`
- Include imports and type definitions
