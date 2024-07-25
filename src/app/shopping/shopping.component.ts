import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../_services/auth.service';


@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent {
currentData: any;
cartItems = 0;

constructor(private toastr: ToastrService, private router: Router, private auth: AuthService){}

ngOnInit(){
  this.cartItemFunc();
  this.auth.currentData$.subscribe(data => this.cartItems = data);
}


cartItemFunc(){
  if(localStorage.getItem('localcart') != null){
    var cartCount = JSON.parse(localStorage.getItem('localcart')!)
    this.cartItems = cartCount.length;
  }
}


logOut(){
  localStorage.removeItem('authToken');
  this.router.navigate(['./welcome']);
}

myRoute(){
  this.router.navigate(['./mytest']);
}



}
