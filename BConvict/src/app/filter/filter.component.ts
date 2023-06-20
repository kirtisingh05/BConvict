import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {

  @Input() options: any = [];
  @Output() returnVal = new EventEmitter<any>();

  mydashForm: any;
  Labels: any;

  constructor(private formBuilder: FormBuilder) {
    this.mydashForm = this.formBuilder.group({
      field_name: '',
      operation: 'is',
      value: ''
    });
  }

  ngOnInit(): void {
    this.Labels = Object.keys(this.options);
  }

  whenNone(){
    this.mydashForm = this.formBuilder.group({
      field_name: '',
      operation: 'is',
      value: ''
    });
    this.applyFilter();
  }

  applyFilter() {
    this.returnVal.emit(this.mydashForm.value);
  }

}
