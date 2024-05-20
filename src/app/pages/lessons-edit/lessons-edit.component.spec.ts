import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonsEditComponent } from './lessons-edit.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { TestModule } from '../lessons/lessons.component.spec';
import { of } from 'rxjs';
import { LessonPostService } from '../../services/lessons/lesson-post.service';
import { Lesson } from '../../interfaces/Lesson';

describe('LessonsEditComponent', () => {
  let component: LessonsEditComponent;
  let fixture: ComponentFixture<LessonsEditComponent>;
  let service: LessonPostService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LessonsEditComponent,
        ReactiveFormsModule,TestModule],
        providers:[TestModule,
          Validators,
          FormBuilder,HttpClient,HttpHandler
        ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LessonsEditComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(LessonPostService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should post lessons', () => {
    const lesson: Lesson = {
      name: 'Test',
      contenido: 'testeando',
      description: 'descripcion test'
    };

    spyOn(service, 'putLessons').and.returnValue(of(lesson));

    component.lesson.setValue(lesson);
    component.editLesson();

    expect(service.putLessons).toHaveBeenCalledWith(5, lesson);
  });
});