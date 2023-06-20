import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-add-evidence',
  templateUrl: './add-evidence.component.html',
  styleUrls: ['./add-evidence.component.css']
})
export class AddEvidenceComponent {
  @Input() showSave: boolean = true;
  @Input() fir_id: any;

  evidenceForm: any;
  profile: any;
  ifAdd: boolean;
  add_fir_id:any ='';
  Record: any; 
  evidencError : string | undefined;
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
    // console.log(this.fir_id);

    if (this.fir_id) {
      // console.log(this.fir_id);
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
      Analysis_Results: "",
      Condition: "",
      Description: "",
      Evidence_Type: "",
      Evidence_ID: '',
      Disposition: "", Date_Collected: "",
      Custody: "",

    }]
    console.log(this.Record);
    this.createForm(this.add_fir_id);
  }

  ngOnInit(): void { }

  createForm(id : any ) {
    for (var each in this.Record) {
      var group = new FormGroup({});
      var Evidence_id = new FormControl(this.Record[each].Evidence_ID);
      group.addControl('Evidence_id', Evidence_id);

      // var fir_id = new FormControl(this.Record[each].fir_id);
      // group.addControl('fir_id', fir_id);

      var fir_id = new FormControl(id);
      group.addControl('fir_id', fir_id);

      var Evidence_Type = new FormControl(this.Record[each].Evidence_Type)
      group.addControl('Evidence_Type', Evidence_Type);
      var Custody = new FormControl(this.Record[each].Custody);
      group.addControl('Custody', Custody);
      var Evidence_Description = new FormControl(this.Record[each].Description);
      group.addControl('Evidence_Description', Evidence_Description);
      var Date_Collected = new FormControl(this.Record[each].Date_Collected);
      group.addControl('Date_Collected', Date_Collected);
      var Condition = new FormControl(this.Record[each].Condition);
      group.addControl('Condition', Condition);
      var Analysis_Results = new FormControl(this.Record[each].Analysis_Results);
      group.addControl('Analysis_Results', Analysis_Results);
      var Disposition = new FormControl(this.Record[each].Disposition);
      group.addControl('Disposition', Disposition);

      this.dyForm.addControl(each, group);

    }
  }


  returnFormValue() {

    return this.dyForm.value;
  }

  onSubmit() {

    var data = 'http://127.0.0.1:5000/addEvidence/' + "'" + JSON.stringify(this.dyForm.value) + "'";
    console.log(data);
    this.http.get<any>(data)
      .subscribe(
        (res: any) => {

          const status = res['status'];

          if (res.status == 'success') {

            this.evidencError = " Evidence added successfully! ";
            // alert("done");

      
          }
          else {
            this.evidencError = "somthing wrong in request";
          }
        },
        (error) => {
          console.error(error);
        });

  }

  changeRecord(fir_id: any) {

    var data = 'http://127.0.0.1:5000/showforms/' + "'" + JSON.stringify(fir_id) + "'";
    console.log(data);
    this.http.get<any>(data)
      .subscribe(
        (res: any) => {

          const status = res['status'];

          if (res.status == 'success') { 
            this.Record = res.evidenceRecord;
            this.createForm(fir_id);
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
