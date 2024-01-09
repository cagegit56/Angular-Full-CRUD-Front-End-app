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



const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'welcome', component: WelcomeComponent},
  {path:'reguser', component: ReguserComponent},
  {path:'shopping', component: ShoppingComponent},
  {path:'cart', component: CartComponent},
  {path:'payment', component: PaymentComponent},
  {path:'list', component: ListComponent, canActivate: [authGuard] },
  { path: 'employee/add', component: AddeditComponent },
  { path: 'employee/edit/:id', component: AddeditComponent },
  {path:'transaction', component: TransactionComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
