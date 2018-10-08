import { Product } from './../models/product';
import { AngularFireStorage } from '@angular/fire/storage';
import { UnitType } from "./../models/unit-type";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { filter, map, catchError, finalize } from 'rxjs/operators';
import { Observable } from "rxjs";
@Injectable({
  providedIn: "root"
})
export class SMarketService {
  private url = "https://localhost:44351/api/";
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;

  images: any[]=[];

  constructor(private http: HttpClient,private storage: AngularFireStorage) {
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

  /*createProduct(product: any){
    let postUrl: string = `${this.url}Products/`;
    let headers = new HttpHeaders().set("Content-Type", "application/json");

    return this.http
      .post(postUrl, product, {
        headers: new HttpHeaders({ "Content-Type": "application/json" })
      })
      .subscribe(resp => console.log(resp));
  }*/
/*
  async createProduct(product: any,eventTarget:any){
    let postUrl: string = `${this.url}Products/`;
    let headers = new HttpHeaders().set("Content-Type", "application/json");

    let productCreated:any; 
    let peticionCreate:any= await this.http
      .post(postUrl, product, {
        headers: new HttpHeaders({ "Content-Type": "application/json" })
      })
      .subscribe((product2:any) => {
          
     //Imagenes
    
    eventTarget.forEach(e => {
      const filePath = `productImages/+${new Date().getTime()}_${
        product.name
      }`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, e);
      this.uploadPercent = task.percentageChanges();
      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(urlfile => {
              var image = {url:urlfile,proudctId:product2.productId};
              console.log(image);
              this.createImage(image);
            });
          })
        )
        .subscribe();
    }); 
      }
      );
  }
*/
async createProduct(product: any,eventTarget:any){
  let postUrl: string = `${this.url}Products/`;
  let headers = new HttpHeaders().set("Content-Type", "application/json");

  let productCreated:any; 
 

     let counter:number = 0;
    eventTarget.forEach(e => {
      const filePath = `productImages/+${new Date().getTime()}_${
        product.name
      }`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, e);
      this.uploadPercent = task.percentageChanges();
      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(urlfile => {
              counter++;
              console.log('Contador :'+counter);
              var image = {url:urlfile};
              this.images.push(image);
              if (counter==4){
                product.images=this.images;
                product.image=this.images[0].url;
                let peticionCreate:any= this.http
                .post(postUrl, product, {
                  headers: new HttpHeaders({ "Content-Type": "application/json" })
                })
                .subscribe((product2:any) => {
                }
                );
              }
              console.log(image);
              //this.createImage(image);
            });
          })
        )
        .subscribe();
    }); 

    /*let peticionCreate:any= await this.http
    .post(postUrl, product, {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    })
    .subscribe((product2:any) => {
    }
    );*/
}

  createImage(image:any){
    let postUrl: string = `${this.url}Images/`;
    return this.http
      .post(postUrl, image, {
        headers: new HttpHeaders({ "Content-Type": "application/json" })
      })
      .subscribe(resp => console.log(resp));

     
    /*
     //Imagenes
    this.eventTarget.forEach(e=>console.log(e));
    
    this.eventTarget.forEach(e => {
      const filePath = `productImages/+${new Date().getTime()}_${
        this.myForm.get("name").value
      }`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, e);
      this.uploadPercent = task.percentageChanges();
      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            this.downloadURL = fileRef.getDownloadURL().subscribe(urlfile => {
              
              var image = {url:urlfile};
              this.images.push(image);
              console.log(this.images);
            });
          })
        )
        .subscribe();
    }); */
  }

  
}
