import { TestBed, inject } from '@angular/core/testing';

import { DateFormatterServiceService } from './date-formatter-service.service';

describe('DateFormatterServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DateFormatterServiceService]
    });
  });

  it('should be created', inject([DateFormatterServiceService], (service: DateFormatterServiceService) => {
    expect(service).toBeTruthy();
  }));
});
