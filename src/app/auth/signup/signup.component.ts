import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControlOptions, AbstractControl } from '@angular/forms';
import { MatchPassword } from '../validators/match-password';
import { UniqueUsername } from '../validators/unique-username';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  authForm = new FormGroup(
    {
      username: new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern(/^[a-z0-9]+$/)
        ],
        [this.uniqueUsername.usernameExistsValidator]
      ),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20)
      ]),
      passwordConfirmation: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20)
      ])
    },
    { validators: [this.matchPassword.validate] } as AbstractControlOptions
  );

  constructor(
    private matchPassword: MatchPassword,
    private uniqueUsername: UniqueUsername,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(){}
  getControl(value: string){
    let control = this.authForm.get(value);
    if(!control){
      throw 'Missing Form Control for ' + control;
    }
    return control;
  }
  onSubmit(){
    if(this.authForm.invalid){
      return;
    }
    this.authService.signUp(this.authForm.value).subscribe({
      next: (response) => {
        this.router.navigateByUrl('/inbox')
      },
      error: (err) => {
        if(!err.status){
          this.authForm.setErrors({noConnection: true})
        }
      }
    });
  }
}
