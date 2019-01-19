import { Routes } from "@angular/router";
import { PresentComponent } from './present.component';
import { PresentNewComponent } from './present-new/present-new.component';
export const PresentRoutes:Routes=[
    {
        path:'',
        component:PresentComponent,
        data:{
            breadcrumb:'Present'
        },
        children:[
            {
                path:'',
                redirectTo:'present-new',
                pathMatch:'full'
            },
            {
                path:'present-new',
                component:PresentNewComponent,
                data:{
                    breadcrumb:"Present-New",
                    title:"Tạo mới template trình chiếu"
                }
            }
        ]
    }
]