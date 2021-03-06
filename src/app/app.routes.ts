import { NoteIndexComponent } from './components/note/note-index/note-index.component';
import { NoteDetailComponent } from './components/note/note-detail/note-detail.component';
import { NoteAddComponent } from './components/note/note-add/note-add.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { HomeComponent } from './components/shared/home/home.component';
import { ProductTypeComponent } from './components/product-type/product-type.component';
import { UnitTypeComponent } from './components/unit-type/unit-type.component';
import { RouterModule,Routes} from '@angular/router';
import { ProductComponent } from './components/product/product.component';
import { CreateProductComponent } from './components/product/create-product/create-product.component';
import { ProductDetailComponent } from './components/product/product-detail/product-detail.component';
import { EditProductComponent } from './components/product/edit-product/edit-product.component';
import { SelectImageComponent } from './components/shared/select-image/select-image.component';
import { NoteInformationComponent } from './components/note/note-information/note-information.component';
const APP_ROUTES: Routes = [

    {path: 'notes/detail',component: NoteInformationComponent},
    {path: 'notes',component: NoteIndexComponent},
   // {path: 'notes/detail',component: NoteDetailComponent},
    {path: 'notes/add',component: NoteAddComponent},
    {path: 'contact-us',component: ContactUsComponent},
    {path: 'home',component: HomeComponent},
    {path: 'products',component: ProductComponent},
    {path: 'select',component: SelectImageComponent},
    {path: 'products/create',component: CreateProductComponent},
    {path: 'products-detail',component: ProductDetailComponent},
    {path: 'product-edit',component: EditProductComponent},
    {path: 'unit-type',component: UnitTypeComponent},
    {path: 'product-type',component: ProductTypeComponent},
    /*{path: 'heroes',component: HeroesComponent},
    {path: 'heroe/:id',component: HeroeComponent},
    {path: 'about',component: AboutComponent},
    {path: 'searchHero/:termino',component: SearchHeroComponent},*/
    {path: '**',pathMatch:'full',redirectTo:'home'},
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);