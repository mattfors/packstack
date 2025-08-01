import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowRouteComponent } from './workflow-route.component';

describe('WorkflowRouteComponent', () => {
  let component: WorkflowRouteComponent;
  let fixture: ComponentFixture<WorkflowRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkflowRouteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkflowRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
