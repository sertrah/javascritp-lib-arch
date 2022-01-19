import { TestBed } from '@angular/core/testing';

import { RecordsFacadeService } from './records-facade.service';

describe('RecordsFacadeService', () => {
  let service: RecordsFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecordsFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
