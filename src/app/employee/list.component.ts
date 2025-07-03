import { Component } from '@angular/core';
import { Emp } from '../_models/emp';
import { EmpService } from '../_services/emp.service';
import { first } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { User } from '../_models/user';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  employees!: Emp[];
  totalrow: number = 0;
  Name: any;  

  constructor(private empService: EmpService,private router: Router,
     private auth: AuthService) {}

  ngOnInit(): void {
      this.loadEmployee();
    this.getUsername();
  }

loadEmployee() {
    this.empService.getAll().pipe(first())
      .subscribe(d => {
        this.employees = d;
        this.totalrow = d.length;
      });
  }

  delete(emp: Emp) {
    this.empService.delete(emp.empId).pipe(first())
      .subscribe(() => {
        this.loadEmployee();
      })
  }


  logOut(){
    localStorage.removeItem('authToken');
    this.router.navigate(['./welcome']);
  }

getUsername() {
  const jwtHelper = new JwtHelperService();
  const token = localStorage.getItem("authToken");
  if (token) {
    const decodedToken: any = jwtHelper.decodeToken(token);
    this.Name = decodedToken.name;
    //this.Role = decodedToken.role;
    return decodedToken;
  }
  return null;
}



}
