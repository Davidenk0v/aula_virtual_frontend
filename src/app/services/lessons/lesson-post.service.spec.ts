import { TestBed } from '@angular/core/testing';

import { LessonPostService } from './lesson-post.service';

describe('LessonPostService', () => {
  let service: LessonPostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LessonPostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
