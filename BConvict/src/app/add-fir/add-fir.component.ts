import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LocalStorageService } from '../services/local-storage.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-fir',
  templateUrl: './add-fir.component.html',
  styleUrls: ['./add-fir.component.css']
})
export class AddFirComponent {

  @Input() showSave: boolean = true;
  @Input() fir_id: any;
  

  firForm: any;
  Record: any;
  // @Input() constant: any;
  private profile: any;
  ifAdd: boolean = false;
  pro_id : any ;
  FIRError : string | undefined;


  constructor(private formBuilder: FormBuilder,private router:Router,private route: ActivatedRoute, private http: HttpClient, private localStorage: LocalStorageService) {
    this.profile = localStorage.fetchProfile();

    this.ifAdd = (this.profile.role == 'Police') ? true : false;
    this.pro_id = this.profile.sys_id; 
    //console.log(this.ifAdd);
    this.localStorage.curr_profile.subscribe(res => {
      this.profile = res;
      this.ifAdd = (this.profile.role == 'Police') ? true : false;
    });
    
    this.fir_id = this.route.snapshot.paramMap.get('id');
    if (this.fir_id) {
      
      this.changeFirRecord(this.fir_id);
  
    }else{
      if(!this.ifAdd)
      {
        this.router.navigate(['mydashboard']);
      }
    }
  }

  ngOnInit(): void {
    //console.log(this.Record);
    this.firForm = this.formBuilder.group({
      User_ID:[''],
      police_id:[''],
      fir_id: [''],
      Status: [''],
      Offence: [''],
      Offence_Date: [''],
      Police_Station: [''],
      Description: [''],
      Created_At: [''],
      Updated_At: ['']
    });
    this.firForm.controls['Created_At'].disable();
    this.firForm.controls['Updated_At'].disable();
  } 

  setFormValue() {
    this.firForm.controls['fir_id'].setValue(this.Record.sys_FIR_id);
    this.firForm.controls['fir_id'].disable();
    this.firForm.controls['Status'].setValue(this.Record.status);
    this.firForm.controls['Offence'].setValue(this.Record.offence);
    this.firForm.controls['Offence_Date'].setValue(this.Record.offence_date);
    this.firForm.controls['Police_Station'].setValue(this.Record.police_station);
    this.firForm.controls['Description'].setValue(this.Record.description);
    this.firForm.controls['Created_At'].setValue(this.Record.created_at);
    this.firForm.controls['Updated_At'].setValue(this.Record.updated_at);
    this.firForm.controls['Created_At'].disable();
    this.firForm.controls['Updated_At'].disable();
    if(!this.ifAdd){
      this.firForm.controls['Status'].disable();
      this.firForm.controls['Offence'].disable();
      this.firForm.controls['Offence_Date'].disable();
      this.firForm.controls['Police_Station'].disable();
      this.firForm.controls['Description'].disable();
    }
  }

  returnFormValue(){

    this.firForm.value['fir_id'] = this.Record.sys_FIR_id;
    return this.firForm.value;
  }
  onSubmit(){

    this.firForm.value['police_id'] = this.pro_id;

    var data = 'http://127.0.0.1:5000/addfir/' + "'" + JSON.stringify(this.firForm.value) + "'";
    console.log(data);
    this.http.get<any>(data)
      .subscribe(
        (res: any) => {

          const status = res['status'];

          if (res.status == 'success') {

            this.FIRError = " FIR added successfully! ";
            // this.Record = res.firRecord[0];
            // this.setFormValue();
          }
          else {
            alert("somthing wrong in request");
          }
        },
        (error) => {
          console.error(error);
        }); 
  }

  changeFirRecord(fir_id: any) {

    var data = 'http://127.0.0.1:5000/showforms/' + "'" + JSON.stringify(fir_id) + "'";
    //console.log(data);
    this.http.get<any>(data)
      .subscribe(
        (res: any) => {

          const status = res['status'];

          if (res.status == 'success') {
            
            this.Record = res.firRecord[0];
            this.setFormValue();
            //alert("Saved!");
          }
          else {
            alert("somthing wrong in request");
          }
        },
        (error) => {
          console.error(error);
        });

  }

}
