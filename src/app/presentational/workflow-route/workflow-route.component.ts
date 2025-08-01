import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { WorkflowPersistenceService } from '../../core/persistence/workflow-persistence.service';
import { CommonModule } from '@angular/common';
import { WorkflowComposerService } from '../../core/composer/workflow-composer.service';
import { WorkflowRendererComponent } from '../workflow-renderer/workflow-renderer.component';


@Component({
  selector: 'app-workflow-route',
  standalone: true,
  imports: [CommonModule, WorkflowRendererComponent],
  templateUrl: './workflow-route.component.html',
  styleUrl: './workflow-route.component.scss',
  providers: [WorkflowComposerService] // Scoped per instance
})
export class WorkflowRouteComponent {
  readonly parentView$;
  readonly childView$;

  constructor(
    private route: ActivatedRoute,
    private composer: WorkflowComposerService
  ) {
    console.log('reloading workflow route');
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      const index = Number(params.get('index') ?? '0');
      if (id) this.composer.load(id, index);
    });
    this.parentView$ = this.composer.parentView$;
    this.childView$ = this.composer.childView$;
  }
}
