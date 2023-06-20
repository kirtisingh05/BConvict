import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-loginheader',
  templateUrl: './loginheader.component.html',
  styleUrls: ['./loginheader.component.css']
})
export class LoginheaderComponent {

  constructor(private authService:AuthService){}

  logout() {

    alert("u really want to logout?");

    this.authService.logout();
  }
 
}
