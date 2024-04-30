import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonsComponent } from './lessons.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LessonPostService } from '../../services/lessons/lesson-post.service';
import { NgModule } from '@angular/core';
import { HttpClient, HttpHandler } from '@angular/common/http';
@NgModule({
  providers: [LessonPostService]
})
export class TestModule {}

describe('LessonsComponent', () => {
  let component: LessonsComponent;
  let fixture: ComponentFixture<LessonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LessonsComponent,
        ReactiveFormsModule,TestModule],
        providers:[TestModule,
          Validators,
          FormBuilder,HttpClient,HttpHandler
        ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LessonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
