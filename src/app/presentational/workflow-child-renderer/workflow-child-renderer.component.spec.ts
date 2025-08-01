import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowChildRendererComponent } from './workflow-child-renderer.component';

describe('WorkflowChildRendererComponent', () => {
  let component: WorkflowChildRendererComponent;
  let fixture: ComponentFixture<WorkflowChildRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkflowChildRendererComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkflowChildRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
