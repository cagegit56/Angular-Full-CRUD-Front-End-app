import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './employee/list.component';
import { AddeditComponent } from './employee/addedit.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ReguserComponent } from './reguser/reguser.component';
import { authGuard } from './Auth/auth.guard';
import { CartComponent } from './cart/cart.component';
import { ShoppingComponent } from './shopping/shopping.component';
import { PaymentComponent } from './payment/payment.component';
import { TransactionComponent } from './transaction/transaction.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { TshirtsComponent } from './shopping/tshirts/tshirts.component';
import { ShoesComponent } from './shopping/shoes/shoes.component';
import { PantsComponent } from './shopping/pants/pants.component';
import { JewelleryComponent } from './shopping/jewellery/jewellery.component';
import { ProductsComponent } from './products/products.component';
import { MytestComponent } from './mytest/mytest.component';



const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'welcome', component: WelcomeComponent},
  {path:'pants', component: ShoppingComponent, children: [{path:'', component: PantsComponent}]},
  {path:'shoes', component: ShoppingComponent, children: [{path:'', component: ShoesComponent}]},
  {path:'tshirts', component: ShoppingComponent, children: [{path:'', component: TshirtsComponent}]},
  {path:'jewellery', component: ShoppingComponent, children: [{path:'', component: JewelleryComponent}]},
  {path:'reguser', component: ReguserComponent},
  {path:'shopping', component: ShoppingComponent, children: [{path:'', component: TshirtsComponent}]},
  {path:'cart', component: CartComponent},
  {path:'payment', component: PaymentComponent},
  {path:'list', component: ListComponent, canActivate: [authGuard] },
  { path: 'products', component: ProductsComponent },
  { path: 'employee/add', component: AddeditComponent },
  { path: 'employee/edit/:id', component: AddeditComponent },
  {path:'transaction', component: TransactionComponent},
  {path:'forgotpassword', component: ForgotpasswordComponent},
  {path:'resetpassword', component: ResetpasswordComponent},
  {path:'mytest', component: MytestComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
