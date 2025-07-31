# Prompt: Generate Hello World Fractal Workflow JSON

You are helping design an Angular 19 application with a fractal workflow system. Every node is a `workflow`, which may contain `children`. Some workflows are laid out as steppers, and each "step" is just a child workflow with `subtype: "step"`.

## Objective

Generate the following JSON structure **exactly** — no Angular code, no extras — just this object, and nothing more.

## Required Output

```json
{
  "id": "hello-world-workflow",
  "type": "workflow",
  "label": "Hello World Demo",
  "children": [
    {
      "id": "hello-stepper",
      "type": "workflow",
      "layout": "stepper",
      "label": "Say Hello",
      "children": [
        {
          "id": "greet-user",
          "type": "workflow",
          "subtype": "step",
          "label": "Greeting",
          "component": "text-display",
          "display": {
            "value": "Hello, World!"
          },
          "actions": [
            {
              "type": "confirm",
              "label": "Continue",
              "trigger": "button"
            }
          ]
        },
        {
          "id": "farewell-user",
          "type": "workflow",
          "subtype": "step",
          "label": "Farewell",
          "component": "text-display",
          "display": {
            "value": "Goodbye, World!"
          },
          "actions": [
            {
              "type": "confirm",
              "label": "Done",
              "trigger": "button"
            }
          ]
        }
      ]
    }
  ]
}
