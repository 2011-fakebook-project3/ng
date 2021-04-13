import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { User } from '../../model/user';
import { ProfileService } from '../../service/profile.service';

@Component({
  selector: 'app-profile-search',
  templateUrl: './profile-search.component.html',
  styleUrls: ['./profile-search.component.css']
})
export class ProfileSearchComponent {
  searchProfile= new FormControl('');
  profileList: User[] = [];

  constructor(private readonly profileService: ProfileService) { }

  getProfiles(): void {
    this.profileService
      .GetProfilesByEmails(this.searchProfile.value)
      .subscribe((results: User[]) => (this.profileList = results));
  }
}