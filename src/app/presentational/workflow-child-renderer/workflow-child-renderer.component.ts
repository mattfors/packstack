import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepperRendererComponent } from '../stepper-renderer/stepper-renderer.component';
import { StepperViewNode, WorkflowViewNode } from '../../core/model/workflow-view-node.model';

@Component({
  selector: 'app-workflow-child-renderer',
  standalone: true,
  imports: [CommonModule, StepperRendererComponent],
  templateUrl: './workflow-child-renderer.component.html',
  styleUrl: './workflow-child-renderer.component.scss'
})
export class WorkflowChildRendererComponent {
  @Input() node!: WorkflowViewNode | StepperViewNode;

  isStepperViewNode(node: WorkflowViewNode | StepperViewNode): node is StepperViewNode {
    return node.subtype === 'stepper';
  }
}
