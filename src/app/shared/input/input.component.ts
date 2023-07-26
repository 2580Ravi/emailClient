import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {
  @Input() label!: string;
  @Input() control!: AbstractControl<string | null, string | null> | null;
  @Input() type!: string;
  @Input() controlType = 'input';
  formControl!: FormControl<any>;
  ngOnInit(){
    this.formControl = this.getcontrolAsFormControl();
  }
  getcontrolAsFormControl(): FormControl {
    return this.control as FormControl;
  }
  showErrors(){
    const {dirty, touched, errors} = this.formControl;
    return dirty && touched && errors;
  }
}
