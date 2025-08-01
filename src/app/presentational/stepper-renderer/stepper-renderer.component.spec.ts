import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepperRendererComponent } from './stepper-renderer.component';

describe('StepperRendererComponent', () => {
  let component: StepperRendererComponent;
  let fixture: ComponentFixture<StepperRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepperRendererComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepperRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
