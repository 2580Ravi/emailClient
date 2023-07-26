import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.css']
})
export class SignoutComponent {
  constructor(private authService: AuthService, private router: Router){}
  ngOnInit(){
    this.authService.signOut().subscribe(()=>{
      this.router.navigateByUrl('/');
    });
  }
}
