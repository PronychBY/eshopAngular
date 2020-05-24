import {NgModule} from "@angular/core"
import {CommonModule} from "@angular/common"
import { RouterModule } from "@angular/router";
import { AdminLayoutComponent } from './shared/admin-layout/admin-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AddPageComponent } from './add-page/add-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { OrdersPageComponent } from './orders-page/orders-page.component'
import { FormsModule } from "@angular/forms";



@NgModule({
    imports:[
        CommonModule,
        RouterModule.forChild([{
            path:'', component: AdminLayoutComponent, children:[
                {path:'', redirectTo:'/admin/login',pathMatch:'full'},
                {path:'login', component: LoginPageComponent},
                {path:'add', component: AddPageComponent},
                {path:'dashboard', component: DashboardComponent},
                {path:'product/:id/edit', component: EditPageComponent},
                {path:'orders', component: OrdersPageComponent}
            ]
        }]),
        FormsModule
    ],

    exports:[RouterModule],

    declarations: [
        AdminLayoutComponent, 
        LoginPageComponent, 
        AddPageComponent, 
        DashboardComponent, 
        EditPageComponent, 
        OrdersPageComponent
    ]
})

export class AdminModule{


}