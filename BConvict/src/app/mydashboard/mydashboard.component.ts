
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';
import { FirFilter, MyDashboardResponse, Table } from '../constant/constant';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-mydashboard',
  templateUrl: './mydashboard.component.html',
  styleUrls: ['./mydashboard.component.css']
})
export class MydashboardComponent {
  private profile: any;
  public resp: MyDashboardResponse = new MyDashboardResponse();
  firRecord: any;
  firConstant: Table = new Table();
  options: FirFilter = new FirFilter();
  ifAdd:boolean = false;


  constructor(private formBuilder: FormBuilder, private http: HttpClient, private localStorage: LocalStorageService) {

    this.profile = localStorage.fetchProfile();
    this.ifAdd = (this.profile.role == 'Police') ? true : false;
    
    this.localStorage.curr_profile.subscribe(res =>{ 
      this.profile = res;
      this.ifAdd = (this.profile.role == 'Police') ? true : false;
    });

  }

  ngOnInit(): void {  

    var data = this.resp.data;
    data.sys_user_id = this.profile.sys_id;

    this.changeFirRecord(data);
  }

  getFilterValue(data: any) {
    var temp = this.resp.data;
    temp.sys_user_id = this.profile.sys_id;
    temp.filter = data;
    this.changeFirRecord(temp);
  }

  changeFirRecord(data: any) {

    var url = 'http://127.0.0.1:5000/myDashboard/' + "'" + JSON.stringify(data) + "'";
    this.http.get<any>(url).subscribe((res: any) => {


      if (res.status == 'success') {
        this.firRecord = res.firRecord;
      }
      else{
        alert("somthing wrong in request");
      }
    },
      (error) => {
        console.error(error);
      });

  }


}
