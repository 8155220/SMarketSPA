import { SMarketService } from './../../../services/smarket.service';
import { FormBuilder } from '@angular/forms';
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
  myForm:FormGroup;
  constructor(public sMarketService:SMarketService ,public fb:FormBuilder) { 

  }

  ngOnInit() {
    this.myForm = this.fb.group({
      noteType:"entry",
      receivedBy:"",
      deliveredTo:"",
      observation:"",
      date:""
    });

    this.myForm.valueChanges.subscribe(console.log);
    this.onChangeNoteType();
  }

  onSave(){

  }

  get noteType(){
    return this.myForm.get('noteType').value;
  }

  onChangeNoteType():void{
    this.myForm.get('noteType').valueChanges.subscribe(e=>{
      if(e="entry"){

      }
    });
  }

}
