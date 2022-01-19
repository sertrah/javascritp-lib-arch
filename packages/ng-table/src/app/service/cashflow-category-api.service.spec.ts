import { TestBed } from '@angular/core/testing';

import { CashflowCategoryApiService } from './cashflow-category-api.service';

describe('CashflowCategoryApiService', () => {
  let service: CashflowCategoryApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CashflowCategoryApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
