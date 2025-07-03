import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../_services/auth.service';
import { first } from 'rxjs';
import { Prodmodel } from '../_models/prodmodel';


@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent {
currentData: any;
cartItems = 0;
productInfo!: Prodmodel[];
filteredData: any[] = [];
searchTerm: string = '';
searchBar: boolean = false;
itemData = ['kg','kg','kat', 'fat', 'bat', 'fg'];
notFound: boolean = false;


constructor(private toastr: ToastrService, private router: Router, private auth: AuthService){}

ngOnInit(){
  this.cartItemFunc();
  this.auth.currentData$.subscribe(data => this.cartItems = data);
  this.auth.getAll().pipe(first()).subscribe((data) => {
    this.productInfo = data;
    console.log(this.productInfo);
  });
}

onSearch(): void {
  if (this.searchTerm) {
    this.filteredData = this.productInfo.filter(item =>
      // item.category.toLowerCase().includes(this.searchTerm.toLowerCase() )
     item.category.toLowerCase().includes(this.searchTerm.toLowerCase() ) || item.prodName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.searchBar = true;
  } else {
    this.notFound = true;
  }
}

itemsCart: any = [];
addCart(category: any){
  console.log(category);

  let checkNulls = localStorage.getItem('localcart');
  if (checkNulls == null){
    let storeDataGet: any = [];
    storeDataGet.push(category);
    localStorage.setItem('localcart', JSON.stringify(storeDataGet));
    this.toastr.success('Successfully Added To Cart');
  }
  else{
    var id = category.id;
    let index: number = -1;
    this.itemsCart = JSON.parse(localStorage.getItem('localcart')!);
    for(let i=0; i<this.itemsCart.length; i++){

      if(parseInt(id) === parseInt(this.itemsCart[i].id)){
          this.itemsCart[i].quantity = category.quantity; 
          index = i;
          break;
      }

    }

    if(index == -1){
      this.itemsCart.push(category);
      localStorage.setItem('localcart', JSON.stringify(this.itemsCart));
      this.toastr.success('Successfully Added To Cart');
    }
    else{
      localStorage.setItem('localcart', JSON.stringify(this.itemsCart));
      this.toastr.success('Already Added To Cart');
    }

  }
  this.cartItemFunc();
  this.auth.updateData(this.cartItems);
  // localStorage.setItem('localcart', JSON.stringify(category));
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

inc(resultData : any){
  if(resultData.quantity != 5){   
    resultData.quantity += 1;
  }else{
    alert("Cannot Order More Than 5");
  }
  
}

dec(resultData : any){
  if(resultData.quantity != 1){   
    resultData.quantity -= 1;
 
   }
}



}
