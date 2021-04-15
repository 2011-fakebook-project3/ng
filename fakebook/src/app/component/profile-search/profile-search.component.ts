import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EventEmitter, Output } from '@angular/core';
import { User } from '../../model/user';
import { ProfileService } from '../../service/profile.service';
import { ProfileSearchDataService} from '../../service/profile-search-data.service';


@Component({
  selector: 'app-profile-search',
  templateUrl: './profile-search.component.html',
  styleUrls: ['./profile-search.component.css']
})
export class ProfileSearchComponent implements OnInit {
  @Output () onSelectedOption = new EventEmitter();
  
  searchProfile= new FormControl();
  profileList: User[] = [];
  autoCompleteList: any;

  constructor(private readonly profileService: ProfileService, private searchDataService: ProfileSearchDataService) { }

  ngOnInit() {
    this.searchDataService.getProfiles().subscribe(profiles => {
      this.profileList = profiles;
    }); 
    
    this.searchProfile.valueChanges.subscribe(userInput => {
      this.autoCompleteSearchList(userInput);
    });

  }

  private autoCompleteSearchList(input: any) {
    let categoryList = this.filterSearchList(input);
    this.autoCompleteList = categoryList;
  }

  filterSearchList(val: any) {
    if(typeof val != "string") {
      return [];
    }
    if(val === '' || val === null) {
      return [];
    }
    return val ? this.profileList.filter(s => s.firstName.toLowerCase().indexOf(val.toLowerCase()) != -1)
      : this.profileList;
  }

  displayFn(profile: User) {
    let p = profile ? profile.firstName : profile;
    return p;
  }

  filterProfileList(event: any) {
    var profiles = event.source.value;
    if(!profiles) {
      this.searchDataService.searchOption = [];
    }
    else {
      this.searchDataService.searchOption.push(profiles);
      this.onSelectedOption.emit(this.searchDataService.searchOption);
    }
    this.focusOnPlaceInput();
  }

  removeOption(option: any) {
    let index = this.searchDataService.searchOption.indexOf(option);
    if(index >= 0) {
      this.searchDataService.searchOption.splice(index, 1);
    }
    this.focusOnPlaceInput();

    this.onSelectedOption.emit(this.searchDataService.searchOption);
  }

  focusOnPlaceInput() {
    this.autoCompleteList.nativeElement.focus();
    this.autoCompleteList.nativeElement.value = '';
  }

  getProfiles(): void {
    this.profileService
      .GetProfilesByEmails(this.searchProfile.value)
      .subscribe((results: User[]) => (this.profileList = results));
  }

  
}