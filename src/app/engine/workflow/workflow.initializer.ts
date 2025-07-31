import { inject, provideAppInitializer } from '@angular/core';
import { WorkflowPersistenceService } from './workflow-persistence.service';
import { defaultWorkflows } from './data/default-workflows'; // array of workflows
import { firstValueFrom } from 'rxjs';

/**
 * Provide an app initializer that seeds sample workflows using the domain-layer service.
 */
export function provideWorkflowInitializer() {
  return provideAppInitializer(() => {
    const persistence = inject(WorkflowPersistenceService);

    return (async () => {
      for (const wf of defaultWorkflows) {
        const existing = await firstValueFrom(persistence.workflow$(`workflow:${wf.id}`));

        if (!existing) {
          try {
            await firstValueFrom(persistence.saveWorkflow({ ...wf, _id: `workflow:${wf.id}` }));
            console.log(`Seeded: workflow:${wf.id}`);
          } catch (err) {
            console.error(`Error saving workflow:${wf.id}`, err);
          }
        } else {
          console.log(`Already exists: workflow:${wf.id}`);
        }
      }
    })();
  });
}

