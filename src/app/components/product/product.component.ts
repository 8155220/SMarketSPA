import { Component, OnInit } from '@angular/core';
import { SMarketService } from '../../services/smarket.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products:Product[]=[];
  constructor(sMarketService: SMarketService) {
    sMarketService.getProducts().subscribe( (data:any)=>{
      console.log(data);
      this.products=data;
      console.log(this.products);
      
    });
   }

  ngOnInit() {
  }

}
