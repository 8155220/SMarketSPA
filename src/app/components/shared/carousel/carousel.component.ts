import { SMarketService } from './../../../services/smarket.service';
import { Product } from './../../../models/product';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgbCarouselConfig,NgbCarousel } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
 // @Input()
  lastProducts:Product[]=[];
  @ViewChild('myCarousel') myCarousel:NgbCarousel;
  constructor(public config: NgbCarouselConfig,public sMarketservice:SMarketService) {
    // customize default values of carousels used by this component tree
    
  }
  ngOnInit() {
    this.getLastProduct();
    this.config.interval = 2000;
    this.config.wrap = true;
    this.config.keyboard = false;
    this.config.pauseOnHover = false;
    // if(this.lastProducts && this.myCarousel)
    // this.myCarousel.next;
    console.log(this.myCarousel);
    
  }

  getLastProduct() {
    this.sMarketservice.getLastProducts().subscribe((e: any[]) => {
      this.lastProducts = e;

    });
  }

}
