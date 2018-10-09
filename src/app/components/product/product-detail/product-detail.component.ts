import { Product } from "./../../../models/product";
import { SMarketService } from "./../../../services/smarket.service";
import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.css"]
})
export class ProductDetailComponent implements OnInit {
  product: Product;
  constructor(
    public _router: ActivatedRoute,
    public sMarketService: SMarketService
  ) {
    // Capture the access token and code
    this._router.queryParams.subscribe(params => {
      console.log(params);

      let id = params["productId"];
      sMarketService
        .getProduct(id)
        .subscribe((data: Product) => {
          this.product = data;
          console.log(this.product);
          
        });
    });
  }

  ngOnInit() {}
}
