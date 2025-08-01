import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowRendererComponent } from './workflow-renderer.component';

describe('WorkflowRendererComponent', () => {
  let component: WorkflowRendererComponent;
  let fixture: ComponentFixture<WorkflowRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkflowRendererComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkflowRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
