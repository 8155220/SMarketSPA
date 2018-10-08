import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { SMarketService } from '../../services/smarket.service';
import { ProductType } from '../../models/product-type';

@Component({
  selector: 'app-product-type',
  templateUrl: './product-type.component.html',
  styleUrls: ['./product-type.component.css']
})
export class ProductTypeComponent implements OnInit {

  productTypes: ProductType[] = [];
  showNew: Boolean = false;
  submitType: string = "Save";
  myForm: FormGroup;
  selectedRow:number;
  constructor(public sMarketService: SMarketService, private fb: FormBuilder) {
    sMarketService.getProductTypes().subscribe((data: ProductType[]) => {
      this.productTypes = data;
      console.log(this.productTypes);
    });
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      name: "",
      description: ""
    });

    this.myForm.valueChanges.subscribe(console.log);
  }

  onNew() {
    //this.regModel = new Registration();
    // Change submitType to 'Save'.
    this.myForm.get('name').setValue("");
    this.myForm.get('description').setValue("");
    this.submitType = "Save";
    // display registration entry section.
    this.showNew = true;
  }

  onSave() {
    if (this.submitType == "Save") {
      this.sMarketService.createProductType(this.myForm.value);
      this.showNew = false;
    }
    else {
      let productType: ProductType = this.productTypes[this.selectedRow];
      productType.name = this.myForm.get("name").value;
      productType.description = this.myForm.get("description").value;
      this.sMarketService.updateProductType(productType.productTypeId, productType);
    }
    
  }

  // This method associate to Edit Button.
  onEdit(index: number) {
    // Assign selected table row index.
    /*this.selectedRow = index;
    // Initiate new registration.
    this.regModel = new Registration();
    // Retrieve selected registration from list and assign to model.
    this.regModel = Object.assign({}, this.registrations[this.selectedRow]);
    // Change submitType to Update.*/
    this.selectedRow=index;
    this.submitType = "Update";
    // Display registration entry section.
    this.showNew = true;

    let productType:ProductType = this.productTypes[this.selectedRow];
    this.myForm.get('name').setValue(productType.name);
    this.myForm.get('description').setValue(productType.description);
    console.log(productType);
    
  }

  // This method associate to Delete Button.
  onDelete(index: number) {
    // Delete the corresponding registration entry from the list.
    //this.registrations.splice(index, 1);
    let productType:ProductType = this.productTypes[index];
    
    this.sMarketService.deleteProductType(productType.productTypeId);
  }

  onCancel() {
    this.showNew = false;
  }

}
