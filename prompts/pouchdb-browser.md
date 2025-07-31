# Prompt: Create Angular Route to Browse PouchDB Contents with a Single Generalized Component

You are building an Angular 19 app that uses PouchDB for local document storage. You want to create a mini browser to view what's inside the PouchDB database via Angular routes.

## Objective

Create a **single, reusable Angular component** that displays the contents of PouchDB in 3 modes based on the route path:

---

## Route Modes

### 1. `/pouch`
- Show a list of **distinct document types**, extracted from PouchDB document `_id`s (e.g. `workflow:hello-world`)
- Each link navigates to `/pouch/{type}`

### 2. `/pouch/:type`
- Show a list of **documents of that type**
- Each link navigates to `/pouch/{type}/{id}`

### 3. `/pouch/:type/:id`
- Display the full JSON of a single document (prettified with `<pre>{{ doc | json }}</pre>`)

---

## Component

Create a **standalone component** called `PouchExplorerComponent`.

It should:

- Use Angular's `ActivatedRoute` to detect the presence of `type` and `id`
- Use a single `ngOnInit` block that handles all three route modes
- Use native `PouchDB` API
- Display output in plain HTML (no styling framework)
- Use signals or RxJS (either is fine)

---

### Behavior Breakdown (in pseudocode):

```ts
if no type:
  list all unique prefixes before ":" in _id
else if type and no id:
  list all docs where _id starts with `${type}:`
else if type and id:
  get and display doc with id `${type}:${id}`
```

---

## Sample Template Logic

```html
<h1 *ngIf="!type">Types</h1>
<ul *ngIf="!type">
  <li *ngFor="let t of content">
    <a [routerLink]="['/pouch', t]">{{ t }}</a>
  </li>
</ul>

<h1 *ngIf="type && !id">{{ type }} Documents</h1>
<ul *ngIf="type && !id">
  <li *ngFor="let row of content">
    <a [routerLink]="['/pouch', type, row.id.split(':')[1]]">
      {{ row.doc.label || row.id }}
    </a>
  </li>
</ul>

<h1 *ngIf="id">Document: {{ id }}</h1>
<pre *ngIf="id">{{ content | json }}</pre>
```

---

## Routing Setup

Add all three routes pointing to the same component:

```ts
{ path: 'pouch', component: PouchExplorerComponent },
{ path: 'pouch/:type', component: PouchExplorerComponent },
{ path: 'pouch/:type/:id', component: PouchExplorerComponent }
```

---

## Constraints

- Angular 19
- Standalone component
- No external UI libraries (no Tailwind, no Material)
- No document editing, just viewing
- Code should be minimal and clean

---

## Summary

Generate:

- `PouchExplorerComponent` (standalone)
- Routing to support all three browsing modes
- Basic HTML rendering of PouchDB content based on route context
