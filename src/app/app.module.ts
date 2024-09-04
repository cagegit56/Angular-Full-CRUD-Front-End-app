import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './employee/list.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddeditComponent } from './employee/addedit.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AuthInterceptor } from './_services/auth.interceptor';
import { ReguserComponent } from './reguser/reguser.component';
import { ToastrModule } from 'ngx-toastr';
import { ShoppingComponent } from './shopping/shopping.component';
import { CartComponent } from './cart/cart.component';
import { PaymentComponent } from './payment/payment.component';
import { TransactionComponent } from './transaction/transaction.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { TshirtsComponent } from './shopping/tshirts/tshirts.component';
import { PantsComponent } from './shopping/pants/pants.component';
import { ShoesComponent } from './shopping/shoes/shoes.component';
import { JewelleryComponent } from './shopping/jewellery/jewellery.component';
import { ProductsComponent } from './products/products.component';
import { MytestComponent } from './mytest/mytest.component';


@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    AddeditComponent,
    WelcomeComponent,
    ReguserComponent,
    ShoppingComponent,
    CartComponent,
    PaymentComponent,
    TransactionComponent,
    ForgotpasswordComponent,
    ResetpasswordComponent,
    TshirtsComponent,
    PantsComponent,
    ShoesComponent,
    JewelleryComponent,
    ProductsComponent,
    MytestComponent   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule

   
  ],
  providers: [ {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
