import { ProductNoteDetail } from './../../../models/product-note-detail';
import { Product } from './../../../models/product';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { UnitType } from './../../../models/unit-type';
import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { SMarketService } from '../../../services/smarket.service';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';


@Component({
  selector: "app-note-detail",
  templateUrl: "./note-detail.component.html",
  styleUrls: ["./note-detail.component.css"],
  animations: [
    trigger('incrementFontSize',[
      state('small', style({
        'font-size':'15px',
    })),
    state('large', style({
      'font-size':'15px',
    })),
    transition('small <=> large', animate('200ms ease-in', keyframes([
      style({opacity: 0, 'font-size':'15px', offset: 0}),
      style({opacity: 1, 'font-size':'22px', offset: 0.5}),
      style({opacity: 1, 'font-size':'15px',    offset: 1.0})
    ]))),
     // transition('show=>hide',animate('600ms ease-out'))
    ])
  ]
})
export class NoteDetailComponent implements OnInit {
  state:string='small';
  unitTypes:UnitType[]=[];
  products:Product[]=[];
  product:Product;
  myForm:FormGroup;
  unitType: UnitType;

  productDetailList:ProductNoteDetail[]=[];
  @Output()
   productDetailAdded:EventEmitter<ProductNoteDetail> = new EventEmitter();
  @Output()
   productDetailDeleted:EventEmitter<number> = new EventEmitter();
  
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

  get quantity(){
    return this.myForm.get('quantity').value;
  }
  get amount(){
    return this.myForm.get('amount').value;
  }

  addProductToNote(){
    this.state=(this.state === 'small' ? 'large' : 'small');
    if(this.productAlreadyAdded()){

      this.productDetailList
      .map(e=>{
        if(e.productId===this.product.productId){
          e.quantity= e.quantity +this.quantity;
          console.log('cantida Acu : '+e.quantity);
          
          e.amount=e.amount + this.amount;
          this.productDetailAdded.emit(e);
         // return e;
        }
      })
      ;
    }
    else {
    let productNoteDetail = new ProductNoteDetail();
    productNoteDetail.productId=this.product.productId;
    productNoteDetail.quantity= this.quantity;
    productNoteDetail.amount=this.amount;
    this.productDetailList.push(productNoteDetail);
    this.productDetailAdded.emit(productNoteDetail);

    }


//productAlreadyAdded
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

  removeProductFromNote(i:number){
      this.productDetailList.splice(i,1);
      this.productDetailDeleted.emit(i);
  }

  productAlreadyAdded(){
    return this.productDetailList.find(e=>e.productId===this.product.productId);
  }
}
