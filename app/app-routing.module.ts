import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { PaymentPageComponent } from './payment-page/payment-page.component';


const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children : [
      {path:'product',component:ProductPageComponent},
      {path:'payment',component:PaymentPageComponent},
      {path:'', redirectTo:'/', pathMatch:'full'},
      {path:'',component:MainPageComponent}, 
      {path:'sign-in',component:SignInComponent},
      {path:'sign-up',component:SignUpComponent},
      {path:'',component:MainPageComponent},
      {path:'cart',component:CartPageComponent}
    ]
  },
  {
    path:'admin', loadChildren:()=>import('./admin/admin.module').then(m=>m.AdminModule)
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

 }
