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
  constructor(public sMarketService: SMarketService, public route: Router) {}

  ngOnInit() {
    console.log("OnINItPRoduct list");

    this.sMarketService
      .getProducts()
      .pipe(first())
      .subscribe(
        (data: any) => {
          console.log(data);
          this.products = data;
          console.log(this.products);
        },
        undefined,
        () => console.log("Complete")
      );
  }
  ngOnDestroy(): void {
    console.log("OnDestroy list");
  }

  onDelete(index: number) {
    let product: Product = this.products[index];

    this.sMarketService.deleteProduct(product.productId);
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
