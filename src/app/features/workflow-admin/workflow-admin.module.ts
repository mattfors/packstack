import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { WorkflowAdminRoutingModule } from './workflow-admin-routing.module';
import { WorkflowBrowserPage } from './pages/workflow-browser.page';
import { WorkflowDetailPage } from './pages/workflow-detail.page';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    WorkflowAdminRoutingModule,
    WorkflowBrowserPage,
    WorkflowDetailPage
  ]
})
export class WorkflowAdminModule {}
