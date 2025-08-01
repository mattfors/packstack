import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap, tap } from 'rxjs';
import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';
import { Workflow } from '../../../workflows/workflow.service';
import { WorkflowPersistenceService } from '../../../core/persistence/workflow-persistence.service';


@Component({
  selector: 'app-workflow-detail-page',
  imports: [
    JsonPipe,
    AsyncPipe,
    NgIf
  ],
  template: `
    <h1>Workflow Detail</h1>
    <pre *ngIf="workflow$ | async as workflow">{{ workflow | json }}</pre>
  `
})
export class WorkflowDetailPage {
  workflow$: Observable<Workflow | undefined>;

  constructor(
    private route: ActivatedRoute,
    private workflowService: WorkflowPersistenceService
  ) {
    this.workflow$= this.route.paramMap.pipe(
      switchMap(params => this.workflowService.workflow$(params.get('id')!)),
      tap(w =>console.log('we got params, ' + w))
    );
  }
}
