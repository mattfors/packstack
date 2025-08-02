import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap, tap } from 'rxjs';
import { JsonPipe, AsyncPipe, NgIf } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { Workflow } from '../../../workflows/workflow.service';
import { WorkflowPersistenceService } from '../../../core/persistence/workflow-persistence.service';

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
          (click)="saveJson()"
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
  workflow$: Observable<Workflow | undefined>;
  editedJson = '';

  constructor(
    private route: ActivatedRoute,
    private workflowService: WorkflowPersistenceService
  ) {
    this.workflow$ = this.route.paramMap.pipe(
      switchMap(params => this.workflowService.workflow$(params.get('id')!)),
      tap(workflow => {
        if (workflow) {
          this.editedJson = JSON.stringify(workflow, null, 2);
        }
      })
    );
  }

  saveJson() {
    try {
      const parsed = JSON.parse(this.editedJson);
      this.workflowService.saveWorkflow(parsed).subscribe(() => {

      });
    } catch (err) {
      alert('Invalid JSON!');
    }
  }

  resetJson(original: Workflow) {
    this.editedJson = JSON.stringify(original, null, 2);
  }
}
