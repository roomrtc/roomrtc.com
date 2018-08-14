import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../../services/report.service';
import { Report } from '../../../models/report.model';
declare var swal:any
declare var $:any
@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css']
})
export class ReportListComponent implements OnInit {
  //Config search pipe
  keySearch:string=''
  keySearchDraft:string=''

  //test pagination
  pdone: number = 1;
  pdraf:number=1
  collection: any[] = [
    { name: 'Jill', email: 'jill@email.com', age: 15, country: undefined, child: { state: 'Active' } },
    { name: 'Henry', email: 'henry@email.com', age: 10, country: undefined, child: { state: 'Active' } },
    { name: 'Meg', email: 'meg@email.com', age: 7, country: null, child: { state: 'Active' } },
    { name: 'Adam', email: 'adam@email.com', age: 12, country: 'United States', child: { state: 'Active' } },
    { name: 'Homer', email: 'homer@email.com', age: 47, country: '', child: { state: 'Active' } },
    { name: 'Samantha', email: 'samantha@email.com', age: 30, country: 'United States', child: { state: 'Active' } },
    { name: 'Amalie', email: 'amalie@email.com', age: 12, country: 'Argentina', child: { state: 'Active' } },
    { name: 'Estefanía', email: 'estefania@email.com', age: 21, country: 'Argentina', child: { state: 'Active' } },
    { name: 'Adrian', email: 'adrian@email.com', age: 21, country: 'Ecuador', child: { state: 'Active' } },
    { name: 'Wladimir', email: 'wladimir@email.com', age: 30, country: 'Ecuador', child: { state: 'Inactive' } },
    { name: 'Natasha', email: 'natasha@email.com', age: 54, country: 'Ecuador', child: { state: 'Inactive' } },
    { name: 'Nicole', email: 'nicole@email.com', age: 43, country: 'Colombia', child: { state: 'Inactive' } },
    { name: 'Michael', email: 'michael@email.com', age: 15, country: 'Colombia', child: { state: 'Inactive' } },
    { name: 'Nicolás', email: 'nicole@email.com', age: 43, country: 'Colombia', child: { state: 'Inactive' } }
];
  //Du lieu danh sach bao cao
  danh_sach_bao_cao=[]
  //Danh sach bao cao da trinh chieu
  reportDone:any[]=[]
  //Danh sach bao cao dang phat trien
  reportDraft:any[]=[]
  constructor(private reportServices:ReportService) { }

  ngOnInit() {
    //Lay danh sach bao cao
    this.reportServices.getAll(1).subscribe((data:any)=>{
      this.danh_sach_bao_cao=data
    })
    //Lay danh sach bao cao da trinh chieu
    this.reportServices.getReport(1,1).subscribe((data:any)=>{
      this.reportDone=data
    })
    this.reportServices.getReport(1,0).subscribe((data:any)=>{
      this.reportDraft=data
    })
    //Lay danh sach bao cao dang trien
  }
  onPreview(report,type){
    console.log(type)
    let newUrl=`http://localhost:3000/present/${type}/report/${report.id}`
    document.getElementById('test').setAttribute( 'src', newUrl);
    // document.getElementById('test').src =`http://localhost:8000/present/type1/report/${report.id}`
    document.getElementById("myNav").style.width = "100%";

  }
  closeNav(){
    // $("#test").get(0).contentWindow.print();
    // document.getElementById("test").contentWindow.print();
    console.log('dsdadsadasdsdasd')
    swal({
      title: "Bạn có muốn hoàn thành báo cáo không?",
      text: "Chú ý, bạn sẽ không thể chỉnh sửa được báo cáo sau khi đã hoàn thành!",
      icon: "warning",
      buttons: ["Tiếp tục phát triển", "Hoàn thành báo cáo"],
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        swal("Chúc mừng bạn đã hoàn thành báo cáo", {
          icon: "success"
        }).then(()=>{
          document.getElementById("myNav").style.width = "0%";
        })
      } else {
        swal("Bạn chọn tiếp tục phát triển!").then(()=>{
          document.getElementById("myNav").style.width = "0%";
        })
      }
    });

  }
  onEdit(report){

  }

}
