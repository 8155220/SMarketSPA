import { ProductNoteDetail } from './../../../models/product-note-detail';
import { Product } from './../../../models/product';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { UnitType } from './../../../models/unit-type';
import { Component, OnInit, ViewChild } from "@angular/core";
import { SMarketService } from '../../../services/smarket.service';


@Component({
  selector: "app-note-detail",
  templateUrl: "./note-detail.component.html",
  styleUrls: ["./note-detail.component.css"]
})
export class NoteDetailComponent implements OnInit {
  unitTypes:UnitType[]=[];
  products:Product[]=[];
  product:Product;
  myForm:FormGroup;
  unitType: UnitType;

  productDetailList:ProductNoteDetail[]=[];
  
  constructor(public sMarketService:SMarketService,public fb:FormBuilder) {
    sMarketService.getUnitTypes().subscribe((data: UnitType[]) => {
      this.unitTypes = data;
    });
    sMarketService.getProducts().subscribe((data: Product[]) => {
      this.products = data;
      console.log(data);
    });
    
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      unitTypeId:"",
      description:"",
      productId:'',
      quantity:'',
      amount:'',
    });

    this.changeProduct();
    this.changeProductQuantity()
  }

  changeProduct(){
   this.myForm.get('productId').valueChanges.subscribe(e=>{
       this.product= this.products.find(p=> p.productId==e);
       this.unitType = this.unitTypes.find(ut=>ut.unitTypeId==this.product.unitTypeId);
   });
  }
  changeProductQuantity(){
   this.myForm.get('quantity').valueChanges.subscribe(e=>{
     console.log('entroquantity');
     
       if(this.product){
         let amount:number = this.product.sellPrice*e;
         this.myForm.get('amount').setValue(amount);
       }
   });
  }

  /*get sellPrice(){
    return this.myForm.get('amount').value();
  }*/
  get quantity(){
    return this.myForm.get('quantity').value;
  }
  get amount(){
    return this.myForm.get('amount').value;
  }

  addProductToNote(){
    let productNoteDetail = new ProductNoteDetail();
    productNoteDetail.productId=this.product.productId;
    productNoteDetail.quantity= this.quantity;
    productNoteDetail.amount=this.amount;
    console.log(productNoteDetail);
    
    this.productDetailList.push(productNoteDetail);
  }

  getProductUnitType(productId:number){
    let product=  this.products.find(p=> p.productId==productId);
    return this.unitTypes.find(ut=>ut.unitTypeId==product.unitTypeId);
  }
  getProduct(productId:number){
    return this.products.find(p=> p.productId==productId);
  }

  getTotal(){
    return this.productDetailList.reduce((acc,cur)=> acc+cur.amount,0);
  }
}
