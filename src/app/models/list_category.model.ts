import { Category } from "./catergory.model";

export class ListCategory {
    public id:number
    public ten_hang_muc:string
    public danh_sach_hang_muc:Category[]
    constructor() {
        this.danh_sach_hang_muc=[]
    }
}