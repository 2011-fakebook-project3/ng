import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../core/authentication/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  name = '';
  isAuthenticated = false;
  subscription:Subscription | undefined;

  constructor(private authService:AuthService) { }

  ngOnInit() {
    this.subscription = this.authService.authNavStatus$.subscribe(status => this.isAuthenticated = status);
    this.name = this.authService.name;
  } 

   async signout() {
    await this.authService.signout();     
  }

  ngOnDestroy() {
    // prevent memory leak when component is destroyed
    if (this.subscription) {
        this.subscription.unsubscribe();
    }
  }
}