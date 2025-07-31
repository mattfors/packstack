# Prompt: Create Angular Route to Render Workflow Steps

You are building an Angular 19 app that uses a fractal JSON-based workflow system stored in PouchDB.

## Objective

Create a simple route `/workflow/:id` that loads a workflow from PouchDB and displays its **steps**, as a numbered list of labels.

---

## Example

For a workflow with this structure:

```json
{
  "id": "hello-world-workflow",
  "label": "Hello World Demo",
  "children": [
    {
      "type": "workflow",
      "layout": "stepper",
      "children": [
        {
          "subtype": "step",
          "label": "Greeting"
        },
        {
          "subtype": "step",
          "label": "Farewell"
        }
      ]
    }
  ]
}
```

The route `/workflow/hello-world-workflow` should display:

```
Steps:
1. Greeting
2. Farewell
```

---

## Component: `WorkflowViewComponent`

- Should be standalone
- Uses `ActivatedRoute` to read `:id`
- Fetches workflow from PouchDB using `_id: workflow:{id}`
- Recursively finds all `workflow` objects where `subtype === "step"`
- Displays their `label`s in order
- Minimal HTML (no styles, no buttons, no routing between steps)

---

## Constraints

- Angular 19
- Native `PouchDB`
- No external libraries
- One component only
- Code should be clean and ready to paste in

---

## Summary

Generate a `WorkflowViewComponent` that lists steps from a stored workflow as plain HTML text at `/workflow/:id`
