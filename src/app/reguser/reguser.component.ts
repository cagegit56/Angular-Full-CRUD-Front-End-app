import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../_models/user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reguser',
  templateUrl: './reguser.component.html',
  styleUrls: ['./reguser.component.css']
})
export class ReguserComponent {

RegForm!: FormGroup;
submitted = false;
loading = false;
isLoginError : boolean = false;
UserName: any;
Password: any;
Email: any;
user= new User();
emailPattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  constructor(private fg : FormBuilder, private auth : AuthService, private router: Router ,private toastr: ToastrService){}


  ngOnInit(): void{
    this.RegForm = this.fg.group({
     
      UserName: ['', Validators.required],
       Email: ['', Validators.required],
      Password: ['', Validators.required, Validators.minLength(8),
      Validators.maxLength(40), Validators.pattern('^((?!.*[s])(?=.*[A-Z])(?=.*d).{8,99})') ],
      
    });
  
  }

  get f() { return this.RegForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.RegForm.invalid) {
      return;
    }else{

    this.loading = true;

    this.auth.signUp(this.RegForm.value).subscribe((data: any)=> {
      if(data.succeeded == true)
      this.toastr.success('Successfully Registered');
        this.router.navigate(['/welcome']);
    
    },err=>{
      alert('UserName Already Exists');
    })
    
    }

  }

}
