import {Injectable} from '@angular/core'
export interface MainMenuItems{
    state:string
    name:string
    type:string
    icon:string
}
export interface Menu{
    label:string
    main:MainMenuItems[]
}
const MENU_ITEMS=[
    {
        label:"QUẢN LÝ BÁO CÁO",
        main:[
            {
                state:'dashboard',
                name:'Danh sách báo cáo',
                type:'link',
                icon:'ti-home'
            }
        ]
    },
    {
        label:"QUẢN LÝ HẠNG MỤC",
        main:[
            {
                state:'category',
                name:"Tạo mới hạng mục",
                type:"link",
                icon:'ti-home'
            }
        ]
    },
    {
        label:"QUẢN LÝ TRÌNH CHIẾU",
        main:[
            {
                state:'present',
                name:"Tạo mới trình chiếu",
                type:"link",
                icon:'ti-home'
            }
        ]
    }
]
@Injectable()
export class MenuItems{
    getAll():any{
        return MENU_ITEMS
    }
}
