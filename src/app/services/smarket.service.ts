import { UnitType } from "./../models/unit-type";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { filter, map, catchError } from "rxjs/operators";
import { Observable } from "rxjs";
@Injectable({
  providedIn: "root"
})
export class SMarketService {
  private url = "https://localhost:44351/api/";
  constructor(private http: HttpClient) {
    console.log("Services works");
    //console.log(this.getProducts());
    //this.getNewReleases();
  }

  getQuery(query: string) {
    let queryUrl = this.url + query;
    // const headers = new HttpHeaders({
    //   Authorization: this.key
    // });
    return this.http.get(queryUrl);
  }

  getProducts() {
    return this.getQuery("Products");
  }

  getUnitTypes() {
    return this.getQuery("UnitTypes");
  }

  getProductTypes() {
    return this.getQuery("ProductTypes");
  }

  createUnitType(unitType: any) {
    let postUrl: string = `${this.url}UnitTypes/`;
    let headers = new HttpHeaders().set("Content-Type", "application/json");

    return this.http
      .post(postUrl, unitType, {
        headers: new HttpHeaders({ "Content-Type": "application/json" })
      })
      .subscribe(resp => console.log(resp));
  }

  updateUnitType(id: number, unitType: any) {
    let putUrl: string = `${this.url}UnitTypes/${id}`;
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    console.log(unitType);

    return this.http
      .put(putUrl, unitType, {
        headers: new HttpHeaders({ "Content-Type": "application/json" })
      })
      .subscribe(res => console.log(res));
  }

  deleteUnitType(id: number) {
    let deleteUrl: string = `${this.url}UnitTypes/${id}`;
    return this.http.delete(deleteUrl).subscribe(res => console.log(res));
  }

  createProductType(productType: any) {
    let postUrl: string = `${this.url}ProductTypes/`;
    let headers = new HttpHeaders().set("Content-Type", "application/json");

    return this.http
      .post(postUrl, productType, {
        headers: new HttpHeaders({ "Content-Type": "application/json" })
      })
      .subscribe(resp => console.log(resp));
  }

  updateProductType(id: number, productType: any) {
    let putUrl: string = `${this.url}ProductTypes/${id}`;
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    console.log(productType);

    return this.http
      .put(putUrl, productType, {
        headers: new HttpHeaders({ "Content-Type": "application/json" })
      })
      .subscribe(res => console.log(res));
  }

  deleteProductType(id: number) {
    let deleteUrl: string = `${this.url}ProductTypes/${id}`;
    return this.http.delete(deleteUrl).subscribe(res => console.log(res));
  }

  
}
