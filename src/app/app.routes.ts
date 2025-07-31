import { Routes } from '@angular/router';
import { PouchDemoComponent } from './pouch-demo.component';
import { WorkflowViewerComponent } from './workflow-viewer.component';
import { PouchExplorerComponent } from './pouch-explorer.component';
import { WorkflowViewComponent } from './workflow-view.component';

export const routes: Routes = [
  { path: 'pouch-demo', component: PouchDemoComponent },
  { path: 'workflows', component: WorkflowViewerComponent },
  { path: 'pouch', component: PouchExplorerComponent },
  { path: 'pouch/:type', component: PouchExplorerComponent },
  { path: 'pouch/:type/:id', component: PouchExplorerComponent },
  { path: 'workflow/:id', component: WorkflowViewComponent },
  {
    path: 'workflow-admin',
    loadChildren: () =>
      import('./features/workflow-admin/workflow-admin.module').then(
        m => m.WorkflowAdminModule
      )
  }
];
