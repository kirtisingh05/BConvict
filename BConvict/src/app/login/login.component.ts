import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service' 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  public loginForm !: FormGroup;
  public loginError: string | null = null;
  public hide=true;

  constructor(private formBuilder : FormBuilder, private http: HttpClient ,private router:Router, private authService:AuthService){}
  
  ngOnInit() : void{
    this.loginForm = this.formBuilder.group({
      username:[''],
      password:['']
    });
    this.authService.logout();
  }

  logIn(){

    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;

    // Validate username and password
    if (!username || !password) {
      this.loginError ='Please enter a username and password!';
      return;
    }
    if (password.length < 7) {
      this.loginError ='Password must be at least 8 characters long!';
      return;
    }

    var data = 'http://127.0.0.1:5000/login/'+"'"+JSON.stringify(this.loginForm.value)+"'";
    //alert(data);
    this.http.get<any>(data)
    .subscribe(
      (res :any) => {
        //alert(res);
        const status = res['status'];
        if(status == 'success')
        {
          this.loginForm.reset();
          this.authService.login(res['profile']);
          this.router.navigate(['mydashboard']);
        }
        else{
          //alert('Login failed!');
          this.loginError = 'Login failed!'
        }
          
      },
      (error) => {
        //alert(JSON.stringify(error));
        console.error(error);
      }
    );

  }
}
