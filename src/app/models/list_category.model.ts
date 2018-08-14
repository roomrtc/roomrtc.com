import { Category } from "./catergory.model";

export class ListCategory {
    public id: String;
    public ten_hang_muc: String;
    public danh_sach_hang_muc:Category[];
    constructor() {
        this.danh_sach_hang_muc=[]
    }
}
