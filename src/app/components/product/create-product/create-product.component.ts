import { Image } from "./../../../models/image";
import { Product } from "./../../../models/product";
import { ProductType } from "./../../../models/product-type";
import { FormBuilder } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { SMarketService } from "../../../services/smarket.service";
import { UnitType } from "../../../models/unit-type";
import { Router } from "@angular/router";
//import { Observable } from "rxjs/Observable";
import { AngularFireStorage } from "@angular/fire/storage";
import { finalize } from "rxjs/operators";
@Component({
  selector: "app-create-product",
  templateUrl: "./create-product.component.html",
  styleUrls: ["./create-product.component.css"]
})
export class CreateProductComponent implements OnInit {
  eventTarget: any[] = [];
  imagesPreview: string[] = [];

  unitTypes: UnitType[];
  productTypes: ProductType[];
  myForm: FormGroup;
  public dob: NgbDateStruct;

 // uploadPercent: Observable<number>;
 // downloadURL: Observable<string>;

  images: any[]=[];

  constructor(
    public sMarketService: SMarketService,
    public fb: FormBuilder,
    private router: Router,
    private storage: AngularFireStorage
  ) {
    this.dob = null;
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
      productTypeId: "",
      unitTypeId: ""
    });

    this.myForm.valueChanges.subscribe(console.log);
  }

  urls = new Array<string>();

  /*detectFiles(event) {
    this.urls = [];
    let files = event.target.files;
    if (files) {
      for (let file of files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.urls.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  }*/

  public addFile1(event: any) {
    if (event.target.files && event.target.files[0]) {
     // this.path1 = event.target.files[0];
      this.eventTarget[0] = event.target.files[0];
      var reader = new FileReader();
      reader.onload = (event: any) => {
        
        this.imagesPreview[0] = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  public addFile2(event: any) {
    if (event.target.files && event.target.files[0]) {
      //this.path2 = event.target.files[0];
      this.eventTarget[1] = event.target.files[0];
      var reader = new FileReader();
      reader.onload = (event: any) => {
        //this.eventTarget[1] = event.target;
        this.imagesPreview[1] = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  public addFile3(event: any) {
    //this.path3 = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      this.eventTarget[2] = event.target.files[0];
      reader.onload = (event: any) => {
        //this.eventTarget[2] = event.target;
        this.imagesPreview[2] = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  public addFile4(event: any) {
    //this.path4 = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      this.eventTarget[3] = event.target.files[0];
      reader.onload = (event: any) => {
       // this.eventTarget[3] = event.target;
        this.imagesPreview[3] = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  onSave() {
    
   
    let expirationDate = this.myForm.get('expirationDate').value;
    expirationDate = expirationDate.year+"-"+expirationDate.month+"-"+expirationDate.day;
    this.myForm.get('expirationDate').setValue(expirationDate);
    console.log(expirationDate);
    let producto = this.myForm.value as Product;
    
    let aux =this.sMarketService.createProduct(this.myForm.value,this.eventTarget);
    this.router.navigate(['products']);
    console.log(aux);


  }

  onCancel() {
    this.router.navigate(["products"]);
  }
}
