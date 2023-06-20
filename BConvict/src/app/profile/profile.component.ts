import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { LocalStorageService } from '../services/local-storage.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
  
})
export class ProfileComponent {
  
  public profile: any;
  public userDataForm !: FormGroup;
  public user_data: string | null = null;
  profileForm: any;
  router: any;
  public profileError: string | undefined;

  constructor(private formBuilder : FormBuilder,private localStorage: LocalStorageService ,private authService :AuthService, private http: HttpClient, ) {
    
    this.profile = localStorage.fetchProfile();
    this.authService.authPipe.subscribe(res =>{
      if(res == true){
        this.profile = res;
      }
    });
  }

  ngOnInit(): void{
    this.profileForm = this.formBuilder.group({
      username:new FormControl({value:this.checkPresent(this.profile.username), disabled: true}),
      firstname:[this.checkPresent(this.profile.firstname)],
      lastName :[this.checkPresent(this.profile.lastName)],
      email:[this.checkPresent(this.profile.email)],
      address:[this.checkPresent(this.profile.address)],
      gender:[this.checkPresent(this.profile.gender)],
      PAN_NO:[this.checkPresent(this.profile.PAN_NO)],
      addhar:[this.checkPresent(this.profile.addhar)],
      Date_of_Birth:[this.checkPresent(this.profile.Date_of_Birth)],
      // Last_Login:[this.profile.Last_Login],
      // Date_Created:[this.profile.Date_Created],
      phoneNo:[this.checkPresent(this.profile.phoneNo)],
      Mother_Name:[this.checkPresent(this.profile.Mother_Name)],
      Father_Name:[this.checkPresent(this.profile.Father_Name)]
    });
    console.log(this.profileForm);
    console.log(this.profileForm.controls.username.value)
    //this.authService.logout();
  }
  
  checkPresent(value:any){
    return (value) ? value:'';
  }

  onSubmit(): void{
    this.profileForm.value['username'] = this.profileForm.controls.username.value
    var data = 'http://127.0.0.1:5000/profile/'+"'"+JSON.stringify(this.profileForm.value)+"'";
    //console.log(data);
    //alert(data);
    this.http.get<any>(data)
    .subscribe(
      (res: any) => {
        
        const status = res['status'];
        if(status == 'success')
        {
          //alert(JSON.stringify(res));
          //console.log(JSON.stringify(res));
          this.authService.login(res['profile']);
          this.profileError = "changes saved successfully!"
          // alert("changes saved successfully!")
          //this.profileForm.reset();
          //this.router.navigate(['profile']);
        }
        else{
          //this.signupError = 'Sign Up failed! '
          this.profileError ="somthing wrong in request"
          alert(JSON.stringify(res));
        }
      },
      (error: any) => {
        //alert(JSON.stringify(error));
        console.error(error);
      }
    );
  }

}
