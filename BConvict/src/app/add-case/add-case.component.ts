import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-add-case',
  templateUrl: './add-case.component.html',
  styleUrls: ['./add-case.component.css']
})
export class AddCaseComponent {
  @Input() showSave: boolean = true;
  @Input() fir_id: any;

  add_fir_id:any ='';
  caseForm: any;
  profile: any;
  ifAdd: boolean;
  Record: any;
  caseError : string | undefined;
  dyForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, private http: HttpClient, private localStorage: LocalStorageService) {
    this.profile = localStorage.fetchProfile();

    this.ifAdd = (this.profile.role == 'Police') ? true : false;
    //console.log(this.ifAdd);

    this.localStorage.curr_profile.subscribe(res => {
      this.profile = res;
      this.ifAdd = (this.profile.role == 'Police') ? true : false;
    });

    this.fir_id = this.route.snapshot.paramMap.get('id');
    this.add_fir_id = this.route.snapshot.paramMap.get('add_fir_id');

    if (this.fir_id) {
      this.changeRecord(this.fir_id);
    } else {
      if (!this.ifAdd) {
        this.router.navigate(['mydashboard']);
      }
      else{
        this.generateRecord();
      }
    }
  }
  generateRecord() {
    this.Record = [{
      fir_id : this.add_fir_id,
      Arrest_Information: "",
      Bail_Information: "",
      Case_Description: "",
      Case_Title: "",
      Case_id: '',
      Charge_Information: "", Court_Information: "",
      Status_case: "",
    }]
    //console.log(this.Record);
    this.createForm(this.add_fir_id);
  }

  ngOnInit(): void {
  }

  createForm(id :any) {
    for (var each in this.Record) {
      var group = new FormGroup({});
      var Case_id = new FormControl(this.Record[each].Case_id);
      group.addControl('Case_id', Case_id);

      // var fir_id = new FormControl(this.Record[each].fir_id);
      var fir_id = new FormControl(id);
      group.addControl('fir_id', fir_id);

      var Case_Title = new FormControl(this.Record[each].Case_Title)
      group.addControl('Case_Title', Case_Title);
      var Case_Status = new FormControl(this.Record[each].Status_case);
      group.addControl('Case_Status', Case_Status);
      var Case_Description = new FormControl(this.Record[each].Case_Description);
      group.addControl('Case_Description', Case_Description);
      var Bail_Information = new FormControl(this.Record[each].Bail_Information);
      group.addControl('Bail_Information', Bail_Information);
      var Charge_Information = new FormControl(this.Record[each].Charge_Information);
      group.addControl('Charge_Information', Charge_Information);
      var Arrest_Information = new FormControl(this.Record[each].Arrest_Information);
      group.addControl('Arrest_Information', Arrest_Information);
      var Court_Information = new FormControl(this.Record[each].Court_Information);
      group.addControl('Court_Information', Court_Information);

      this.dyForm.addControl(each, group);

    }

  }
 
  returnFormValue() {
    return this.dyForm.value;
  }

  onSubmit() {
    var data = 'http://127.0.0.1:5000/addcase/' + "'" + JSON.stringify(this.dyForm.value) + "'";
    console.log(data);
    this.http.get<any>(data)
      .subscribe(
        (res: any) => {

          const status = res['status'];

          if (res.status == 'success') {

            this.caseError = "Case added successfully!";
             
          }
          else {
            alert("somthing wrong in request");
          }
        },
        (error) => {
          console.error(error);
        });

  }

  changeRecord(fir_id: any) {

    var data = 'http://127.0.0.1:5000/showforms/' + "'" + JSON.stringify(fir_id) + "'";
    // console.log(data);
    this.http.get<any>(data)
      .subscribe(
        (res: any) => {

          const status = res['status'];

          if (res.status == 'success') {
            this.Record = res.caseRecord;
            console.log(this.Record);
            this.createForm(fir_id);

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
