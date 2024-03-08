import { DOCUMENT } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmpService } from '../_services/emp.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {

  success = false;
  amount = 0;
  payForm!: FormGroup;
  merchant_key = "46f0cd694581a" ;
  merchant_id = 10000100;
  amountZar = 300;
  item_name = "shirt";

  constructor(@Inject(DOCUMENT) private document: Document,
   private formBuilder: FormBuilder,
   private router: Router,
   private empService: EmpService,
   private toastr: ToastrService,
   private http: HttpClient){}

  ngOnInit(){
    this.loadTotal();   

    this.payForm = this.formBuilder.group({
  
      merchant_id: [''],
      merchant_key: [''],
      amount: [''],
      item_name: [''],
      

    });

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

onSubmit(){
alert('danger gevaar');
console.log(this.payForm.value);
this.http.post<any>("https://sandbox.payfast.co.za​/eng/process", this.payForm.value)
.subscribe(res=>{
  alert("Signup successfull");
  window.location.href = 'https://sandbox.payfast.co.za​/eng/process';
  
},err=>{
  alert("something went seriously wrong");
})

}




}



