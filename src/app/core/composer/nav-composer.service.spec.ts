import { TestBed } from '@angular/core/testing';

import { NavComposerService } from './nav-composer.service';

describe('NavComposerService', () => {
  let service: NavComposerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavComposerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
