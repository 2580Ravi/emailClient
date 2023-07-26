import { Component } from '@angular/core';
import { Email, EmailService } from '../email.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-email-create',
  templateUrl: './email-create.component.html',
  styleUrls: ['./email-create.component.css']
})
export class EmailCreateComponent {
  showModal: boolean = false;
  email: Email;
  constructor(private authService: AuthService, private emailService: EmailService){
    this.email = {
      id: '',
      subject: '',
      text: '',
      to: '',
      from: `${authService.username}@angular-email.com`,
      html: ''
    }
  }

  onSubmit(email: Email){
    this.emailService.sendEmail(email).subscribe(()=>{
      this.showModal = false;
    });
  }

}
