import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { SMarketService } from '../../services/smarket.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  submitted = false;
  myForm:FormGroup;
  constructor(private fb:FormBuilder,public sMarketService:SMarketService) { }

  success=false;
  ngOnInit() {
    this.myForm=this.fb.group({
      name:["",[Validators.required,Validators.minLength(4)]], 
      email:["",[Validators.required,Validators.email]], 
      subject:["",[Validators.required]],
      message:["",[Validators.required]],
    });
  }

  onSave(){
    this.submitted = true;
    
    // stop here if form is invalid
    if (this.myForm.invalid) {
        return;
    }

    this.sMarketService.createContactUs(this.myForm.value).subscribe(
      e=>{
        this.success=true;
      }
    );
    
  }

  get name(){
  return this.myForm.get('name');
  }
  get email(){
    return this.myForm.get('email');

  }
  get subject(){
    return this.myForm.get('subject');

  }
  get message(){
    return this.myForm.get('message');
  }


}
