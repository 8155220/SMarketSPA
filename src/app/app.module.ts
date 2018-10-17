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
import { FormsModule }   from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import { CreateProductComponent } from './components/product/create-product/create-product.component';
import { NgbModule  } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';
import { ProductDetailComponent } from './components/product/product-detail/product-detail.component';
import { EditProductComponent } from './components/product/edit-product/edit-product.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { HomeComponent } from './components/shared/home/home.component';
import { CarouselComponent } from './components/shared/carousel/carousel.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { NoteAddComponent } from './components/note/note-add/note-add.component';
import { NoteDetailComponent } from './components/note/note-detail/note-detail.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { NoteIndexComponent } from './components/note/note-index/note-index.component';
import { NoteInformationComponent } from './components/note/note-information/note-information.component';
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
    CarouselComponent,
    ContactUsComponent,
    NoteAddComponent,
    NoteDetailComponent,
    NoteIndexComponent,
    NoteInformationComponent
    
  ],
  imports: [
    BrowserAnimationsModule ,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    APP_ROUTING,
    ReactiveFormsModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    NgxQRCodeModule,
  ],
  providers: [SMarketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
