import { Component, Input, OnInit } from '@angular/core';
import { Course } from '../../interfaces/Course';
import { PayPalService } from '../../services/paypal/pay-pal.service';
import { ICreateOrderRequest, NgxPayPalModule } from 'ngx-paypal';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [NgxPayPalModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit{
  @Input() courseInfo?: Course;

  popupShown = false;

  showPopup(): boolean {
    return (this.popupShown = true);
  }

  closePopup(): boolean {
    return (this.popupShown = false);
  }
  public payPalConfig: any;
  public showPaypalButtons: boolean = false;
constructor(private service:PayPalService){}
  ngOnInit(): void {
    this.loginAction();
    this.pago();
    console.info(this.payPalConfig)
  }

loginAction(){
    this.service.login().subscribe({
      next: (userData) =>{
        console.log(userData)
      },
      error:(userData) => {
          console.log(userData)
          alert("Error al iniciar sesion")
      },
      complete:()=> {
          console.info("login completo ")
      }
    });
}

pago(){
  this.payPalConfig = {
  currency: "EUR",
  clientId: environment.paypal.clientIdPayPal,
  createOrderOnClient: (data: Course) =>
    <ICreateOrderRequest>{
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "EUR",
            value: "0.05",
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
