import { TestBed } from '@angular/core/testing';

import { MockServerService } from './mock-server.service';

describe('MockServerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MockServerService = TestBed.get(MockServerService);
    expect(service).toBeTruthy();
  });
});
