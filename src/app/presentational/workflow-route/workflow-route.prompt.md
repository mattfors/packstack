# 🧠 Prompt: WorkflowRouteComponent (Reactive, Live-Updating Workflow Viewer)

You are building a standalone Angular component named `WorkflowRouteComponent` that displays a single `Workflow` document based on the current route parameter.

This component **must not** use a route resolver. Instead, it should **reactively listen** to the route `paramMap` and retrieve the live-updating document using `WorkflowPersistenceService.workflow$(id)`.

---

## ✅ Functional Requirements

### Component Behavior

- Fetch the `id` parameter from the route (e.g. `workflow:hello-world`)
- Use `workflowPersistence.workflow$(id)` to retrieve a live-updating observable
- Display:
  - The workflow label (or fallback to `id`)
  - A basic `<pre>` dump of the entire workflow object

### Loading State

- While loading, show a `<p>Loading workflow...</p>` fallback

---

## ⚙️ Implementation Constraints

- Must be a **standalone** Angular component
- Must import `CommonModule` and use `*ngIf`, `| async`, and `ng-template`
- Do not use a resolver or snapshot; use `ActivatedRoute.paramMap` and `switchMap`
- Ensure that changes to the document in PouchDB are reflected live in the UI

---

## 📁 Output Path

Place this component in:

```
src/app/presentational/workflow/workflow-route.component.ts
```

---

## 🧪 Example Route

This component is mounted at a route like:

```
{ path: 'workflow/:id', component: WorkflowRouteComponent }
```

The URL `workflow/workflow:hello-world` will render the workflow with `_id = "workflow:hello-world"`.

---

## 🤖 For AI and Junior Devs

This component acts as the primary live-renderer of a workflow document.  
It sets up a pattern for reactive PouchDB-powered views using Angular’s route params and observables.

Avoid resolvers here to ensure updates are always reflected in the component.
