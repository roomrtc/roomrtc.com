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
  danh_sach_bao_cao=[]
  
  constructor(private reportServices:ReportService) { }

  ngOnInit() {
    //Lay danh sach bao cao
    this.reportServices.getAll(1).subscribe((data:any)=>{
      this.danh_sach_bao_cao=data
    })
  }
  onPreview(report){
    document.getElementById('test').setAttribute( 'src', `http://localhost:8000/present/type1/report/${report.id}` );
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
