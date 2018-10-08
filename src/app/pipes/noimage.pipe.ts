import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noimage'
})
export class NoimagePipe implements PipeTransform {

  /*transform(images:any[]): string {
    if(!images){
      return 'assets/img/noimage.png';
    }
    return (images.length>0) ? images[0].url :  'assets/img/noimage.png';
  }*/
  transform(images:string): string {
    if(!images){
      return 'assets/img/noimage.png';
    }
    return (images.length>0) ? images :  'assets/img/noimage.png';
  }

}
