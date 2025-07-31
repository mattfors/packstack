import { Component, OnInit } from '@angular/core';
import PouchDB from 'pouchdb';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-workflow-viewer',
  standalone: true,
  template: `
    <div *ngIf="workflows | async as workflowList">
      <div *ngFor="let workflow of workflowList">
        <label>{{ workflow.doc.label }} ({{ workflow.id }})</label>
      </div>
    </div>
  `,
  imports: [
    AsyncPipe,
    NgIf,
    NgForOf
  ]
})
export class WorkflowViewerComponent implements OnInit {
  workflows!: Promise<any[]>;
  private db = new PouchDB('workflows-db');

  ngOnInit() {
    this.workflows = this.db
      .allDocs({ startkey: 'workflow:', endkey: 'workflow:\uffff', include_docs: true })
      .then((result) => result.rows);
  }
}
