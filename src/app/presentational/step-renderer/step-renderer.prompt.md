# 🧠 Prompt: StepRendererComponent

Create a standalone Angular component named `StepRendererComponent`.

---

## ✅ Responsibilities

- Accepts an `@Input()`:
  ```ts
  step: Workflow
  ```
- Renders:
  - A container element with class `step`
  - A nested `div` with class `step-label` that displays the `label` or falls back to `id`

---

## 📐 Structure

- Use semantic HTML (`<div>`)
- Add class `step` to the container
- Add class `step-label` to the inner label element

---

## 📦 Imports

- `CommonModule`

---

## 📁 Output Path

```
src/app/presentational/workflow/step-renderer.component.ts
```
