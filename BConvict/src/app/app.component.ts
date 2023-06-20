import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BConvict';
  contentType = "home";
  loggedIn:boolean | undefined;
  constructor(private auth:AuthService){
    this.loggedIn = auth.isLoggedIn();
    this.auth.authPipe.subscribe(val => this.loggedIn = val); 

  }

  

  acceptData(name : string): void{
    this.contentType = name;
    //window.location.reload();
  }
}
