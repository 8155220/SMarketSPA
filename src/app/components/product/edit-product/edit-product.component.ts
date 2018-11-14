import { ImageModel } from "./../../../models/image";
import { Product } from "./../../../models/product";
import { ProductType } from "./../../../models/product-type";
import { FormBuilder,FormGroup,FormArray } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { SMarketService } from "../../../services/smarket.service";
import { UnitType } from "../../../models/unit-type";
import { Router, ActivatedRoute } from "@angular/router";
import { AngularFireStorage } from "@angular/fire/storage";
@Component({
  selector: "app-edit-product",
  templateUrl: "./edit-product.component.html",
  styleUrls: ["./edit-product.component.css"]
})
export class EditProductComponent implements OnInit {
  eventTarget: any[] = [];
  imagesPreview: string[] = [];
  unitTypes: UnitType[];
  productTypes: ProductType[];
  myForm: FormGroup;
  public dob: NgbDateStruct;
  product: Product;
  urls = new Array<string>();
  loading=true;

  // uploadPercent: Observable<number>;
  // downloadURL: Observable<string>;
  images: any[] = [];

  enabledImages: boolean[] = [];
  selectedImagePos: number = -1;

  constructor(
    public sMarketService: SMarketService,
    public fb: FormBuilder,
    private router: Router,
    public _routerActivated: ActivatedRoute
  ) {
    this.dob = null;
    sMarketService.getProductTypes().subscribe((data: ProductType[]) => {
      this.productTypes = data;
      console.log(this.productTypes);
    });
    sMarketService.getUnitTypes().subscribe((data: UnitType[]) => {
      this.unitTypes = data;
      console.log(this.unitTypes);
    });

    for (let i = 0; i < 4; i++) {
      this.enabledImages.push(false);
    }
    console.log(this.enabledImages);
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      productId: "",
      name: "",
      provider: "",
      sellPrice: "",
      buyPrice: "",
      expirationDate: "",
      image: "",
      description: "",
      productTypeId: "",
      unitTypeId: ""
    });
    //Loading Product
    this._routerActivated.queryParams.subscribe(params => {
      console.log(params);
      let id = params["productId"];
      this.sMarketService.getProduct(id).subscribe((data: Product) => {
        this.product = data;
        this.loading=false;
        for (let i = this.product.images.length; i < 4; i++) {
          let image: ImageModel = new ImageModel();
          image.url = "assets/img/noimage.png";
          this.product.images.push(image);
        }
        for (let i = 0; i < this.product.images.length; i++) {
          if (this.product.images[i].isMain) {
            this.selectedImagePos = i;
          }
        }
        this.loadFormGroup();        
      });
    });
    this.myForm.valueChanges.subscribe(console.log);
  }
  loadFormGroup(){
    this.myForm.get('productId').setValue(this.product.productId);
    this.myForm.get('name').setValue(this.product.name);
    this.myForm.get('provider').setValue(this.product.provider);
    this.myForm.get('sellPrice').setValue(this.product.sellPrice);
    this.myForm.get('buyPrice').setValue(this.product.buyPrice);
    this.setDate(this.product.expirationDate);
    this.myForm.get('image').setValue(this.product.image);
    this.myForm.get('description').setValue(this.product.description);
    this.myForm.get('productTypeId').setValue(this.product.productTypeId);
    this.myForm.get('unitTypeId').setValue(this.product.unitTypeId);
    this.myForm.get('productTypeId').setValue(this.product.productTypeId);
  }
  setDate(date:any){
    let d = new Date(date)
    this.myForm.get('expirationDate').setValue({year:d.getFullYear(),month:d.getMonth(),day:d.getDate()});
  }

  public addFile1(event: any) {
    if (event.target.files && event.target.files[0]) {
      // this.path1 = event.target.files[0];
      this.eventTarget[0] = event.target.files[0];
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.imagesPreview[0] = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
    //para la seleccion de la imagen principal
    this.enabledImages[0] = true;
  }
  public addFile2(event: any) {
    if (event.target.files && event.target.files[0]) {
      //this.path2 = event.target.files[0];
      this.eventTarget[1] = event.target.files[0];
      var reader = new FileReader();
      reader.onload = (event: any) => {
        //this.eventTarget[1] = event.target;
        this.imagesPreview[1] = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
    this.enabledImages[1] = true;
  }
  public addFile3(event: any) {
    //this.path3 = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      this.eventTarget[2] = event.target.files[0];
      reader.onload = (event: any) => {
        //this.eventTarget[2] = event.target;
        this.imagesPreview[2] = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }

    this.enabledImages[2] = true;
  }
  public addFile4(event: any) {
    //this.path4 = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      this.eventTarget[3] = event.target.files[0];
      reader.onload = (event: any) => {
        // this.eventTarget[3] = event.target;
        this.imagesPreview[3] = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }

    this.enabledImages[3] = true;
  }

  onSave() {
    let expirationDate = this.myForm.get("expirationDate").value;
    expirationDate =
      expirationDate.year +
      "-" +
      expirationDate.month +
      "-" +
      expirationDate.day;
    this.myForm.get("expirationDate").setValue(expirationDate);
    let producto = this.myForm.value as Product;

    this.loading=true;
    let aux = this.sMarketService.updateProduct(
      this.myForm.value,
      this.eventTarget,
      this.posSelecionadoFinal()).subscribe(e=>{
        this.loading=false;
        this.router.navigate(["products"]);
      });
    
  }

  onCancel() {
    this.router.navigate(["products"]);
  }

  // Para imagenes Seleccionadas Logica de la vista
  onChangePrincipalImage() {
    if (this.selectedImagePos == -1 && this.enabledQuantity() > 0) {
      this.selectedImagePos = this.firstEnabled();
    } else if (this.enabledQuantity() > 1) {
      let posActual = this.next(this.selectedImagePos);
      for (let i = 0; i < 3; i++) {
        if (this.enabledImages[posActual]) {
          this.selectedImagePos = posActual;
          break;
        }
        posActual = this.next(posActual);
      }
    }
  }

  enabledQuantity() {
    let counter = 0;
    this.enabledImages.forEach(e => {
      if (e == true) counter++;
    });
    return counter++;
  }

  next(pos: number) {
    if (pos == 3) return 0;
    return ++pos;
  }
  firstEnabled() {
    for (let i = 0; i < 4; i++) {
      if (this.enabledImages[i] == true) return i;
    }
  }

  posSelecionadoFinal() {
    let counter = -1;
    for (let i = 0; i < 4; i++) {
      if (this.enabledImages[i]) counter++;
      if (i == this.selectedImagePos) {
        console.log("Final seleccionado :" + counter);

        return counter;
      }
    }
    console.log("Final seleccionado :" + counter);
    return -1;
  }
}
