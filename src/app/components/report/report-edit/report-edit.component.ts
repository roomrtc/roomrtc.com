import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';


import { ReportService } from '../../../services/report.service';
import { ListCategory } from '../../../models/list_category.model';
import { CategoryService } from '../../../services/category.service';
import * as _ from "lodash";
import { Category } from '../../../models/catergory.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Report } from '../../../models/report.model';

@Component({
  selector: 'app-report-edit',
  templateUrl: './report-edit.component.html',
  styleUrls: ['./report-edit.component.css']
})
export class ReportEditComponent implements OnInit {

  //Config form
  reportForm: FormGroup;
  //Config select
  Demo = [{
      id: 19,
      ten_hang_muc: 'Tổng số khám',
      parent: {
        id: 2,
        ten_hang_muc: 'Thống kê bệnh nhân'
      }
    },
    {
      id: 20,
      ten_hang_muc: "Viện phí",
      parent: {
        id: 2,
        ten_hang_muc: "Thống kê bệnh nhân"
      }
    }
  ];
  DuLieuSelect = [];
  DanhSachSelected = [];
  //Config loading
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private reportServices: ReportService,
    private categoryServices: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {

    this.createForm()
    this.categoryServices.getDataSelect().subscribe((data: any) => {
      this.DuLieuSelect = data
    })
  }

  ngOnInit() {
    //Truyen gia tri khoi tao cho form
    this.route.params.subscribe((params) => {
      let currentReport = new Report()
      currentReport.id = params.id
      this.reportForm.addControl('id', new FormControl(params.id));
      this.reportServices.getItem(currentReport.id).subscribe((data) => {
        if (_.toInteger(data.status)) {
          return this.router.navigate(['dashboard/report-list']);
        }
        this.reportForm.controls['tieu_de_bao_cao'].setValue(data.tieu_de_bao_cao)
        this.reportForm.controls['ten_nguoi_bao_cao'].setValue(data.ten_nguoi_bao_cao)
        this.reportForm.controls['ghi_chu'].setValue(data.ghi_chu)
        this.reportForm.controls['ngay_bao_cao'].setValue(data.ngay_bao_cao)
        this.reportForm.controls['is_template'].setValue(data.is_template)

        // Xử lý thông tin hạng mục báo cáo
        let dataSourceSelected = data.items.map((item) => {
          return {
            id: item.idItem,
            ten_hang_muc: item.itemDetail.ten_hang_muc,
            parent: {
              id: item.idItemParent,
              ten_hang_muc: item.itemParent.ten_hang_muc
            }
          }
        })

        this.reportForm.controls['select_hang_muc'].setValue(dataSourceSelected);
        //Lay thong tin hang muc them vao hang muc cua report created
        let danh_sach_nhom_hang_muc = _.groupBy(data.items, 'idItemParent');
        _.each(danh_sach_nhom_hang_muc, (element, i) => {
          let newListCategory = new ListCategory();
          newListCategory.id = element[0].idItemParent;
          newListCategory.ten_hang_muc = element[0].itemParent.ten_hang_muc;
          element.forEach(child => {
            let newCategory = new Category();
            newCategory.id = child.id;
            newCategory.idItem = child.idItem;
            newCategory.ten_hang_muc = child.itemDetail.ten_hang_muc;
            newCategory.idItemParent = child.idItemParent;
            newCategory.ket_qua = child.ket_qua;
            newListCategory.danh_sach_hang_muc.push(newCategory);
          });
          this.DanhSachSelected.push(newListCategory)
        });

      })

    })
  }

  groupByFn (item) {
    return item.parent.ten_hang_muc;
  }

  selectedAccounts5Fn = (item, selected) => {
    if (selected.id && item.id) {
      return item.id === selected.id;
    }

    return false;
  };

  handleAdd(event) {
    //Chon hang muc con
    if (event.id) {
      //Neu la lan dau tien thi tao ca nhom
      let newCategory = new Category()
      newCategory.id = event.id;
      newCategory.ten_hang_muc = event.ten_hang_muc;
      newCategory.idItem = event.id;
      newCategory.idItemParent = event.id;
      let check = _.findIndex(this.DanhSachSelected, function (o) {
        return o.id == event.parent.id;
      });
      if (check >= 0) {
        //Co hang listCategory roi
        this.DanhSachSelected[check].danh_sach_hang_muc.push(newCategory)
      } else {
        //Chua co listCategory
        let newListCategory = new ListCategory()
        newListCategory.id = event.parent.id
        newListCategory.ten_hang_muc = event.parent.ten_hang_muc
        newListCategory.danh_sach_hang_muc.push(newCategory)
        this.DanhSachSelected.push(newListCategory)
      }
    } else {
      //Chon hang muc cha
      //B1 Lay cac hang muc con theo hang muc cha
      let temp = this.DuLieuSelect.filter((element) => {
        return element.parent.ten_hang_muc == event.ten_hang_muc
      }).map((result) => {
        let newCategory = new Category();
        newCategory.id = result.id;
        newCategory.ten_hang_muc = result.ten_hang_muc;
        newCategory.idItem = result.id;
        newCategory.idItemParent = result.parent.id;
        return newCategory
      })
      //B2: Kiem tra listCategory da co chua
      let check = _.findIndex(this.DanhSachSelected, function (o) {
        return o.id == temp[0].idItemParent
      });
      if (check >= 0) {
        //Co hang listCategory roi
        this.DanhSachSelected[check].danh_sach_hang_muc = temp
      } else {
        //Chua co listCategory
        let newListCategory = new ListCategory()
        newListCategory.id = temp[0].idItemParent
        newListCategory.ten_hang_muc = event.ten_hang_muc
        newListCategory.danh_sach_hang_muc = temp
        this.DanhSachSelected.push(newListCategory)
      }
    }
  }

  //Xu ly khi clear select
  handleClear() {
    this.DanhSachSelected = []
  }

  //Xu ly khi nguoi dung remove tung tag
  handleRemove(event) {
    console.log(event)
    //Truong hop remove hang muc con
    let value = event.value
    if (value.id) {
      this.deleteChild(value)
    } else {
      console.log(event)
      let tmp = this.reportForm.controls['select_hang_muc'].value

      _.remove(this.DanhSachSelected, (current) => {
        return current.ten_hang_muc == value.ten_hang_muc
      })
    }
  }

  //Sự kiện khi người dùng xoa các tag con
  deleteChild(hangMuc) {
    console.log(hangMuc)
    //Find hang muc cha
    let temp = this.DanhSachSelected.find((element) => {
      return element.ten_hang_muc == hangMuc.parent.ten_hang_muc
    })
    console.log(temp)
    _.remove(temp.danh_sach_hang_muc, (current: any) => {
      return current.id == hangMuc.id
    })
    //Xet truong hop da xoa het item trong mot nhom hang muc thi xoa luon ca nhom hang muc
    console.log(temp)
    if (!temp.danh_sach_hang_muc.length) {
      _.remove(this.DanhSachSelected, (current) => {
        return current.ten_hang_muc == temp.ten_hang_muc
      })
    }
  }

  //Xu li su kien nguoi dung click vao dau x de xoa hang muc
  handleDeleteHangMucControl(value, idGroup) {
    // this.selectedHangMuc=[{ id: 19, ten_hang_muc: "Tổng số khám", group: { id: 2, ten_hang_muc: "Thống kê bệnh nhân" } }]
    //Lay danh sach selected trong controll
    let select_hang_mucControll = this.reportForm.controls['select_hang_muc'].value
    //Xoa hang muc selected
    _.remove(select_hang_mucControll, (current: any) => {
      return current.id == value.id
    })
    this.reportForm.controls['select_hang_muc'].setValue(select_hang_mucControll)
    //Find hang muc cha
    let temp = this.DanhSachSelected.find((element: any) => {
      return element.id == idGroup
    })
    _.remove(temp.danh_sach_hang_muc, (current: any) => {
      return current.id == value.id
    })
    //Xet truong hop da xoa het item trong mot nhom hang muc thi xoa luon ca nhom hang muc
    if (!temp.danh_sach_hang_muc.length) {
      _.remove(this.DanhSachSelected, (current: any) => {
        return current.ten_hang_muc == temp.ten_hang_muc
      })
      //Xoa luon tag group
      _.remove(select_hang_mucControll, (current: any) => {
        return current.ten_hang_muc == temp.ten_hang_muc
      })
      this.reportForm.controls['select_hang_muc'].setValue(select_hang_mucControll)

    }
  }

  createForm() {
    this.reportForm = this.fb.group({
      tieu_de_bao_cao: ['', Validators.required],
      ten_nguoi_bao_cao: ['', Validators.required],
      ghi_chu: [''],
      select_hang_muc: [],
      ngay_bao_cao: [],
      is_template: []
    })
  }

  onSubmit() {
    console.log('submit')
    let prepearModel = this.reportForm.value
    this.reportForm.reset()
    this.isLoading = true
    prepearModel.select_hang_muc = this.DanhSachSelected
    this.reportServices.updateReport(prepearModel).subscribe((response: any) => {
      setTimeout(() => {
        this.isLoading = false
        // this.DanhSachSelected=[]
        this.router.navigate(['dashboard/report-list']);
      }, 2000);
    })

  }

}
