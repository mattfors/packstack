# 📦 Packstack

Packstack is a modular, low-code workflow engine designed for mobile web apps in industrial environments.

Rather than building bespoke UI components for every business process, Packstack lets you define structured workflows using configuration files and declarative state logic. This approach prevents the typical UI bloat that occurs when business logic leaks into shared components or when developers repeatedly reinvent similar interaction patterns for each process.

Packstack’s architecture encourages reusability, separation of concerns, and introspectable logic — enabling rapid iteration and cleaner maintenance as industrial needs evolve.


## 🌐 Demo

Check out the live demo on GitHub Pages:
**[https://mattfors.github.io/packstack](https://mattfors.github.io/packstack)**

---

## 🧱 Core Architecture

### 🔧 Workflow Definitions
Workflows are defined as structured configuration files—JSON under the hood—but can be authored in:
- JSON
- TOML
- (Eventually) a drag-and-drop visual editor for admins

These definitions describe the sequence of steps, actions, and data models for a given industrial process.

### 🧠 View Composition
The core rendering logic is driven by the `WorkflowViewModel` and its associated *conductor*. Together, they take:
- **Current state** (e.g. scanned items, selected actions)
- **Screen configuration** (defined in the workflow)
- And produce a tree of view nodes that map directly to presentational components.

This enables UI to be dynamically generated based on declarative state + definitions, rather than imperative template logic.

### 💾 Local-First Storage
Packstack uses **PouchDB** to store:
- Workflow definitions
- Runtime state for each workflow instance

This allows for full local-first operation, offline resilience, and real-time reactivity across components and services.

---

## 🔁 Execution Flow

Packstack turns structured definitions and state into dynamic UI with reactive updates. Here's how a typical interaction unfolds:

### 1. Route Activation
A user navigates to a URL like:

```
/workflow/:id/:index
```

The `WorkflowRouteComponent` calls the `WorkflowComposerService`, which:
- Loads the workflow definition from PouchDB (based on `:id`)
- Locates the current subworkflow or step (based on `:index`)
- Generates a `WorkflowViewModel` to describe what should be displayed

This view model powers all rendering, including steppers, nested components, and custom actions.

### 2. User Interaction → Event
Presentational components (e.g. buttons, selectors, scanners) emit **workflow events** when users interact.

While not yet fully implemented, the design intends for:
- Events to be centrally dispatched (likely via a `WorkflowService` or similar)
- Each event to correspond to a defined action type (e.g. `submitForm`, `goToStep`, `scanBarcode`)

### 3. Event Reduction → State Update
Incoming events will be processed by a reducer pipeline:
- **Generic reducers** handle shared logic across workflows
- **Domain-specific reducers** can be plugged in to extend functionality

Reducers will update the current workflow instance state, which is persisted to PouchDB.

### 4. Recomposition and Rerender
Once state is updated, the `WorkflowComposerService` reacts to the change and regenerates a fresh `WorkflowViewModel`.

This triggers Angular’s reactive binding system to rerender only the parts of the view that need to change.

### 5. Subworkflows
Subworkflows are explicitly triggered by the user via **navigation events** (e.g. tapping “Next” or “Verify”). They are loaded and rendered through the same composition system, allowing for deeply nested yet declarative workflows.

---

## 🛠️ Getting Started

To run Packstack locally:

### 📦 Install Dependencies
```bash
npm install
```

### ▶️ Start the Dev Server
```bash
npm start
```

This will compile and serve the app on [http://localhost:4200](http://localhost:4200) with hot reloading.

### 🧪 Run Tests
```bash
npm test
```

### 🧹 Lint and Format
```bash
npm run lint
```

### ⚙️ Build for Production
```bash
npm run build
```

Packstack uses Angular, Tailwind, and PouchDB. Make sure you have Node.js (18+) installed.
