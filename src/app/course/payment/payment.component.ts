import { Component, Input, OnInit } from '@angular/core';
import { Course } from '../../interfaces/Course';
import { CourseService } from '../../services/courses/course.service';
import { PayPalService } from '../../services/paypal/pay-pal.service';
import { ICreateOrderRequest, NgxPayPalModule } from 'ngx-paypal';
import { AuthService } from '../../services/auth/auth.service';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [NgxPayPalModule, RouterModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent{
  @Input() courseInfo?: Course;

  constructor(private service:PayPalService, private authService:AuthService, private router:Router, private activateRoute: ActivatedRoute, private courseService:CourseService){}
  courseId?:number;
  imageUrl: any;


  /**
   * Descarga el archivo desde la API.
   * @param user La id del usuario.
   */
  downloadImage(user: number) {
    this.courseService.getProfileImage(user).subscribe({
      next: (data: any) => {
        console.info("data", data);
        this.imageUrl = URL.createObjectURL(data);
      }, error: (data: any) => {
        console.info(data, "Error")
      },
      complete: () => {
        console.info("Completo")
        localStorage.removeItem("fileType");
      }
    });
  }


  popupShown = false;
  isLogin: boolean = false;

  showPopup(): boolean {
    if(!this.isLogin){
      this.router.navigateByUrl('/login');
      return (this.popupShown = false);
    }
    return (this.popupShown = true);
  }

  closePopup(): boolean {
    return (this.popupShown = false);
  }
  public payPalConfig: any;
  public showPaypalButtons: boolean = false;

  ngOnInit(): void {
    this.courseId = Number(this.activateRoute.snapshot.paramMap.get('id'));
    this.downloadImage(this.courseId);
    this.loginAction();
    this.pago();
    this.isLogged();
  }


loginAction(){
    this.service.login().subscribe({
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

isLogged(){
  this.authService.loggedIn$.subscribe({
    next: (userData) =>{
      console.log(userData)
      this.isLogin = userData;
      if(userData == false){
        this.isLogin = sessionStorage.getItem('loggin') == 'true' ? true : false;
      }
    },
    error:(err) => {
        console.error(err)
    },
    complete:()=> {
        console.info("login completo ")
    }
  });
}
}
