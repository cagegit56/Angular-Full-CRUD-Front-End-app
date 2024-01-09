import { Component } from '@angular/core';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
 
  checkCart = false;

  constructor(){}
  
  ngOnInit(){
   this.cartDetails();
   this.loadTotal();
   this.cartItemFunc();
   if(localStorage.getItem('localcart') == null ){
    this.checkCart = false;
}else{
  this.checkCart = true;
}


  }

getCartDetails: any = [];

cartDetails(){
  if(localStorage.getItem('localcart') != null){
       this.getCartDetails = JSON.parse(localStorage.getItem('localcart')!);
       console.log(this.getCartDetails);
  }

}

incQuantity(prodId: any, qnt: any){
     for(let i=0; i<this.getCartDetails.length; i++){
      if(this.getCartDetails[i].prodId === prodId){
           if(qnt != 5)
           this.getCartDetails[i].qnt = parseInt(qnt) + 1;
      }   

     }

     localStorage.setItem('localcart', JSON.stringify(this.getCartDetails));
     this.loadTotal();
}

decQuantity(prodId: any, qnt: any){
  for(let i=0; i<this.getCartDetails.length; i++){
   if(this.getCartDetails[i].prodId === prodId){
        if(qnt != 1)
        this.getCartDetails[i].qnt = parseInt(qnt) - 1;
   }   

  }

  localStorage.setItem('localcart', JSON.stringify(this.getCartDetails));
  this.loadTotal();
}

total : number = 0;
loadTotal(){
  if(localStorage.getItem('localcart')){
      this.getCartDetails = JSON.parse(localStorage.getItem('localcart')!)
     this.total = this.getCartDetails.reduce(function(accumulator: any, value: any){
          return accumulator + (value.price * value.qnt);
      }, 0);
  }
}

delete(getDetails: any){
  console.log(getDetails);
  if(localStorage.getItem('localcart')){
     this.getCartDetails = JSON.parse(localStorage.getItem('localcart')!);

     for( let i = 0; i<this.getCartDetails.length; i++){
         if(this.getCartDetails[i].prodId === getDetails){
             this.getCartDetails.splice(i,1)
             localStorage.setItem('localcart', JSON.stringify(this.getCartDetails));
             this.loadTotal();
         }
     }
  }
  this.cartItemFunc();
}

cartItems = 0;
cartItemFunc(){
  if(localStorage.getItem('localcart') != null){
    var cartCount = JSON.parse(localStorage.getItem('localcart')!)
    this.cartItems = cartCount.length;
    
  }
}

removeAll(){
  localStorage.removeItem('localcart');
  this.getCartDetails = [];
  this.total = 0;
  if(localStorage.getItem('localcart') == null){
      this.cartItems = 0;  
  }

  
}






}
