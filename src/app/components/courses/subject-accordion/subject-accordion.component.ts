import { Component, Input } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LessonPostService } from '../../../services/lessons/lesson-post.service';
import { Lesson } from '../../../interfaces/Lesson';
import { SubjectsService } from '../../../services/subjects/subjects.service';
import { CourseService } from '../../../services/courses/course.service';
import { Subject } from '../../../interfaces/Subject';

@Component({
  selector: 'app-subject-accordion',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './subject-accordion.component.html'
})
export class LessonsAccordionComponent {

  @Input() courseId?: number;
  subjectId?: number;
  subjects?: Subject[];

  constructor(
    private formBuilder:FormBuilder,
    private courseService: CourseService,
    private subjectService: SubjectsService,
  ) { }

  subjectForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
  });

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if (this.courseId) {
      this.getSubjects(this.courseId);
    }
  }

  //Service 
  postSubject() {
    console.info(this.courseId)
    if (this.courseId) {
      this.courseService
        .postSubject(this.subjectForm.value as Subject, this.courseId)
        .subscribe({
          next: (cita) => {
            console.info(cita);
          },
          error: (userData) => {
            console.log(userData);
          },
          complete: () => {
            console.info('Completo');
            if (this.courseId) {
              this.getSubjects(this.courseId);
            }
          },
        });
    }
  }

  subjectIdEdit(id: number) {
    this.subjectId = id
  }

  getSubjects(courseId: number) {
    this.subjectService.getSubjectsByCourseId(courseId).subscribe({
      next: (cita) => {
        this.subjects = cita;

      },
      error: (userData) => {
        console.log(userData)

      },
      complete: () => {
        console.info("Completo")
      }
    })


  }

}
