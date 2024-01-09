import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {

  success = false;
  amount = 0;

  @ViewChild('paymentRef', {static: true}) paymentRef! : ElementRef;
  // , private payment: PaymentService

  constructor(private router: Router, private toastr: ToastrService){}

  ngOnInit(){
    this.loadTotal();
    window.paypal.Buttons(
      {
        style: {
          layout: 'horizontal',
          color: 'white',
          shape: 'rect',
          label: 'pay'
        },
        createOrder: (data: any, actions: any) =>{
            return actions.order.create({
              purchase_units: [
                {
                  amount:{ 
                    value: this.amount.toString(),
                    currency_code: 'EUR'
                  }
                }
              ]
            });
        },
        onApprove: ( data: any, actions: any) =>{
          return actions.order.capture().then((details: any) =>{
            if(details.status === 'COMPLETED'){
              // this.payment.transactionID = details.id;
              console.log(details);
              this.removeAll();
              this.router.navigate(['transaction']);
            
            }
          });
          
        },
        onError: (error: any) =>{
          console.log(error);
        }

      }
    ).render(this.paymentRef.nativeElement);
    
  }

  cancel(){
    this.router.navigate(['/cart']);
  }

  getCartDetails: any = [];

cartDetails(){
  if(localStorage.getItem('localcart') != null){
       this.getCartDetails = JSON.parse(localStorage.getItem('localcart')!);
       console.log(this.getCartDetails);
  }
}

total : number = 0;
loadTotal(){
  if(localStorage.getItem('localcart')){
      this.getCartDetails = JSON.parse(localStorage.getItem('localcart')!)
     this.total = this.getCartDetails.reduce(function(accumulator: any, value: any){
          return accumulator + (value.price * value.qnt);
      }, 0);
      this.amount = this.total;
  }
}

removeAll(){
  localStorage.removeItem('localcart');
  this.getCartDetails = [];
  this.total = 0;
}


}
