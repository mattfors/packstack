import { Component } from '@angular/core';

import { Observable } from 'rxjs';
import { Workflow } from '../../../core/model/workflow.model';
import { WorkflowPersistenceService } from '../../../engine/workflow/workflow-persistence.service';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-workflow-browser-page',
  imports: [
    AsyncPipe,
    RouterLink,
    NgForOf,
    NgIf
  ],
  template: `
    <h1>Workflows</h1>
    <ul *ngIf="workflows$ | async as workflows">
      <li *ngFor="let wf of workflows">
        <a [routerLink]="['/workflow-admin', wf._id]">
          {{ wf._id }} — {{ wf.label || 'No label' }}
        </a>
      </li>
    </ul>
  `
})
export class WorkflowBrowserPage {

  workflows$: Observable<Workflow[]>

  constructor(private workflowService: WorkflowPersistenceService) {
    this.workflows$ = this.workflowService.allWorkflows$();
  }


}
