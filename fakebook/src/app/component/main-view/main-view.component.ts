import { Component, OnInit } from '@angular/core';
// import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent implements OnInit {

  constructor(private oktaAuth: boolean, private router: Router) {
    // Just for testing, this should be deleted when we get the AuthService implemented
    //    and the oktaAuth in the constructor should be changed to type AuthService not boolean
    oktaAuth = false;
  }

  async ngOnInit() {
    let isAuthenticated = await this.oktaAuth // add .isAuthenticated to the end of this line to get the value when AuthService implemented
    if (isAuthenticated) {
      // If user is signed in, redirect them to the newsfeed page
      this.router.navigateByUrl('newsfeed', { skipLocationChange: false});
    }
  }

}
