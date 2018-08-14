import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';
import { Category } from '../../../models/catergory.model';
import { CategoryService } from '../../../services/category.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-category-new',
  templateUrl: './category-new.component.html',
  styleUrls: ['./category-new.component.css']
})
export class CategoryNewComponent implements OnInit {

  //Config validation form
  categoryForm : FormGroup
  //Config select category
  selectedCategory:any
  DanhSachHangMucCha:Category[]
  //Config loading
  isLoading=false

  constructor(private categoryServices:CategoryService,private fb:FormBuilder,private location:Location) {
    this.createForm()
  }

  ngOnInit() {
    this.categoryServices.getItemsGroup().subscribe((item:any)=>{
      console.log(item)
      this.DanhSachHangMucCha=item.map((ctg)=>{
        let newCategory=new Category()
        newCategory.id=ctg.id
        newCategory.ten_hang_muc=ctg.ten_hang_muc,
        newCategory.idItemParent=null
        return newCategory
      })
    })
  }

  getErrorMessage() {

  }

  createForm(){
    this.categoryForm=this.fb.group({
      code: [''],
      ten_hang_muc :['',Validators.required],
      ghi_chu:[''],
      hang_muc_cha:[]
    })
  }

  handleBack(){
    this.location.back()
  }

  onSubmit(){
    let newCategory=this.prepareSaveCategory();
  }

  prepareSaveCategory(){
    const formModel=this.categoryForm.value
    this.categoryForm.reset()
    this.isLoading=true
    this.categoryServices.saveItem(formModel).subscribe((response)=>{
      setTimeout(() => {
        this.isLoading=false
      }, 2000);
    })

  }
}
