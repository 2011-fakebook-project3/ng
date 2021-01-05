import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent implements OnInit {
  
  constructor(private oktaAuth: AuthService, private router: Router) {
  }

  async ngOnInit() {
    //this.router.navigateByUrl('newsfeed', { skipLocationChange: false});
    let isAuthenticated = await this.oktaAuth.isAuthenticated; 
    if (isAuthenticated) {
      // If user is signed in, redirect them to the newsfeed page
      this.router.navigateByUrl('newsfeed', { skipLocationChange: false});
    }
  }

}
