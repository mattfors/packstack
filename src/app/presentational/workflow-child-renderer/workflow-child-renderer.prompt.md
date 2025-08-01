# 🧠 Prompt: WorkflowChildRendererComponent

You are creating a **presentational Angular component** named `WorkflowChildRendererComponent`.  
It is responsible for rendering one node in a `Workflow` tree based on its `subtype`.

---

## ✅ Component Responsibilities

- Accept a single `Workflow` object via an `@Input() node`
- Inspect the `node.subtype` and render appropriately:
  - If `subtype === 'stepper'` → render `<app-stepper-renderer [steps]="node.children!" />`
  - Otherwise → render `<app-step-renderer [step]="node" />`

---

## 🧱 Inputs

```ts
@Input() node!: Workflow;
```

---

## 📦 Dependencies

This component should import and use:
- `CommonModule`
- `StepperRendererComponent`
- `StepRendererComponent`

---

## 💡 Output

Create a standalone Angular component in:

```
src/app/presentational/workflow-child-renderer/workflow-child-renderer.component.ts
```

Class name: `WorkflowChildRendererComponent`  
Selector: `app-workflow-child-renderer`

This is a **dumb/presentational** component — no service injection, no state logic.

---

## 🧪 Example Usage

```html
<app-workflow-child-renderer [node]="workflow" />
```

This renders the given workflow node by checking its `subtype`.
