import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authPipe = new Subject<boolean>();
  constructor() { }
  login(profile: any): void {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('profile', JSON.stringify(profile));
    this.authPipe.next(true);
  }
  
  logout(): void {
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('profile');
    this.authPipe.next(false);
  }


  public isLoggedIn(): boolean {
    let status = false;
    if (localStorage.getItem('isLoggedIn') == "true") {
      status = true;
    }
    else {
      status = false;
    }
    return status;
  }

}
