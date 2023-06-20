import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  curr_profile = new Subject<any>();
  constructor() { }

  fetchProfile(){
    if(localStorage.getItem('isLoggedIn') == 'true'){
      var data = localStorage.getItem('profile');
      return JSON.parse(JSON.parse(JSON.stringify(data)));
    }
  }
}
