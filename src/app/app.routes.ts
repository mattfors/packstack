import { Routes } from '@angular/router';
import { WorkflowRouteComponent } from './presentational/workflow-route/workflow-route.component';

export const routes: Routes = [
  {
    path: 'workflow/:id/:index',
    component: WorkflowRouteComponent
  },
  {
    path: 'workflow-admin',
    loadChildren: () =>
      import('./features/workflow-admin/workflow-admin.module').then(
        m => m.WorkflowAdminModule
      )
  }
];
