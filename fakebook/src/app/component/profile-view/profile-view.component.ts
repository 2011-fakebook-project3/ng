import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { ProfileService } from 'src/app/service/profile.service';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {
  // Person logged in email
  currentUserEmail = '';
  // This should be the email of the person whose profile you click on
  profileUserEmail = '';

  constructor(private oktaAuth: OktaAuthService, private profileService: ProfileService) { }

  async ngOnInit(): Promise<void> {
    // Get Current User Email
    const userClaims = await this.oktaAuth.getUser();
    this.currentUserEmail = userClaims.email ?? '';
  }



}
