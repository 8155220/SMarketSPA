import { ImageModel } from "./../../../models/image";
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
  files:any[]=[];
  selectedImagePos:number;

  eventTarget: any[] = [];
  imagesPreview: string[] = [];

  unitTypes: UnitType[];
  productTypes: ProductType[];
  myForm: FormGroup;
  public dob: NgbDateStruct;

  urls = new Array<string>();


  // uploadPercent: Observable<number>;
  // downloadURL: Observable<string>;
  images: any[] = [];


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

  onSave() {

    this.myForm.get("expirationDate").setValue(this.getExpirationDate());
    //let producto = this.myForm.value as Product;

    let aux = this.sMarketService.createProduct(
      this.myForm.value,
      this.files,this.selectedImagePos
    );
    this.router.navigate(["products"]);
  }

  onCancel() {
    this.router.navigate(["products"]);
  }

  getExpirationDate(){
    let expirationDate = this.myForm.get("expirationDate").value;
    expirationDate =
      expirationDate.year +
      "-" +
      expirationDate.month +
      "-" +
      expirationDate.day;
      return expirationDate;
  }

  onAddedFile($event){
    console.log('Llego onAddedFile:'+$event);
    this.files.push($event);
  }
  onDeletedFile($event){
    console.log('Llego onDeletedFile:'+$event);
    if($event) this.files.pop();
  }
  selectedImage($event){
    console.log('Llego SelectedImagePost:'+$event);
    this.selectedImagePos=$event;
  }

}
