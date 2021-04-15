import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/authentication/core/authentication/auth.service';
// import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css'],
})
export class MainViewComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) {}

  async ngOnInit(): Promise<void> {
    this.checkAuthentication();
  }

  checkAuthentication(): void {
    const isAuthenticated = this.auth.isAuthenticated();
    if (isAuthenticated) {
      // redirect the user to the newsfeed page
      this.router.navigateByUrl('newsfeed', { skipLocationChange: false });
    }
  }
}
