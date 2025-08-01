# 🧠 Prompt: StepperRendererComponent

Create a standalone Angular component named `StepperRendererComponent`.

---

## ✅ Responsibilities

- Accepts an `@Input()`:
  ```ts
  steps: Workflow[]
  ```
- Renders the steps as an ordered list (`<ol>`).
- Each step should be inside a list item (`<li>`) with class `stepper-step`.
- Each list item renders a `StepRendererComponent`.

---

## 📐 Structure

- Use semantic HTML (`<ol>`, `<li>`)
- Add class `stepper` to the list container
- Add class `stepper-step` to each list item
- Render each step using the `StepRendererComponent`

---

## 📦 Imports

- `CommonModule`
- `StepRendererComponent`

---

## 📁 Output Path

```
src/app/presentational/workflow/stepper-renderer.component.ts
```
