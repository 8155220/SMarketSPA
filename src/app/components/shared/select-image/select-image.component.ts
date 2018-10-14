import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Observable, fromEvent, from } from "rxjs";
import { JQueryStyleEventEmitter } from "rxjs/internal/observable/fromEvent";
import {} from "protractor";
//import * as _ from './../../../../assets/js/gallery-image.js';
@Component({
  selector: "app-select-image",
  templateUrl: "./select-image.component.html",
  styleUrls: ["./select-image.component.css"]
})
export class SelectImageComponent implements OnInit {
  dataUrls: string[] = [];
  selectedImagePos: number ;

  @Output("fileAdded")
  fileAdded: EventEmitter<File> = new EventEmitter();
  @Output("fileDeleted")
  fileDeleted: EventEmitter<boolean> = new EventEmitter();
  @Output("selectedImageEmitter")
  selectedImageEmitter: EventEmitter<number> = new EventEmitter();

  files: any[] = [];

  constructor() {}

  ngOnInit() {}

  onChange(event) {
    this.addOnEmptylist();
    let recentFiles = event.target.files;
    Array.from(recentFiles).forEach((e: File) => {
      this.files.push(e);
      this.fileAdded.emit(e);
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.dataUrls.push(event.target.result);
      };
      reader.readAsDataURL(e);
      
    });
  }
  deleteImage() {
    this.deleteOnLastImageSelected();
    this.dataUrls.pop();
    this.files.pop();
    this.fileDeleted.emit(true);
  }
  selectedImage(i: number) {
    this.selectedImagePos = i;
    this.selectedImageEmitter.emit(i);
  }

  addOnEmptylist() {
    if (this.files.length == 0) {
      this.selectedImage(0);
    }
  }
  deleteOnLastImageSelected() {
    if (
      this.files.length > 0 &&
      this.selectedImagePos == this.files.length - 1
    ) {
      this.selectedImage(this.selectedImagePos - 1);
    }
  }
}
