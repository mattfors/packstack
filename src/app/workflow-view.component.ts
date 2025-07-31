import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

import { Observable, of, switchMap, map } from 'rxjs';
import { Workflow, WorkflowService } from './workflows/workflow.service';

@Component({
  selector: 'app-workflow-view',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-container *ngIf="steps$ | async as steps; else loading">
      <h2>Steps:</h2>
      <ol *ngIf="steps.length > 0; else noSteps">
        <li *ngFor="let step of steps">
          {{ step.label }} ({{ step.id }})
        </li>
      </ol>
    </ng-container>

    <ng-template #loading><p>Loading workflow...</p></ng-template>
    <ng-template #noSteps><p>No steps found in this workflow.</p></ng-template>
  `
})
export class WorkflowViewComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private wfService = inject(WorkflowService);

  steps$: Observable<{ id: string; label: string }[]> = of([]);

  ngOnInit(): void {
    this.steps$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        if (!id) return of([]);
        return this.wfService.getWorkflow(id).pipe(
          map(wf => {
            if (!wf) return [];

            const result: { id: string; label: string }[] = [];

            const walk = (node: Workflow) => {
              if (node.type === 'workflow' && node.subtype === 'step') {
                result.push({ id: node.id, label: node.label ?? '(no label)' });
              }
              (node.children || []).forEach(walk);
            };

            walk(wf);
            return result;
          })
        );
      })
    );
  }
}
