import { Component, OnInit } from "@angular/core";
import { SMarketService } from "../../../services/smarket.service";
import { map } from "rxjs/operators";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {

  lastProducts:any[]=[];
  constructor(public sMarketservice: SMarketService) {}

  ngOnInit() {
    this.getLastProduct();
  }

  getLastProduct() {
    this.sMarketservice.getLastProducts().subscribe((e:any[])=>{
      this.lastProducts=e;
    }
    );
  }

}
