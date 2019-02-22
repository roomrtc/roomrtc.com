/**
 * Hạng mục, nhóm hạng mục
 */
export class Category {

  public id: String | Number;
  public idItem?: String | Number;
  public idItemParent?: String | Number;
  public ten_hang_muc: String;
  public ten_khong_dau?: String;
  public code?: String;
  public ket_qua?: String; // TODO: rename to noi_dung

  public parent?: Category;

  constructor() {
    this.ket_qua = '';
  }
}
