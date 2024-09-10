import { Component, Input } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Prodmodel } from '../_models/prodmodel';
import { BehaviorSubject, first } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { NonNullAssert } from '@angular/compiler';
import { HttpClient } from '@angular/common/http';
import { hide } from '@popperjs/core';

@Component({
  selector: 'app-mytest',
  templateUrl: './mytest.component.html',
  styleUrls: ['./mytest.component.css']
})
export class MytestComponent {

  products!: Prodmodel[];
  totalrow: number = 0;
  Loading: boolean = false;
  

  constructor(private auth: AuthService){}


  ngOnInit(): void {
     this.loadProducts();
  }


  loadProducts() {
    this.Loading = true;
    this.auth.getAll().pipe(first())
      .subscribe((data: any) => {
        console.log(data);
        this.products = data;
        this.totalrow = data.length; 
        this.Loading = false;   
      },err =>{
        this.Loading = false;
      });

  }









}
