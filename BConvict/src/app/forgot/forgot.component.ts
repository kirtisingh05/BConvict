import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder,FormGroup } from '@angular/forms';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent {
  public forgotForm !: FormGroup;
  public Error: string | null = null;
  constructor(private formBuilder : FormBuilder ,private authService:AuthService){}
  ngOnInit():void{

    this.forgotForm = this.formBuilder.group({
      
      Email:['']

    });

    this.authService.logout();

  }
  forgot(){

    const email = this.forgotForm.get('Email')?.value;

    // Validate username and password
    if (!email) {
      this.Error ='Please enter a Email !';
      return;
    }
  }
}
