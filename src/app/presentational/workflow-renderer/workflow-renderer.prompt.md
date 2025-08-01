# 🧠 Prompt: WorkflowRendererComponent

You are creating a **presentational Angular component** named `WorkflowRendererComponent`.  
It is responsible for rendering a single `Workflow` object, including its label and children.

---

## ✅ Component Responsibilities

- Accept a single `Workflow` object via an `@Input() workflow`
- Display the `workflow.label` (or `workflow.id` as fallback)
- If the workflow has `children`, loop over them and render each with `<app-workflow-child-renderer [node]="child" />`

---

## 🧱 Inputs

```ts
@Input() workflow!: Workflow;
```

---

## 📦 Dependencies

This component should import and use:
- `CommonModule`
- `WorkflowChildRendererComponent`

---

## 💡 Output

Create a standalone Angular component in:

```
src/app/presentational/workflow-renderer/workflow-renderer.component.ts
```

Class name: `WorkflowRendererComponent`  
Selector: `app-workflow-renderer`

This is a **dumb/presentational** component — no state, no side effects.

---

## 🧪 Example Usage

```html
<app-workflow-renderer [workflow]="workflow" />
```

This renders the main workflow title and then delegates rendering of each child.
