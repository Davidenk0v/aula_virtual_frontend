import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Course } from '../../interfaces/Course';
import { AuthService } from '../../services/auth/auth.service';
import { CourseService } from '../../services/courses/course.service';
import { PayPalService } from '../../services/paypal/pay-pal.service';
import { ICreateOrderRequest } from 'ngx-paypal';
import { routes } from '../../app.routes';
import { ErrorMessageComponent } from '../../components/error-message/error-message.component';
import Swal from 'sweetalert2';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CourseRequest } from '../../interfaces/requests/CourseRequest';
import { CategoryService } from '../../services/categories/category.service';
import { Category } from '../../interfaces/Category';
import { SuccessMessageComponent } from '../../components/success-message/success-message.component';
import { CreateLessonComponent } from '../create-lesson/create-lesson.component';
import { LessonsAccordionComponent } from '../../components/courses/subject-accordion/subject-accordion.component';
import { CommentComponent } from '../../course/comments/comment.component';
import { jwtDecode } from 'jwt-decode';
import { JwtService } from '../../services/jwt/jwt.service';

@Component({
  selector: 'app-course-view',
  standalone: true,
  imports: [RouterModule, ErrorMessageComponent, ReactiveFormsModule, SuccessMessageComponent, CreateLessonComponent, LessonsAccordionComponent, CommentComponent],
  templateUrl: './course-view.component.html',
  styleUrl: './course-view.component.css'
})
export class CourseViewComponent {

  courseId?:number;
  courseInfo?: Course;
  errorMessage?: string;
  successMessage?: string;
  loggeIn:boolean = false;
  categories?:Category[];
  role?:string;
  public payPalConfig: any;

  constructor(
    private activateRoute: ActivatedRoute,
    private jwtService:JwtService, 
    private authService:AuthService, 
    private courseService:CourseService,
    private paypalService:PayPalService,
    private route:Router,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService
  ){}

  ngOnInit(): void {
    this.courseId = Number(this.activateRoute.snapshot.paramMap.get('id'));
    this.role = this.jwtService.getRoleFromToken();
    this.loginAction();
    this.getCategories();
    this.pago();
    this.isLogged();
    this.getCourseInfo(this.courseId)
  }



  editCourseForm = this.formBuilder.group({
    name: [this.courseInfo?.name, [Validators.required]],
    description: [this.courseInfo?.description, [Validators.required]],
    startDate: [new Date(), [Validators.required]],
    finishDate: [new Date(), [Validators.required]],
    category: [this.courseInfo?.category, [Validators.required]],
    price: [this.courseInfo?.price, [Validators.required]],
    urlImg: ['']
  });

  isTeacher():boolean{
    if(!this.role) return false;
    return this.role!.includes('teacher_class_room')
  }


  editCourse() {
    if (this.editCourseForm.valid && this.courseId) {
      this.courseService
        .editCourse(this.editCourseForm.value as CourseRequest, this.courseId)
        .subscribe({
          next: (userData) => {
            console.info(userData)
          },
          error: (errorData) => {
            this.errorMessage = errorData;
            console.info(this.editCourseForm.value as CourseRequest)

          },
          complete: () => {
            this.editCourseForm.reset();
            this.getCourseInfo(this.courseId!);
            this.successMessage = "Curso editado correctamente"
          },
        });
    }else{
      console.info("No se ha podido editar el curso")
      this.errorMessage = "Debe rellenar los campos correctamente"
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

  isLogged() {
    this.authService.loggedIn$.subscribe({
      next: (logged) => {
        this.loggeIn = logged;
        if (!this.loggeIn) {
          this.loggeIn = sessionStorage.getItem('loggin') == 'true' ? true : false;
        }
      },
      error: (error) => {
        console.error('Error fetching comments:', error);
        this.errorMessage = error;
      },
      complete: () => {
        console.info('Request completed');
      },
    });
  }


  getCourseInfo(courseId: number) {
    this.courseService.getCourseById(courseId).subscribe({
      next: (course) => {
        this.courseInfo = course;
      },
      error: (error) => {
        console.error('Error fetching course info:', error);
      },
      complete: () => {
        console.info('Request completed');
      },
    });
  }

  confirmBox(){
    Swal.fire({
      title: '¿Estás seguro de que quieres eliminar este curso?',
      text: 'El curso se eliminará permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      confirmButtonColor: '#d33',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Eliminado',
          'El curso se ha eliminado correctamente.',
          'success'
        )
        this.deleteCourse()
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'Has cancelado la eliminación del curso.',
          'error'
        )
      }
    })
  }


  alertWithSuccess(){
    Swal.fire('Thank you...', 'You submitted succesfully!', 'success')
  }

  deleteCourse(){
    console.info(this.courseId)
    
    if (this.courseId) {
      this.courseService.deleteCourseById(this.courseId).subscribe({
      next: (data) => {
        console.info(data);
      },error:(error) => {
        this.errorMessage = error;
      },
      complete:()=> {
        console.info("Completo")  
        this.route.navigateByUrl('/profile')  
      }
    });
    }
  }


loginAction(){
    this.paypalService.login().subscribe({
      next: (userData) =>{
        console.log(userData)
      },
      error:(userData) => {
          console.error(userData)
      },
      complete:()=> {
          console.info("login completo ")
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
