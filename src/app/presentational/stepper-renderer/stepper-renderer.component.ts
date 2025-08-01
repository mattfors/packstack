import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepperViewNode } from '../../core/model/workflow-view-node.model';
import { StepRendererComponent } from '../step-renderer/step-renderer.component';

@Component({
  selector: 'app-stepper-renderer',
  standalone: true,
  imports: [CommonModule, StepRendererComponent],
  templateUrl: './stepper-renderer.component.html'
})
export class StepperRendererComponent {
  @Input() node!: StepperViewNode;

}
