import { ProductType } from './../../../models/product-type';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { SMarketService } from '../../../services/smarket.service';
import { UnitType } from '../../../models/unit-type';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  url1:string;
  url2:string;
  url3:string;
  url4:string;

  unitTypes:UnitType[];
  productTypes:ProductType[];
  myForm: FormGroup;
  public dob: NgbDateStruct;
  constructor(public sMarketService:SMarketService ,public fb:FormBuilder,private router: Router) { 
    this.dob= null;
    sMarketService.getProductTypes().subscribe((data: ProductType[]) => {
      this.productTypes = data;
      console.log(this.productTypes);
    });
    sMarketService.getUnitTypes().subscribe((data: UnitType[]) => {
      this.unitTypes = data;
      console.log(this.unitTypes);
    });

  }

  ngOnInit() {
    this.myForm = this.fb.group({
      name: "",
      provider: "",
      sellPrice: "",
      buyPrice: "",
      expirationDate: "",
      image: "",
      description: "",
      productTypeId:"",
      unitTypeId:""
    });


    this.myForm.valueChanges.subscribe(console.log);
  }

  urls = new Array<string>();

  detectFiles(event) {
    this.urls = [];
    let files = event.target.files;
    if (files) {
      for (let file of files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.urls.push(e.target.result);
        }
        reader.readAsDataURL(file);
      }
    }
  }

  public addFile1(event: any) {
    if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            reader.onload = (event: any) => {
                this.url1 = event.target.result;
            }
            reader.readAsDataURL(event.target.files[0]);
        }
  }
  public addFile2(event: any) {
    if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            reader.onload = (event: any) => {
                this.url2 = event.target.result;
            }
            reader.readAsDataURL(event.target.files[0]);
        }
  }
  public addFile3(event: any) {
    if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            reader.onload = (event: any) => {
                this.url3 = event.target.result;
            }
            reader.readAsDataURL(event.target.files[0]);
        }
  }
  public addFile4(event: any) {
    if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            reader.onload = (event: any) => {
                this.url4 = event.target.result;
            }
            reader.readAsDataURL(event.target.files[0]);
        }
  }

  onSave(){

  }

  onCancel(){
    this.router.navigate(['products']);
    
  }

}
