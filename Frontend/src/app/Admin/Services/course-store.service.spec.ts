import { TestBed } from '@angular/core/testing';

import { CourseStoreService } from './course-store.service';

describe('CourseStoreService', () => {
  let service: CourseStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
