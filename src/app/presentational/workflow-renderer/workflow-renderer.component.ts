import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepperViewNode, WorkflowViewNode } from '../../core/model/workflow-view-node.model';
import { WorkflowChildRendererComponent } from '../workflow-child-renderer/workflow-child-renderer.component';

@Component({
  selector: 'app-workflow-renderer',
  standalone: true,
  imports: [CommonModule, WorkflowChildRendererComponent,],
  templateUrl: './workflow-renderer.component.html',
})
export class WorkflowRendererComponent {
  @Input() node!: WorkflowViewNode | StepperViewNode;
  @Input() child?: WorkflowViewNode;

  isStepperViewNode(node: WorkflowViewNode | StepperViewNode): node is StepperViewNode {
    return node.subtype === 'stepper';
  }
}
