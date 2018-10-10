import { ImageModel } from './../../../models/image';
import { Product } from "./../../../models/product";
import { SMarketService } from "./../../../services/smarket.service";
import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
//import { ImageModel } from '../../../models/image';

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
      sMarketService.getProduct(id).subscribe((data: Product) => {
        this.product = data;
        for(let i=this.product.images.length;i<4;i++){
          let image:ImageModel= new ImageModel();
          image.url="assets/img/noimage.png";
          this.product.images.push(image);
        }
      });
    });
  }

  ngOnInit() {}
}
