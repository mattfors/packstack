import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import PouchDB from 'pouchdb';
import { JsonPipe, NgForOf, NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-pouch-explorer',
  template: `
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
  `,
  imports: [
    RouterLink,
    NgForOf,
    JsonPipe,
    NgIf
  ]
})
export class PouchExplorerComponent {
  type: string | null = null;
  id: string | null = null;
  content: any[] | any = [];
  private db = new PouchDB('workflows-db');

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(async (params) => {
      this.type = params['type'] || null;
      this.id = params['id'] || null;

      if (!this.type) {
        // Mode 1: List all unique prefixes before ":" in _id
        const allDocs = await this.db.allDocs({ include_docs: true });
        const types = new Set(
          allDocs.rows.map((row) => row.id.split(':')[0])
        );
        this.content = Array.from(types);
      } else if (this.type && !this.id) {
        // Mode 2: List all docs where _id starts with `${type}:`
        const allDocs = await this.db.allDocs({
          include_docs: true,
          startkey: `${this.type}:`,
          endkey: `${this.type}:\ufff0`,
        });
        this.content = allDocs.rows.map((row) => ({
          id: row.id,
          doc: row.doc,
        }));
      } else if (this.type && this.id) {
        // Mode 3: Get and display doc with id `${type}:${id}`
        try {
          this.content = await this.db.get(`${this.type}:${this.id}`);
        } catch (error) {
          console.error('Error fetching document:', error);
          this.content = { error: 'Document not found' };
        }
      }
    });
  }
}
