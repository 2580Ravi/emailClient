import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, AsyncValidatorFn, FormControl, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Injectable({ providedIn: 'root' })
export class UniqueUsername implements AsyncValidator {
  constructor(private authService: AuthService) {}

  usernameExistsValidator: AsyncValidatorFn = (control: AbstractControl): Observable<any> => {
    const username = control.value;
    return this.validate(control);
  };

  validate(
    control: AbstractControl
  ){
    const value = control.value;
    return this.authService.usernameAvailable(value)
      .pipe(
        map((value)=>{
          return null;
        }),
        catchError((err) => of({ nonUniqueUsername: true }))
      );
  }
}
