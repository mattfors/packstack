import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { NavItem } from '../model/nav-view.model';
import { WorkflowPersistenceService } from '../persistence/workflow-persistence.service';
import { Workflow } from '../model/workflow.model';

@Injectable({ providedIn: 'root' })
export class NavComposerService {
  readonly navViewModel$: Observable<NavItem[]>;

  constructor(private workflowPersistence: WorkflowPersistenceService) {
    this.navViewModel$ = this.workflowPersistence.allWorkflows$().pipe(
      map(workflows => workflows.map(wf => this.toNavItem(wf)))
    );
  }

  private toNavItem(workflow: Workflow): NavItem {
    console.log('workflow:', workflow);
    return {
      label: workflow.label || workflow.id,
      route: `/workflow/${workflow.id}/0`,
      children: (workflow.children ?? []).map((child, index) => ({
        label: child.label ?? `Step ${index + 1}`,
        route: `/workflow/${workflow.id}/${index}`
      }))
    };
  }
}
