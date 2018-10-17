import { ImageModel } from "./../models/image";
import { Product } from "./../models/product";
import { AngularFireStorage } from "@angular/fire/storage";
import { UnitType } from "./../models/unit-type";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import {
  filter,
  map,
  catchError,
  finalize,
  switchMap,
  tap
} from "rxjs/operators";
import { Observable, forkJoin, from, combineLatest } from "rxjs";
import { Note } from "../models/note";
import { ProductNoteDetail } from "../models/product-note-detail";
import { DTONote } from "../models/dto/dtonote";
@Injectable({
  providedIn: "root"
})
export class SMarketService {
  private url = "https://localhost:44351/api/";
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;

  images: any[] = [];

  allPercentage: Observable<any>;

  constructor(private http: HttpClient, private storage: AngularFireStorage) {
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
  getLastProducts() {
    return this.getQuery("Products/last");
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

  /* createProduct(product: any){
    let postUrl: string = `${this.url}Products/`;
    let headers = new HttpHeaders().set("Content-Type", "application/json");

    return this.http
      .post(postUrl, product, {
        headers: new HttpHeaders({ "Content-Type": "application/json" })
      })
      .subscribe(resp => console.log(resp));
  }*/

  /*async createProduct(
    product: any,
    eventTarget: any,
    posPrincipalImage: number
  ) {
    console.log('Productos 2:');
    
    console.log(product);
    
    let postUrl: string = `${this.url}Products/`;
    let headers = new HttpHeaders().set("Content-Type", "application/json");

    let counter: number = 0;
    eventTarget.forEach(e => {
      const filePath = `productImages/+${new Date().getTime()}_${
        product.name
      }_${e.lastModified}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, e);
      this.uploadPercent = task.percentageChanges();
      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(urlfile => {
               console.log("downloadUrl :"+urlfile);
               console.log('Contador :'+counter);
              
              // let image = { url: urlfile };
              let image = new ImageModel();
              image.url=urlfile;
              if(counter==posPrincipalImage){
                image.isMain=true;
              }
              this.images.push(image);

              if (counter == eventTarget.length - 1) {
               console.log('Images :');
               console.log(this.images);
              console.log('posPrincipalImage:'+ posPrincipalImage);
                

                product.images = this.images;
                product.image = this.images[posPrincipalImage].url;
                let peticionCreate: any = this.http
                  .post(postUrl, product, {
                    headers: new HttpHeaders({
                      "Content-Type": "application/json"
                    })
                  })
                  .subscribe((product2: any) => {});
              }
              console.log(this.images);
              //this.createImage(image);
              counter++;
            });
          })
        )
        .subscribe();
    });

    if (eventTarget.length == 0) {
      return  this.http
        .post(postUrl, product, {
          headers: new HttpHeaders({ "Content-Type": "application/json" })
        })
        .subscribe((product2: any) => {});
    }
  }*/
  async updateProduct(
    product: any,
    eventTarget: any,
    posPrincipalImage: number
  ) {
    console.log(product);

    let postUrl: string = `${this.url}Products/${product.productId}`;
    let headers = new HttpHeaders().set("Content-Type", "application/json");

    let counter: number = 0;
    eventTarget.forEach(e => {
      const filePath = `productImages/+${new Date().getTime()}_${
        product.name
      }_${e.lastModified}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, e);
      this.uploadPercent = task.percentageChanges();
      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(urlfile => {
              // console.log("downloadUrl :"+urlfile);
              // console.log('Contador :'+counter);
              // console.log('Images :'+this.images);

              // let image = { url: urlfile };
              let image = new ImageModel();
              image.url = urlfile;
              if (counter == posPrincipalImage) {
                image.isMain = true;
              }
              this.images.push(image);

              if (counter == eventTarget.length - 1) {
                product.images = this.images;
                if (posPrincipalImage == -1) {
                  posPrincipalImage = 0;
                }

                product.image = this.images[posPrincipalImage].url;
                console.log("Url :" + postUrl);

                console.log("Put product :");
                console.log(product);
                let peticionCreate: any = this.http
                  .put(postUrl, product, {
                    //cambiar por headers
                    headers: new HttpHeaders({
                      "Content-Type": "application/json"
                    })
                  })
                  .subscribe((product2: any) => {});
              }
              console.log(this.images);
              //this.createImage(image);
              counter++;
            });
          })
        )
        .subscribe();
    });

    if (eventTarget.length == 0) {
      return this.http
        .put(postUrl, product, {
          headers: new HttpHeaders({ "Content-Type": "application/json" })
        })
        .subscribe((product2: any) => {});
    }
  }

  createImage(image: any) {
    let postUrl: string = `${this.url}Images/`;
    return this.http
      .post(postUrl, image, {
        headers: new HttpHeaders({ "Content-Type": "application/json" })
      })
      .subscribe(resp => console.log(resp));
  }

  deleteProduct(id: number) {
    let deleteUrl: string = `${this.url}Products/${id}`;
    return this.http.delete(deleteUrl).subscribe(res => console.log(res));
  }

  getProduct(id: number) {
    return this.getQuery("Product/" + id);
  }

  createProduct(
    product: any,
    files: any,
    posPrincipalImage: number
  ): Observable<number> {
    let postUrl: string = `${this.url}Products/`;
    let headers = new HttpHeaders().set("Content-Type", "application/json");

    const allPercentage: Observable<number>[] = [];
    let counter = 0;
    for (const file of files) {
      const path = `productImages/+${new Date().getTime()}_${product.name}_${
        file.lastModified
      }`;
      const ref = this.storage.ref(path);
      const task = this.storage.upload(path, file);
      const _percentage$ = task.percentageChanges();
      allPercentage.push(_percentage$);

      const _t = task.then(f => {
        return f.ref.getDownloadURL().then(urlfile => {
          let image = new ImageModel();
          image.url = urlfile;
          if (counter == posPrincipalImage) {
            image.isMain = true;
          }
          this.images.push(image);
          if (counter == files.length - 1) {
            product.images = this.images;
            product.image = this.images[posPrincipalImage].url;

            console.log("Entro peticiones");

            this.http
              .post(postUrl, product, {
                //cambiar por headers
                headers: new HttpHeaders({
                  "Content-Type": "application/json"
                })
              })
              .subscribe(
                success => console.log(success),
                error => console.log(error)
              );
          }
          counter++;
        });
      });
    }

    this.allPercentage = combineLatest(allPercentage).pipe(
      map(percentages => {
        let result = 0;
        for (const percentage of percentages) {
          result = result + percentage;
        }
        return result / percentages.length;
      }),
      tap(console.log)
    );

    return this.allPercentage;
  }

  createContactUs(contactUs: any) {
    let postUrl: string = `${this.url}ContactUs/`;
    let header = new HttpHeaders().set("Content-Type", "application/json");

    return this.http.post(postUrl, contactUs, { headers: header });
  }

  createNote(note: Note, productNoteDetail: ProductNoteDetail[]) {

    console.log('nota');
    
    console.log(note);
    console.log('Productdetail');

    console.log(productNoteDetail);
    
    
    let dtoNote: DTONote = new DTONote();
    note.total = productNoteDetail.reduce( (acu,cur)=>acu+cur.amount,0);
    dtoNote.note = note;
    dtoNote.productNoteDetail = productNoteDetail;

    let postUrl: string = `${this.url}Notes/`;
    let header = new HttpHeaders().set("Content-Type", "application/json");

    return this.http.post(postUrl, dtoNote, { headers: header });
  }
}
