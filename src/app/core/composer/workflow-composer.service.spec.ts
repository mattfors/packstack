import { TestBed } from '@angular/core/testing';

import { WorkflowComposerService } from './workflow-composer.service';

describe('WorkflowComposerService', () => {
  let service: WorkflowComposerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkflowComposerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
