import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { User } from '../../model/user';
import { ProfileService } from '../../service/profile.service';

@Component({
  selector: 'app-profile-search',
  templateUrl: './profile-search.component.html',
  styleUrls: ['./profile-search.component.css']
})
export class ProfileSearchComponent implements OnInit {
  searchProfile= new FormControl('');
  profileList: User[] = [];

  constructor(private readonly profileService: ProfileService) { }

  ngOnInit(): void {
    //this.getProfiles();
  }

  // getProfiles(): void {
  //   this.profileService
  //     .GetProfiles(this.searchProfile)
  //     .subscribe((gotPosts) => (this.posts = gotPosts));
  // }
}