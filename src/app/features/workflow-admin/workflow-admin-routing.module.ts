import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkflowBrowserPage } from './pages/workflow-browser.page';
import { WorkflowDetailPage } from './pages/workflow-detail.page';

const routes: Routes = [
  { path: '', component: WorkflowBrowserPage },
  { path: ':id', component: WorkflowDetailPage }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkflowAdminRoutingModule {}
