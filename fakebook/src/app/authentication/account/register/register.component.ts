import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators'
import { AuthService } from '../../core/authentication/auth.service';
import { UserRegistration }    from '../../shared/models/user.registration';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  success = false;
  error = "";
  userRegistration: UserRegistration = { name: '', email: '', password: ''};
  submitted = false;

  constructor(private authService: AuthService, private spinner: NgxSpinnerService) {
  }

  onSubmit() { 

    this.spinner.show();

    this.authService.register(this.userRegistration)
      .pipe(finalize(() => {
        this.spinner.hide();
      }))  
      .subscribe(
      result => {         
         if(result) {
           this.success = true;
         }
      },
      error => {
        this.error = error;       
      });
  }
}
