import { Router } from '@angular/router';
import { Note } from './../../../models/note';
import { Product } from './../../../models/product';
import { ProductNoteDetail } from './../../../models/product-note-detail';
import { SMarketService } from './../../../services/smarket.service';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
@Component({
  selector: 'app-note-add',
  templateUrl: './note-add.component.html',
  styleUrls: ['./note-add.component.css']
})
export class NoteAddComponent implements OnInit {

  // noteType:string='';
  loading:boolean=false;
  myForm:FormGroup;
  productDetailList:ProductNoteDetail[]=[];
  constructor(public sMarketService:SMarketService ,public fb:FormBuilder,public router:Router) { 
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      noteType:["entry"],
      receivedBy:["",[Validators.required]],
      deliveredTo:["",[Validators.required]],
      observation:["",[Validators.required]],
      date:["",[Validators.required]]
    });

    this.myForm.valueChanges.subscribe(console.log);
    this.onChangeNoteType();
  }

 

  get noteType(){
    return this.myForm.get('noteType').value;
  }

  set date(date:string){
    this.myForm.get('date').setValue(date);
  }
  onChangeNoteType():void{
    this.myForm.get('noteType').valueChanges.subscribe(e=>{
      if(e="entry"){
      }
    });
  }

  onDeleteProductDetail($event){
    this.productDetailList.splice($event,1);
  }
  onAddProductDetail($event:ProductNoteDetail){
    if(this.productAlreadyAdded($event)){
      this.productDetailList
      .map(e=>{
        if(e.productId===$event.productId){
          e.quantity= $event.quantity;
          e.amount=$event.amount;
          return e;
        }
      })
      ;
    }else {
      this.productDetailList.push($event);
    }
    console.log(this.productDetailList);
    
  }

  getDate(){
    let expirationDate = this.myForm.get("date").value;
    expirationDate =
      expirationDate.year +
      "-" +
      expirationDate.month +
      "-" +
      expirationDate.day;
      return expirationDate;
  }

  onSave(){
    let note:Note = this.myForm.value as Note;
    note.date= this.getDate();
    this.loading=true;
    this.sMarketService.createNote(note,this.productDetailList).subscribe(
      e=>{
        console.log();
        this.loading=false;
        this.router.navigate(['/home']);
      }
    );
  }

  productAlreadyAdded(product:ProductNoteDetail){
    return this.productDetailList.find(e=>e.productId===product.productId);
  }

}
