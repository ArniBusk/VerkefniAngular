import { TestBed, async, inject } from '@angular/core/testing';

import { AccessGuardGuard } from './access-guard.guard';

describe('AccessGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccessGuardGuard]
    });
  });

  it('should ...', inject([AccessGuardGuard], (guard: AccessGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
