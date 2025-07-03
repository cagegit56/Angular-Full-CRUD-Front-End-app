import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent {

  ngOnInit(){}

  constructor(private router: Router){}

  logOut(){
      localStorage.removeItem('authToken');
      this.router.navigate(['./welcome']);
  }

}
