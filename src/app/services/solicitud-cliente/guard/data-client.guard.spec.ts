import { TestBed } from '@angular/core/testing';

import { DataClientGuard } from './data-client.guard';

describe('DataClientGuard', () => {
  let guard: DataClientGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DataClientGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
