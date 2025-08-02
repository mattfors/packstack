import { Component } from '@angular/core';

import { Observable } from 'rxjs';
import { Workflow } from '../../../core/model/workflow.model';
import { WorkflowPersistenceService } from '../../../core/persistence/workflow-persistence.service';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DocEnvelope } from '../../../core/model/doc-envelope.model';



@Component({
  selector: 'app-workflow-browser-page',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLink,
    NgForOf,
    NgIf
  ],
  template: `
    <h1 class="text-2xl font-bold mb-4">Workflows</h1>

    <ul *ngIf="workflows$ | async as workflows">
      <li *ngFor="let wf of workflows">
        <a [routerLink]="['/workflow-admin', wf._id]" class="text-blue-600 hover:underline">
          {{ wf._id }} — {{ wf.data.label || 'No label' }}
        </a>
      </li>
    </ul>

    <p *ngIf="(workflows$ | async)?.length === 0" class="text-gray-500">
      No workflows found.
    </p>
  `
})
export class WorkflowBrowserPage {
  workflows$: Observable<DocEnvelope<Workflow>[]>;

  constructor(private workflowService: WorkflowPersistenceService) {
    this.workflows$ = this.workflowService.allWorkflowEnvelopes$();
  }
}
