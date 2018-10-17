import { UnitType } from './../../../models/unit-type';
import { map,switchMap } from 'rxjs/operators';
import { Note } from './../../../models/note';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SMarketService } from '../../../services/smarket.service';
import { Product } from '../../../models/product';

@Component({
  selector: 'app-note-information',
  templateUrl: './note-information.component.html',
  styleUrls: ['./note-information.component.css']
})
export class NoteInformationComponent implements OnInit {

  note:Note;
  unitTypes:UnitType[]=[];
  products:Product[]=[];
  constructor(public activatedRoute:ActivatedRoute,public sMarketService:SMarketService) {
    // activatedRoute.queryParams.subscribe(e=>{
    //   console.log(e.noteId);

    // });
    
   }

  ngOnInit() {
    this.activatedRoute.queryParams.pipe(map((params:any)=>params.noteId),switchMap( id=>{
      if(id !== null && id !== undefined) { 
        return this.sMarketService.getNote(id);
      }
    })).subscribe((e:Note)=>{
      this.note=e;
      console.log(this.note.productNoteDetails);
    });

    this.sMarketService.getUnitTypes().subscribe((data: UnitType[]) => {
      this.unitTypes = data;
    });
    this.sMarketService.getProducts().subscribe((data: Product[]) => {
      this.products = data;
      console.log(data);
    });
  }

  getProductUnitType(productId:number){
    let product=  this.products.find(p=> p.productId==productId);
    return this.unitTypes.find(ut=>ut.unitTypeId==product.unitTypeId);
  }
  getProduct(productId:number){
    return this.products.find(p=> p.productId==productId);
  }

}
