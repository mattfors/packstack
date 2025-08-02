import { inject, provideAppInitializer } from '@angular/core';
import { WorkflowPersistenceService } from '../../core/persistence/workflow-persistence.service';
import { defaultWorkflows } from './data/default-workflows'; // array of workflows
import { firstValueFrom } from 'rxjs';
import { Workflow } from '../../core/model/workflow.model';

/**
 * Provide an app initializer that seeds sample workflows using the domain-layer service.
 */
export function provideWorkflowInitializer() {
  return provideAppInitializer(async () => {
    const persistence = inject(WorkflowPersistenceService);
    await firstValueFrom(persistence.installOrUpdateMany(defaultWorkflows));
  });
}

