import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent {

  forgotPasswordForm!: FormGroup;
  submitted = false;
 

  constructor(private fg : FormBuilder, private auth : AuthService, private router: Router ,private toastr: ToastrService){}

  ngOnInit(): void{
    this.forgotPasswordForm = this.fg.group({
           
       Email: ['', [Validators.required ,Validators.email  ] ]
    });
  
  }


  get f() { return this.forgotPasswordForm.controls; }


  forgotPassword(){
    this.submitted = true;
    if (this.forgotPasswordForm.invalid) {
      return;
    }else{
      this.auth.passwordRecovery(this.forgotPasswordForm.value).subscribe((data: any)=> {
        if(data.succeeded == true)
        this.forgotPasswordForm.reset();
        this.toastr.success('Please Check your Email For a Reset Password Link');
        alert('Please Check your Email For a Reset Password Link');
          // this.router.navigate(['/welcome']);
      
      },err=>{
        alert('Email Does not Exist');
      })
      
      }
  }




}



