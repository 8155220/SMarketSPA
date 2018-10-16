export class UnitType {
    unitTypeId:number;
    symbol:string;
    description:string;


    constructor(){
      
    }
    getSymbolDescription():string{
      return this.symbol +" "+this.description;
    }
  }
  