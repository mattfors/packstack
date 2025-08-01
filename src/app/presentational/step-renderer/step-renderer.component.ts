import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkflowViewNode } from '../../core/model/workflow-view-node.model';

@Component({
  selector: 'app-step-renderer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step-renderer.component.html',
  styleUrl: './step-renderer.component.scss'
})
export class StepRendererComponent {
  @Input() node!: WorkflowViewNode;
  @Input() active?: boolean;
}
