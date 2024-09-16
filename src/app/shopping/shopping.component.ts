import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../_services/auth.service';
import { first } from 'rxjs';


@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent {
currentData: any;
cartItems = 0;
productInfo: any[] = [];
filteredData: any[] = [];
searchTerm: string = '';
searchBar: boolean = false;
itemData = ['kg','kg','kat', 'fat', 'bat', 'fg'];
notFound: boolean = false;


constructor(private toastr: ToastrService, private router: Router, private auth: AuthService){}

ngOnInit(){
  this.cartItemFunc();
  this.auth.currentData$.subscribe(data => this.cartItems = data);
  // this.auth.getAll().pipe(first()).subscribe((data) => {
  //   this.productInfo = data;
  // });
}

onSearch(): void {
  if (this.searchTerm) {
    this.filteredData = this.itemData.filter(item =>
      item.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.searchBar = true;
  } else {
    this.notFound = true;
  }
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
