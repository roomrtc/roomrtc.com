export class Category{
    public id:number
    public ten_hang_muc:string
    public ten_khong_dau:string
    public code:string
    public idHangMucParent:number
    public ket_qua:string
    constructor(){
        this.ket_qua=""
    }
}