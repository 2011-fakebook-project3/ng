import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../model/user';
import { ProfileService } from '../../service/profile.service';
import { EventEmitter, Output } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@Component({
  selector: 'app-profile-search',
  templateUrl: './profile-search.component.html',
  styleUrls: ['./profile-search.component.css']
})
export class ProfileSearchComponent implements OnInit {
  @Output() onSelectedOption = new EventEmitter();
  searchProfile= new FormControl('');
  profileList: User[] = [];
  searchView = false;

  constructor(private readonly profileService: ProfileService) { }

  ngOnInit(): void {
  }

  getProfiles(): void {
    this.profileService
      .GetProfilesByEmails(this.searchProfile.value)
      .subscribe((results: User[]) => (this.profileList = results));
  }

  search() {
    this.profileService.GetProfileByName(this.searchProfile.value).subscribe(
      (response) => {
        // Implement functionality for profiles
        this.searchView = !this.searchView;
        if(this.searchView === true){
          this.profileList = response;
        }
      });
  }
}