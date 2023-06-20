import { HttpClient } from '@angular/common/http';
import { Component, ViewChild} from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';
import { AddFirComponent } from '../add-fir/add-fir.component';
import { AddCaseComponent } from '../add-case/add-case.component';
import { AddEvidenceComponent } from '../add-evidence/add-evidence.component';

@Component({
  selector: 'app-show-forms',
  templateUrl: './show-forms.component.html',
  styleUrls: ['./show-forms.component.css'],
})
export class ShowFormsComponent {
  private profile: any;
  showForm: any;
  fir_id:any;
  addfirr :any;
  addcasee :any;
  addevidencee: any;
  FormError : string | undefined; 
  case: boolean = false;
  edv: boolean = false;
  fir: boolean = false;

  ifAdd:boolean = false;
  @ViewChild(AddFirComponent) addfir:AddFirComponent | undefined;
  @ViewChild(AddCaseComponent) addcase:AddCaseComponent | undefined;
  @ViewChild(AddEvidenceComponent) addevidence:AddEvidenceComponent | undefined;

  constructor(private formBuilder : FormBuilder, private route: ActivatedRoute , private http: HttpClient, private localStorage: LocalStorageService){
    this.profile = localStorage.fetchProfile();
    this.ifAdd = (this.profile.role == 'Police') ? true : false;
    
    this.localStorage.curr_profile.subscribe(res =>{ 
      this.profile = res;
      this.ifAdd = (this.profile.role == 'Police') ? true : false;
    });

    
  }
  
  ngOnInit(): void{
  this.showForm = this.formBuilder.group({
    addfir:'',
    addCase :'',
    addEvidence :''
  });

  console.log(this.route.snapshot.paramMap.get('id'));

  this.fir_id = this.route.snapshot.paramMap.get('id');

  }

  UpdateFir(addfirr :any ){

    var url = 'http://127.0.0.1:5000/updatefir/'+"'"+JSON.stringify(addfirr)+"'";

    // alert(url);
   
    console.log(url);
    this.http.get<any>(url) 
    .subscribe(
      (res: any) => { 
        
        const status = res['status'];
        
        if (res.status == 'success') {

          this.fir = true;

        }
        else{
          alert("somthing wrong in request of fir");
        }
    },
      (error) => {
        console.error(error);
      });
    
  }

  UpdateCasee(addcasee : any){

    var url = 'http://127.0.0.1:5000/Updatecasee/'+"'"+JSON.stringify(addcasee)+"'";

    console.log(url);

    this.http.get<any>(url) 
    .subscribe(
      (res: any) => { 
        
        const status = res['status'];
        
        if (res.status == 'success') {
          this.case =true;
        }
        else{
          alert("somthing wrong in request of case");
        }
    },
      (error) => {
        console.error(error);
      });

  }

  UpdateEvidencee(addevidencee : any){ 

    var url = 'http://127.0.0.1:5000/Updateevidencee/'+"'"+JSON.stringify(addevidencee)+"'";
   
    console.log(url);
    this.http.get<any>(url) 
    .subscribe(
      (res: any) => { 
        
        const status = res['status'];
        
        if (res.status == 'success') {
          this.edv = true;
        }
        else{
          alert("somthing wrong in request of evidence");
        }
    },
      (error) => {
        console.error(error);
      });

  }

  onSubmit(){

    // console.log(this.addfir?.returnFormValue());
    // console.log(this.addcase?.returnFormValue());
    // console.log(this.addevidence?.returnFormValue());

    this.addfirr = this.addfir?.returnFormValue();
    this.addcasee = this.addcase?.returnFormValue();
    this.addevidencee = this.addevidence?.returnFormValue();

    this.UpdateFir(this.addfirr);
    this.UpdateCasee(this.addcasee);
    this.UpdateEvidencee(this.addevidencee);
    this.FormError = " changes saved successfully! ";

    // if (this.case|| this.edv || this.fir ) {

    //   this.FormError = " changes saved successfully! ";

    // }
    // else {
    //   this.FormError = "somthing went wrong !";
    // }
    alert("changes saved successfully!")

  }
  ngOnDestroy() {
    
  }
}
