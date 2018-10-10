import { ProductTypeComponent } from './components/product-type/product-type.component';
import { UnitTypeComponent } from './components/unit-type/unit-type.component';
import { RouterModule,Routes} from '@angular/router';
import { ProductComponent } from './components/product/product.component';
import { CreateProductComponent } from './components/product/create-product/create-product.component';
import { ProductDetailComponent } from './components/product/product-detail/product-detail.component';
import { EditProductComponent } from './components/product/edit-product/edit-product.component';
const APP_ROUTES: Routes = [

    {path: 'products',component: ProductComponent},
    {path: 'products/create',component: CreateProductComponent},
    {path: 'products-detail',component: ProductDetailComponent},
    {path: 'product-edit',component: EditProductComponent},
    {path: 'unit-type',component: UnitTypeComponent},
    {path: 'product-type',component: ProductTypeComponent},
    /*{path: 'heroes',component: HeroesComponent},
    {path: 'heroe/:id',component: HeroeComponent},
    {path: 'about',component: AboutComponent},
    {path: 'searchHero/:termino',component: SearchHeroComponent},*/
    {path: '**',pathMatch:'full',redirectTo:''},
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);