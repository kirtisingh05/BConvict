import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl ,FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class signupComponent {
  public signupForm !: FormGroup;
  public signupError: string | null = null;
  public passwordForm !: FormGroup;
  public passwordError: string | null = null;
  public conpasswordError: string | null = null;
  public fieldError: string | null = null;
  
  
  constructor(private formBuilder : FormBuilder, private http: HttpClient ,private router:Router,private authService:AuthService){}


  ngOnInit() : void{
    this.authService.logout();
    this.signupForm = this.formBuilder.group({
      username:[''],
      password:[''],
      Email:[''],
      Addhar_No:[''],
      Address:[''],
      Gender :[''],
      Phone_No:[''],
    });
    this.passwordForm = this.formBuilder.group({
      confirmPassword:['']

    });
    
  }

  signUp() 
  {
    const username = this.signupForm.get('username')?.value;
    const password = this.signupForm.get('password')?.value;
    const Addhar_No = this.signupForm.get('Addhar_No')?.value;
    const Gender = this.signupForm.get('Gender')?.value;
    const Phone_No = this.signupForm.get('Phone_No')?.value;
    const Address = this.signupForm.get('Address')?.value;
    const confirmPassword = this.passwordForm.get('confirmPassword')?.value;

    // Validate username and password
    if (!username) {
      this.signupError ='Please enter a unique username!';
      return;
    }
    if (!Addhar_No || !Gender || !Phone_No ||!Address) {
      this.fieldError ='Above all fields are requed !';
      return;
    }
    if (!password) {
      this.passwordError ='Please enter a password!';
      return;
    }
    if (password.length < 8) {
      //alert(password);
      this.passwordError ='Password must be at least 8 characters long!';
      return;
    }
    if (!confirmPassword) {
      this.conpasswordError ='Please enter a confirm password!';
      return;
    }
    if ( confirmPassword!== password) {
      //alert(password );
      this.conpasswordError = 'password and confirm password do not  match! ';
      return;
    }
    var data = 'http://127.0.0.1:5000/singup/'+"'"+JSON.stringify(this.signupForm.value)+"'";
    // alert(data);
    console.log(data);
    this.http.get<any>(data)
    .subscribe(
      (res: any) => {
        
        const status = res['status'];
        if(status == 'success')
        {
          alert("login")
          this.signupForm.reset();
          this.authService.login(res['profile']);
          this.router.navigate(['mydashboard']);
        }
        else{
          this.signupError = 'Sign Up failed! '
          // alert(JSON.stringify(res));
        }
      },
      (error: any) => {
        //alert(JSON.stringify(error));
        console.error(error);
      }
    );
  }
}


