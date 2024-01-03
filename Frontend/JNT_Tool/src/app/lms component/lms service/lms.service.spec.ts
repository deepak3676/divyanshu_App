import { TestBed } from '@angular/core/testing';

import { LmsService } from './lms.service';

describe('LmsService', () => {
  let service: LmsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LmsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
