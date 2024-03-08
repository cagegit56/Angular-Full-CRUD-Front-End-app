import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../_models/user';
import { ToastrService } from 'ngx-toastr';
// import Validation from './utils/validation';

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
confirmPassword: any;
Email: any;
user= new User();
errors : any;




  constructor(private fg : FormBuilder, private auth : AuthService, private router: Router ,private toastr: ToastrService){
    this.RegForm = new FormGroup({
      UserName: new FormControl(),
      Email: new FormControl(),
      Password: new FormControl(),
      confirmPassword: new FormControl()
    });
  }


  ngOnInit(): void{
    this.RegForm = this.fg.group({
     
      UserName: ['', Validators.required],
       Email: ['', [Validators.required ,Validators.email  ] ],
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

 

  get f() { return this.RegForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.RegForm.invalid) {
      return;
    }else{

    this.loading = true;

    this.auth.signUp(this.RegForm.value).subscribe((data: any)=> {
      if(data.succeeded == true)
      this.toastr.success('Successfully Registered Please Sign In');
        // this.router.navigate(['/welcome']);
    
    },err=>{
      alert('UserName Already Exists');
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



