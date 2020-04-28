import { TestBed } from '@angular/core/testing';

import { MethodeService } from './methode.service';

describe('MethodeService', () => {
  let service: MethodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MethodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
