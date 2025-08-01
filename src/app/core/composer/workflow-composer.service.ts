import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { WorkflowPersistenceService } from '../../engine/workflow/workflow-persistence.service';
import { StepperViewNode, WorkflowViewNode } from '../model/workflow-view-node.model';
import { Workflow } from '../model/workflow.model';


@Injectable({ providedIn: 'root' })
export class WorkflowComposerService {
  private workflowId$ = new BehaviorSubject<string | null>(null);
  private childIndex$ = new BehaviorSubject<number>(0);

  private workFlowViewNode$ = combineLatest([this.workflowId$]).pipe(
    switchMap(([workflowId]) => {
      if (!workflowId) return of(undefined);
      return this.workflowPersistence.workflow$(workflowId);
    })
  );

  readonly parentView$ = this.workFlowViewNode$.pipe(
    map(wf => wf ? this.composeParent(wf) : undefined),
    catchError(err => {
      console.error('Failed to load workflow:', err);
      return of(undefined);
    })
  );

  readonly childView$ = combineLatest([this.workFlowViewNode$, this.childIndex$]).pipe(

    map(([parent, index]) => {
      if (parent?.children && parent?.children.length > index) {
        return parent.children[index];
      }
      return undefined;
    })
  );

  constructor(private workflowPersistence: WorkflowPersistenceService) {}

  load(workflowId: string, childIndex = 0): void {
    console.log('workflowId: ', workflowId);
    console.log('workflowId: ', childIndex);
    this.workflowId$.next(workflowId);
    this.childIndex$.next(childIndex);
  }

  private composeParent(workflow: Workflow): WorkflowViewNode {
    if (workflow.subtype === 'stepper') {
      const steps: WorkflowViewNode[] = (workflow.children ?? []).map(child => ({
        id: child.id,
        label: child.label,
        type: child.type,
        subtype: child.subtype,
        complete: false
      }));

      const stepperNode: StepperViewNode = {
        id: workflow.id,
        label: workflow.label,
        type: workflow.type,
        subtype: 'stepper',
        activeIndex: 0,
        complete: false,
        children: steps
      };

      return stepperNode;
    }

    return {
      id: workflow.id,
      label: workflow.label,
      type: workflow.type,
      subtype: workflow.subtype,
      complete: false
    };
  }
}
