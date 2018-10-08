import { UnitType } from "./../../models/unit-type";
import { SMarketService } from "./../../services/smarket.service";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { SMarketService } from "../../services/smarket.service";
@Component({
  selector: "app-unit-type",
  templateUrl: "./unit-type.component.html",
  styleUrls: ["./unit-type.component.css"]
})
export class UnitTypeComponent implements OnInit {
  unitTypes: UnitType[] = [];
  showNew: Boolean = false;
  submitType: string = "Save";
  myForm: FormGroup;
  selectedRow:number;
  constructor(public sMarketService: SMarketService, private fb: FormBuilder) {
    sMarketService.getUnitTypes().subscribe((data: UnitType[]) => {
      this.unitTypes = data;
      console.log(this.unitTypes);
    });
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      symbol: "",
      description: ""
    });

    this.myForm.valueChanges.subscribe(console.log);
  }

  onNew() {
    //this.regModel = new Registration();
    // Change submitType to 'Save'.
    this.myForm.get('symbol').setValue("");
    this.myForm.get('description').setValue("");
    this.submitType = "Save";
    // display registration entry section.
    this.showNew = true;
  }

  onSave() {
    if (this.submitType == "Save") {
      this.sMarketService.createUnitType(this.myForm.value);
      this.showNew = false;
    }
    else {
      let unitType: UnitType = this.unitTypes[this.selectedRow];
      unitType.symbol = this.myForm.get("symbol").value;
      unitType.description = this.myForm.get("description").value;
      this.sMarketService.updateUnitType(unitType.unitTypeId, unitType);
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

    let unitType:UnitType = this.unitTypes[this.selectedRow];
    this.myForm.get('symbol').setValue(unitType.symbol);
    this.myForm.get('description').setValue(unitType.description);
    console.log(unitType);
    
  }

  // This method associate to Delete Button.
  onDelete(index: number) {
    // Delete the corresponding registration entry from the list.
    //this.registrations.splice(index, 1);
    let unitType:UnitType = this.unitTypes[index];
    
    this.sMarketService.deleteUnitType(unitType.unitTypeId);
  }

  onCancel() {
    this.showNew = false;
  }
}