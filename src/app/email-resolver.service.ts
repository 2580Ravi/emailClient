import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EmailService } from './inbox/email.service';
import { EMPTY, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailResolverService {

  constructor(private emailService: EmailService,
    private router: Router) { }
  resolve(route: ActivatedRouteSnapshot){
    const { id } = route.params;
    return this.emailService.getEmail(id).pipe(
      catchError(()=>{
        this.router.navigateByUrl('/inbox/not-found');
        return EMPTY;
      })
    )
  }
}
