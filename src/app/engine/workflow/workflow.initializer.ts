import { inject, provideAppInitializer } from '@angular/core';
import { WorkflowPersistenceService } from '../../core/persistence/workflow-persistence.service';
import { defaultWorkflows } from './data/default-workflows'; // array of workflows
import { firstValueFrom } from 'rxjs';
import { Workflow } from '../../core/model/workflow.model';

/**
 * Provide an app initializer that seeds sample workflows using the domain-layer service.
 */
export function provideWorkflowInitializer() {
  return provideAppInitializer(() => {
    const persistence = inject(WorkflowPersistenceService);

    return (async () => {
      for (const wf of defaultWorkflows) {
        const id = `workflow:${wf.id}`;
        try {
          const existing = await firstValueFrom(persistence.workflow$(id));

          const doc: Workflow = {
            ...wf,
            _id: id,
            _rev: existing?._rev, // include rev to update if exists
          };

          await firstValueFrom(persistence.saveWorkflow(doc));
          console.log(`${existing ? 'Updated' : 'Created'}: ${id}`);
        } catch (err) {
          console.error(`Error writing ${id}:`, err);
        }
      }
    })();
  });
}

