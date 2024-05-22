import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from '../../interfaces/Category';
import { CategoryService } from '../../services/categories/category.service';
import { Course } from '../../interfaces/Course';
import { CourseService } from '../../services/courses/course.service';
import { SearchService } from '../../services/search/search.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter-navbar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './filter-navbar.component.html',
  styleUrl: './filter-navbar.component.css'
})
export class FilterNavbarComponent {

  constructor(private categoryService:CategoryService, private courseService: CourseService, private searchService:SearchService){}

  courses?:Course[];
  categories!:Category[];
  @Input() word?:string;

  @Output()searchData = new EventEmitter<Course[]>();



  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getCategories()
  }

  sendData() {
    this.searchData.emit(this.courses);
    
  }

  getCategories(){
    this.categoryService.getAllCategories().subscribe(categories => {
      this.categories = categories;
      console.log(this.categories)
    })
  }

  getCourses() {
    this.courseService.getAllCourses().subscribe(courses => {
      this.courses = courses;
      console.log(courses);
      return courses;
    });
  }

  searchCourses():any{
    console.log(this.word)
    if(this.word!.length > 1 && this.word! != ''){
          this.searchService.searchCourse(this.word!).subscribe(courses => {
          this.courses = courses;
          console.log(courses)
          return courses;
          });
        }else {
          return this.getCourses()
          
        }

  }

  // onEnter(event: KeyboardEvent) {
  //   console.log(this.word)
  //   // Verifica si la tecla presionada es "Enter" (código 13)
  //   if (event.key === "Enter") {
  //     // Ejecuta la lógica que deseas cuando se presiona "Enter"
  //     this.searchCourses(this.word!)

  //     }
  //   }
  }

