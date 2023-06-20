import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  @Input() Record: any;
  @Input() constant: any;
  @Input() navigate:any ='showforms';
  constructor(private router: Router){}

  onClick(id:any){

    var url = this.navigate;
    this.router.navigate([url,{id:id}]);
  }
}
