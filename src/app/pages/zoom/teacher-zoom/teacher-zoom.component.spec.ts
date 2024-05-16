import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherZoomComponent } from './TeacherZoomComponent';

describe('TeacherZoomComponent', () => {
  let component: TeacherZoomComponent;
  let fixture: ComponentFixture<TeacherZoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherZoomComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeacherZoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
