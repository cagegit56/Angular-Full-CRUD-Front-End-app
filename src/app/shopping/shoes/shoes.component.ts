import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-shoes',
  templateUrl: './shoes.component.html',
  styleUrls: ['./shoes.component.css']
})
export class ShoesComponent {

  qnt: any;
  cartItems = 0;

  constructor(private router: Router, private toastr: ToastrService,private auth: AuthService ){}

  ngOnInit(){
    this.cartItemFunc();
  }
  
productArray = [
  {
    prodId: 101,
    img: "../../assets/shoe.jpg",
    price: 680,
    qnt: 1
  },
  {
    prodId: 102,
    img: "../../assets/shoe1.jpg",
    price: 700,
    qnt: 1
  },
  {
    prodId: 103,
    img: "../../assets/shoe2.jpg",
    price: 952,
    qnt: 1
  },
  {
    prodId: 104,
    img: "../../assets/shoe5.jpg",
    price: 1800,
    qnt: 1
  }

];

inc(prd: any){
  if(prd.qnt != 5){   
   prd.qnt += 1;

  }
  
}

dec(prd: any){
  if(prd.qnt != 1){   
    prd.qnt -= 1;
 
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
    var id = category.prodId;
    let index: number = -1;
    this.itemsCart = JSON.parse(localStorage.getItem('localcart')!);
    for(let i=0; i<this.itemsCart.length; i++){

      if(parseInt(id) === parseInt(this.itemsCart[i].prodId)){
          this.itemsCart[i].qnt = category.qnt; 
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



}
