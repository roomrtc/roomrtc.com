import { Routes } from "@angular/router";
import { CategoryComponent } from './category.component';
import { CategoryNewComponent } from './category-new/category-new.component';
export const CategoryRoutes:Routes=[
    {
        path:'',
        component:CategoryComponent,
        data:{
            breadcrumb:'Category'
        },
        children:[
            {
                path:'',
                redirectTo:'category-new',
                pathMatch:'full'
            },
            {
                path:'category-new',
                component:CategoryNewComponent,
                data:{
                    breadcrumb:"Category-New",
                    title:"Tạo mới hạng mục"
                }
            }
        ]
    }
]