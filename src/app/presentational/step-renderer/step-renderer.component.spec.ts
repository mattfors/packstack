import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepRendererComponent } from './step-renderer.component';

describe('StepRendererComponent', () => {
  let component: StepRendererComponent;
  let fixture: ComponentFixture<StepRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepRendererComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
