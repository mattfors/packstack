import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap, tap } from 'rxjs';
import { JsonPipe, AsyncPipe, NgIf } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { WorkflowPersistenceService } from '../../../core/persistence/workflow-persistence.service';
import { DocEnvelope } from '../../../core/model/doc-envelope.model';
import { Workflow } from '../../../core/model/workflow.model';

@Component({
  selector: 'app-workflow-detail-page',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    FormsModule,
  ],
  template: `
    <h1 class="text-2xl font-bold mb-4">Workflow Detail</h1>

    <div *ngIf="workflow$ | async as workflow">
      <textarea
        [(ngModel)]="editedJson"
        rows="20"
        class="w-full p-4 font-mono bg-gray-900 text-white border border-gray-700 rounded"
      ></textarea>

      <div class="mt-4 flex gap-4">
        <button
          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
          (click)="saveJson(workflow)"
        >
          Save
        </button>
        <button
          class="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500"
          (click)="resetJson(workflow)"
        >
          Reset
        </button>
      </div>
    </div>
  `
})
export class WorkflowDetailPage {
  workflow$: Observable<DocEnvelope<Workflow> | undefined>;
  editedJson = '';

  constructor(
    private route: ActivatedRoute,
    private workflowService: WorkflowPersistenceService
  ) {
    this.workflow$ = this.route.paramMap.pipe(
      switchMap(params => this.workflowService.workflowEnvelope$(params.get('id')!)),
      tap(workflow => {
        if (workflow) {
          this.editedJson = JSON.stringify(workflow.data, null, 2);
        }
      })
    );
  }

  saveJson(envelope: DocEnvelope<Workflow>) {
    try {
      const parsed = JSON.parse(this.editedJson);
      const updated: DocEnvelope<Workflow> = {
        _id: envelope._id,
        _rev: envelope._rev,
        data: parsed,
      };
      this.workflowService.saveWorkflow(updated).subscribe(() => {
        // Optionally show success toast here
      });
    } catch (err) {
      alert('Invalid JSON!');
    }
  }

  resetJson(envelope: DocEnvelope<Workflow>) {
    this.editedJson = JSON.stringify(envelope.data, null, 2);
  }
}
