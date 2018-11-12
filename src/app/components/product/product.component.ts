import { Router } from "@angular/router";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { SMarketService } from "../../services/smarket.service";
import { Product } from "../../models/product";
import { first } from "rxjs/operators";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.css"]
})
export class ProductComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  loading=true;
  deleteSelected:number;
  constructor(public sMarketService: SMarketService, public route: Router) {
    
  }

  ngOnInit() {
    console.log('OnINItPRoduct list');
    
    this.sMarketService.getProducts().pipe(first()).subscribe((data: any) => {
      console.log(data);
      this.products = data;
      console.log(this.products);
      this.loading=false;
    },undefined,()=>console.log("Complete")
    );
  }
  ngOnDestroy(): void {
    console.log("OnDestroy list");
  }

  onDelete(index: number) {
    console.log("Clikeo :"+index);
    this.deleteSelected=index;
    /*let product: Product = this.products[index];
    this.loading=true;
    this.sMarketService.deleteProduct(product.productId).subscribe(e=>{
      this.loading=false;
      this.ngOnInit();
    });*/
  }
  onDeleteConfirm(){
    let product: Product = this.products[this.deleteSelected];
    this.loading=true;
    this.sMarketService.deleteProduct(product.productId).subscribe(e=>{
      this.loading=false;
      this.ngOnInit();
    });
  }

  onDetails(index: number) {
    let product: Product = this.products[index];
    this.route.navigate(["products-detail"], {
      queryParams: { productId: product.productId }
    });
  }

  onEdit(index: number) {
    let product: Product = this.products[index];
    this.route.navigate(["product-edit"], {
      queryParams: { productId: product.productId }
    });
  }
}
