import { TestBed } from '@angular/core/testing';

import { SettingsFecadeService } from './settings-fecade.service';

describe('SettingsFecadeService', () => {
  let service: SettingsFecadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SettingsFecadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
