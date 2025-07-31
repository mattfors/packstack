# 🧠 Project Overview: Prompt-Driven Angular Workflow App

This project is a **prompt-first**, **workflow-driven** Angular application architecture designed for **AI-assisted development**, **modular UI generation**, and **local-first state management**.

It blends **domain-driven design**, **RxJS observables**, **PouchDB local persistence**, and a **fractal workflow model** to enable dynamic, human-readable workflows that can be introspected or modified by AI, devs, or end users.

---

## 🌱 Project Philosophy

- **Prompt-First Development**: All major modules include `.prompt.md` files that describe *what* should be generated — not just how — to support AI copilot workflows and reproducible, understandable development.

- **Fractal Workflow Model**: Workflows contain subworkflows, which may contain steps, which may contain actions. This recursive, fractal design allows complex interactions to emerge from simple nested parts.

- **AI-Assisted Extensibility**: The application is built so that future AI tools or junior devs can navigate, modify, and generate new workflows, components, or services using clear markdown instructions.

---

## 🧩 Core Concepts

### 🧱 Modular Architecture

- `core/` – Infrastructure like persistence, models, utility services
- `feature/` – User-facing features like workflow rendering or pouch browser
- `domain/` – Business logic and domain-specific services (e.g. workflows)

### 🔁 Reactive Persistence

- `PersistenceService` (in `core/persistence/`) wraps PouchDB using RxJS observables
- Other services (like `WorkflowPersistenceService`) access models reactively
- Changes to documents are streamed via `changes$`

### 🧠 Workflows as Data

Example workflow stored in PouchDB:

```json
{
  "_id": "workflow:hello-world",
  "type": "workflow",
  "label": "Hello World Demo",
  "children": [
    {
      "type": "workflow",
      "layout": "stepper",
      "label": "Say Hello",
      "children": [
        {
          "subtype": "step",
          "component": "text-display",
          "label": "Greeting",
          "display": { "value": "Hello, World!" }
        }
      ]
    }
  ]
}
```

### 🌐 Routes & UI

- `/pouch/` – Browse all stored models (e.g. workflows)
- `/workflow/:id` – Render a workflow (simple list view to start)
- Dynamic components are rendered from workflow JSON definitions

---

## 🔧 Developer Patterns

- Create a new feature with a `*.prompt.md` file to describe what should exist
- Use `core/persistence/persistence.service.ts` to access or modify data
- New models go in `core/models/`, not hard-coded in logic
- Workflow definitions are stored as docs in PouchDB, preloaded at startup

---

## 🗃️ Primary Technologies

- **Angular 16+** with **Standalone Components**
- **RxJS** for reactive state & subscriptions
- **PouchDB** (via `pouchdb-browser`) for local document persistence
- **Markdown Prompts** for AI-guided development and documentation
- **Tailwind CSS** (or headless UI) for flexible, minimal styling (TBD)

---

## 🧠 Why This Matters for AI

This project is an experiment in AI-native software design:
- Prompts are first-class citizens
- Data and behavior are introspectable
- AIs can regenerate logic, UIs, or services with no prior code knowledge

The goal is to make the entire application discoverable and editable by *anyone* — human or machine.

---

## ✨ Next Steps

- Add more workflows to demonstrate barcode scanning, conditional logic, etc.
- Build `WorkflowRenderer` components to map each step type to a UI
- Scaffold domain-specific persistence services (`WorkflowPersistenceService`)
- Incorporate semantic labels, accessibility hints, and `aria-` attributes to aid future AI agents or screen readers

---

## 🧭 Guide for AI/Junior Devs

If you're an AI assistant or new developer:

1. Look for `.prompt.md` files in each module to understand purpose and structure.
2. Use `PersistenceService` to access data.
3. Modify or extend workflows by editing JSON in PouchDB or preload files.
4. Add new components using prompts rather than manual boilerplate.

The app is built for you. Welcome aboard.
