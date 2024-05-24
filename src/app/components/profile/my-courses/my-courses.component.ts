import { Component } from '@angular/core';
import { CourseService } from '../../../services/courses/course.service';
import { Course } from '../../../interfaces/Course';
import { JwtService } from '../../../services/jwt/jwt.service';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '../../../services/categories/category.service';
import { CourseRequest } from '../../../interfaces/requests/CourseRequest';
import { Category } from '../../../interfaces/Category';
import { ErrorMessageComponent } from '../../error-message/error-message.component';
import { ICreateOrderRequest } from 'ngx-paypal';

@Component({
  selector: 'app-my-courses',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, ErrorMessageComponent],
  templateUrl: './my-courses.component.html',
  styleUrl: './my-courses.component.css'
})
export class MyCoursesComponent {

  courseList?:Course[]
  haveCourses:boolean = false;
  idUser?:string;
  categories?:Category[];
  courseId?: number;
  courseInfo?: Course;
  errorMessage?: string;
  imageUrl: any;

  public payPalConfig: any;
  public showPaypalButtons: boolean = false;
  constructor(private courseService:CourseService,
    private jwtService:JwtService, 
    private formBuilder:FormBuilder,
    private router: Router,
    private categoryService:CategoryService) { }
  

  ngOnInit(): void {
    this.idUser = this.jwtService.getIdFromToken();
    this.idUser = this.jwtService.getIdFromToken();
    this.getCategories();
    this.getCoursesTeacher(this.idUser!)
    
  }

  // Este objeto es el que luego se mandrá a la base de datos
  newCourseForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    startDate: [new Date(), [Validators.required]],
    finishDate: [new Date(), [Validators.required]],
    price: [0, [Validators.required]],
    category: ['', [Validators.required]]
  });

  addCourse(){
    console.log(this.newCourseForm.value)
    if (this.newCourseForm.valid) {
      this.courseService
        .addCourse(this.newCourseForm.value as CourseRequest, this.idUser!)
        .subscribe({
          next: (userData) => {
            console.info(userData.idCourse)
            this.courseId = userData.idCourse;

          },
          error: (errorData) => {
            this.errorMessage = errorData;
            console.info(this.newCourseForm.value as CourseRequest)
  
          },
          complete: () => {
            this.getCoursesTeacher(this.idUser!)
            this.newCourseForm.reset();
          },
        });
    } else {
      this.newCourseForm.markAllAsTouched();
      this.errorMessage = 'Porfavor rellene todos los campos';
      console.info(this.newCourseForm.value as CourseRequest)
    }
  }

  getCategories(){
    this.categoryService.getAllCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (errorData) => {
        this.errorMessage = errorData;
      }
    });
  } 



  getCoursesTeacher(idUser:string):void{
    this.courseService.getAllCoursesByUser(idUser).subscribe({
      next: (cita) => {
        this.courseList = cita
        this.courseList.forEach((courseItem:any) => {
          console.log("Curso", courseItem);
          this.downloadImage(courseItem.idCourse, courseItem);
        })
        console.log(cita)
      },
      error:(userData) => {
        this.haveCourses = false
        console.error(userData)
          
      },
      complete:()=> {
        console.info("Completo")
      }
    })
  }

  /**
   * Descarga el archivo desde la API.
   * @param user La id del usuario.
   */
  downloadImage(user: number, course: any) {
    this.courseService.getProfileImage(user).subscribe({
      next: (data: any) => {
        console.info("Imagen perfil", data);
        course.urlImg = URL.createObjectURL(data);
      }, error: (data: any) => {
        console.info(data, "Error")
      },
      complete: () => {
        console.info("Completa descarga imagen perfil")
        localStorage.removeItem("fileType");
      }
    });
  }


  pago(){
    this.payPalConfig = {
    currency: "EUR",
    clientId: "AWUSbpkq-C6SdH5kSU9a5LrqFuk4Gw4V0x_1N6cX11d5gZCmEEE3qFx5h8TkvzB4d0jMK7-kHvpjoiuN",
    createOrderOnClient: (data: Course) =>
      <ICreateOrderRequest>{
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "EUR",
              value: this.courseInfo?.price.toString(),
            },
          }
        ],
        application_context: {
          brand_name: "nombre",
          landing_page: "BILLING",
          user_action: "PAY_NOW",
          return_url: "https://api-m.sandbox.paypal.com/capture-order",
          cancel_url: "https://api-m.sandbox.paypal.com/cancel-order"
        }
      },
    advanced: {
      commit: "true"
    },
    style: {
      label: "paypal",
      layout: "vertical"
    },
    onApprove: (data: {}, actions: { order: { get: () => Promise<any>; }; }) => {
      console.log(
        "onApprove - transaction was approved, but not authorized",
        data,
        actions
      );
      actions.order.get().then(details => {
        console.log(
          "onApprove - you can get full order details inside onApprove: ",
          details
        );
      });
    },
    onClientAuthorization: (data: ICreateOrderRequest) => {
      console.log(
        "onClientAuthorization - you should probably inform your server about completed transaction at this point",
        data
      );
    },
    onCancel: (data: any, actions: any) => {
      console.log("OnCancel", data, actions);
    },
    onError: (err: Error) => {
      console.log("OnError", err);
    },
    onClick: (data: any, actions: any) => {
      console.log("onClick", data, actions);
    }
  };
  }
  

}