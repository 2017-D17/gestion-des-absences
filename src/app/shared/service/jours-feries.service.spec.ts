import { TestBed, inject } from '@angular/core/testing';

import { JoursFeriesService } from './jours-feries.service';

describe('JoursFeriesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JoursFeriesService]
    });
  });

  it('should be created', inject([JoursFeriesService], (service: JoursFeriesService) => {
    expect(service).toBeTruthy();
  }));
});
