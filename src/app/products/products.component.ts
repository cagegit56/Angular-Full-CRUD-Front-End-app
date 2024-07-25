import { Component } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Prodmodel } from '../_models/prodmodel';



class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  ProductsForm!: FormGroup;
  submitted = false;
  loading = false; 
  fileToUpload!: any;
  imageUrl: string = "../../assets/jean.jpg";

  constructor(private fg : FormBuilder,private auth: AuthService, private http: HttpClient, private toastr: ToastrService) {}

  ngOnInit(){

    this.ProductsForm = this.fg.group({
     
      Id: ['', Validators.required],
      ProdPrice: ['', Validators.required],
       Quantity: ['', Validators.required],
       myFile: ['', Validators.required]
    }
    );


  }
  get f() { return this.ProductsForm.controls; }


  onSubmitFile( Id: any, ProdPrice: any, myFile: any){

    this.submitted = true;
    if (this.ProductsForm.invalid) {
      return;
    }else{

    this.loading = true;

    console.log(ProdPrice + this.fileToUpload);
    this.auth.postFile(Id.value,ProdPrice.value, this.fileToUpload).subscribe((data: any)=> {
      if(data.succeeded == true)     
        alert('Product Succesfully Added');
            
    },(err: any) =>{
      alert('Failed to Add a Product');
      console.log(err);
    })

  }

}


  handleFileInput(event: any){
    this.fileToUpload = <File>event.target.files[0];
    

    var reader = new FileReader();
    reader.onload = (e: any) => {
      this.imageUrl = e.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
    
  }

  




}
