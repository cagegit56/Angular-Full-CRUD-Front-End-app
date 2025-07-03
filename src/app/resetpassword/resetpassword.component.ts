import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../_services/auth.service';
import { Resetpass } from '../_models/resetpass';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent {

  resetPasswordForm! : FormGroup;
  submitted = false;
   token: string;
   email: string;
   
  constructor(private fg : FormBuilder, private auth : AuthService, private router: Router ,private toastr: ToastrService, private route: ActivatedRoute)
  {
       let url = this.route.snapshot.queryParams['token'];
       this.token = url.replace(/ /g, '+');
       this.email = this.route.snapshot.queryParams['email'];

  }

  ngOnInit(): void{
    this.resetPasswordForm = this.fg.group({
     
       Email: this.email,
       Token:  this.token,
       Password: ['', [Validators.required,
       Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=.*[$@$!%*?&])(?=[^A-Z]*[A-Z]).{8,16}$/),
       Validators.minLength(8),
       Validators.maxLength(16) ]
       ],
       confirmPassword: ['', Validators.required ]

      //no special character pattern (/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}$/)

    },
    {
      validator: this.validatePasswords
    }
    );

    
  }


  get f() { return this.resetPasswordForm.controls; }



  resetPassword(resetPasswordFormValue: any){
        this.submitted = true;
        if (this.resetPasswordForm.invalid) {
          return;
        }else
             {          
          const resetPass = { ... resetPasswordFormValue };
           const myresetPass: Resetpass = {
           Password: resetPass.Password,
           confirmPassword: resetPass.confirmPassword,
           Email: this.email,
           Token: this.token
         }
         
        this.auth.resetPassword(myresetPass).subscribe((data: any)=> {
          if(data.succeeded == true)
          this.resetPasswordForm.reset();
          alert('Password Reset Successfully, Please Login with your New Password');
          this.router.navigate(['/welcome']);
                  
        },(err: any) => {
          alert('Link Expired or Link has been tempered with');
          console.log("status code--->" + err.message);
        })

      }
  }


  validatePasswords (formGroup: FormGroup): any {
    const password = formGroup.controls ['Password'];
    const confirmPassword = formGroup.controls ['confirmPassword'];
    // don't validate if either field is empty
    if (password.pristine || confirmPassword.pristine) {
      return null;
      
    }
  
    // mark the form as touched
    formGroup.markAsTouched ();
  
    // return null if passwords match, or an error object if they don't
    if (password.value === confirmPassword.value) {
      return null;
    } else {
      return confirmPassword.setErrors ( {
        notEqual: true
        
      });
    }
  }



}
