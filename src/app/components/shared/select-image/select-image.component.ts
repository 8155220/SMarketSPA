import { Component, OnInit, Output,EventEmitter } from "@angular/core";
import { Observable, fromEvent, from } from "rxjs";
import { JQueryStyleEventEmitter } from "rxjs/internal/observable/fromEvent";
import {  } from "protractor";
//import * as _ from './../../../../assets/js/gallery-image.js';
@Component({
  selector: "app-select-image",
  templateUrl: "./select-image.component.html",
  styleUrls: ["./select-image.component.css"]
})
export class SelectImageComponent implements OnInit {
  dataUrls: string[] = [];
  @Output('fileAdded') fileAdded: EventEmitter<File> = new EventEmitter();
  @Output('fileDeleted') fileDeleted: EventEmitter<boolean> = new EventEmitter();
  
  
  files:any[]=[];


  constructor() {}

  ngOnInit() {}

  onChange(event) {
    console.log(event);
    
    let recentFiles = event.target.files;
    Array.from(recentFiles).forEach((e:File) => {
      this.files.push(e);
      this.fileAdded.emit(e);
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.dataUrls.push(event.target.result);
      };
      reader.readAsDataURL(e);
    });
  }

  imgs(event) {
    let event2 = from(event.target.files);
    event2.subscribe(e => console.log(e));
  }

  deleteImage(){
    this.dataUrls.pop();
    this.files.pop();
    this.fileDeleted.emit(true);
  }
}
