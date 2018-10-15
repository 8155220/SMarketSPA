import { SelectImageComponent } from './components/shared/select-image/select-image.component';
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
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';
import { ProductDetailComponent } from './components/product/product-detail/product-detail.component';
import { EditProductComponent } from './components/product/edit-product/edit-product.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { HomeComponent } from './components/shared/home/home.component';
import { CarouselComponent } from './components/shared/carousel/carousel.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProductComponent,
    NoimagePipe,
    UnitTypeComponent,
    ProductTypeComponent,
    CreateProductComponent,
    ProductDetailComponent,
    EditProductComponent,
    SelectImageComponent,
    FooterComponent,
    HomeComponent,
    CarouselComponent
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    APP_ROUTING,
    ReactiveFormsModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
  ],
  providers: [SMarketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
