import { NoimagePipe } from './pipes/noimage.pipe';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { APP_ROUTING } from './app.routes';
import { ProductComponent } from './components/product/product.component';
import { SMarketService } from './services/smarket.service';
import { UnitTypeComponent } from './components/unit-type/unit-type.component';
import { ProductTypeComponent } from './components/product-type/product-type.component';

import {ReactiveFormsModule} from '@angular/forms';
import { CreateProductComponent } from './components/product/create-product/create-product.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProductComponent,
    NoimagePipe,
    UnitTypeComponent,
    ProductTypeComponent,
    CreateProductComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    APP_ROUTING,
    ReactiveFormsModule,
  ],
  providers: [SMarketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
