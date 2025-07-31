# 🧠 Prompt: provideWorkflowInitializer (App Startup Seed for Workflow)

You are creating an Angular `APP_INITIALIZER` that preloads the local PouchDB database with a sample `Workflow` document at app startup. This is intended for development or bootstrapping new environments.

---

## ✅ Functional Requirements

- Define a `provideWorkflowInitializer()` function that returns an Angular `APP_INITIALIZER` provider.
- The initializer must:
  - Inject `WorkflowPersistenceService`
  - Call `workflow$('workflow:hello-world')` to check for the workflow’s existence
  - Insert a default workflow only if one is not found
  - Return a `Promise<void>` so Angular waits before continuing app startup

---

## 🌱 Default Workflow

Use this shape for the default workflow:

```ts
const defaultWorkflow: Workflow = {
  _id: 'workflow:hello-world',
  id: 'hello-world',
  label: 'Hello World Demo',
  type: 'workflow',
  children: [
    {
      id: 'step-1',
      type: 'workflow',
      layout: 'stepper',
      label: 'Say Hello',
      children: [
        {
          id: 'step-1-1',
          subtype: 'step',
          component: 'text-display',
          label: 'Greeting',
          display: { value: 'Hello, World!' }
        }
      ]
    }
  ]
};
```

---

## ⚙️ Implementation Notes

- Use Angular’s `inject()` function (Angular 15+) instead of constructor injection
- Use `firstValueFrom()` on the observable returned by `workflow$()`
- Wrap in try/catch but ignore 404s — insert only if undefined
- This initializer will live next to `workflow-persistence.service.ts` in:

```
src/app/domain/workflows/workflow.initializer.ts
```

---

## 🧪 Usage Example

In `app.config.ts`:

```ts
import { provideWorkflowInitializer } from './domain/workflows/workflow.initializer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideWorkflowInitializer()
  ]
};
```

---

## 🤖 For AI or Junior Devs

- This initializer helps preload development data.
- Future variations might conditionally run based on environment.
- You can extend this to seed multiple workflows, steps, or test data.

