import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
// emailPattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
// pass = "^((?!.*[s])(?=.*[A-Z])(?=.*d).{8,99}";
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
       Validators.maxLength(16)
      ]
       ],
       confirmPassword: ['', Validators.required]
      // Password: ['', Validators.required, Validators.minLength(8),
      // Validators.maxLength(40), Validators.pattern('^((?!.*[s])(?=.*[A-Z])(?=.*d).{8,99})') ],
      //no special character (/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}$/)

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
      this.toastr.success('Successfully Registered Please Sign In');
        // this.router.navigate(['/welcome']);
    
    },err=>{
      alert('UserName Already Exists');
    })
    
    }

  }

}
