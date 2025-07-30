# Prompt: Initialize PouchDB in Angular 19 (Standalone App)

You are helping me extend an Angular 19 app that uses:
- Standalone components
- SCSS for styling
- A prompt-first, declarative development workflow

## Goal

Integrate [PouchDB](https://pouchdb.com) and create a simple hello world demo.

## Requirements

1. **Install PouchDB** using NPM
   - `npm install pouchdb`
   - Install the type definitions for PouchDB:
     - `npm install --save-dev @types/pouchdb`

2. **Create a new component** called `PouchDemoComponent`
   - Must be a **standalone Angular component**
   - Uses inline template and styles (or SCSS file if easier)

3. **In the component:**
   - Initialize a PouchDB instance using a local DB name like `'hello-world-db'`
   - Insert a document: `{ _id: 'test', message: 'Hello, PouchDB!' }`
   - Retrieve that document and display its `message` value
   - If the doc already exists, just fetch it instead of crashing
   - Handle and display errors if anything fails
   - Use **Angular signals** (preferred) or RxJS for reactive state
   - Signals must be `WritableSignal` to allow updates.
   - Replace `update` method with `set` for updating signals.
   - Explicitly cast the `doc` object to ensure type safety when accessing properties like `message`.

4. **Render the component** inside the root `AppComponent` (also standalone)

5. **Debugging and Verification**:
   - Add logging to verify document creation and retrieval.
   - Use `db.allDocs()` to inspect the database contents for debugging.
   - Confirm that the data is stored in IndexedDB using browser developer tools.

## Output Format

- TypeScript code for the component
- Example of how to render it in `AppComponent`
- Any installation steps or notes if needed

## Notes

Keep it minimal and clean. This is a hello world example to verify that PouchDB works correctly inside the Angular 19 app and is usable for future state and event workflows.
