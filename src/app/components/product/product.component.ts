import { Router } from '@angular/router';
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
  constructor(public sMarketService: SMarketService,public route:Router) {
    sMarketService.getProducts().subscribe( (data:any)=>{
      console.log(data);
      this.products=data;
      console.log(this.products);
      
    });
   }

  ngOnInit() {
  }

  onDelete(index:number){
    let product:Product = this.products[index];
    
    this.sMarketService.deleteProductType(product.productId);
  }

  onDetails(index:number){
    let product:Product = this.products[index];
    this.route.navigate(['products-detail'], { queryParams: { productId: product.productId }});

    //this.sMarketService.deleteProductType(product.productId);
  }


}
