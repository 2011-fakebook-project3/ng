import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { FormControl } from '@angular/forms';
import { User } from '../../model/user';
import { ProfileSearchDataService } from '../../service/profile-search-data.service';

@Component({
  selector: 'app-navbar-view',
  templateUrl: './navbar-view.component.html',
  styleUrls: ['./navbar-view.component.css'],
})
export class NavbarViewComponent implements OnInit {
  isAuthenticated = false;

  searchName = '';

  profile: User[] | undefined;

  constructor(private router: Router, public oktaAuth: AuthService, private searchDataService: ProfileSearchDataService) {}

  ngOnInit(): void {
    this.oktaAuth.subscribeAuthStateChange((authState: boolean) => {
      this.isAuthenticated = authState;
    });
    this.searchDataService.getProfiles().subscribe(profiles => {
      this.profile = profiles;
      this.searchDataService.searchData = profiles;
    });
  }

  login(): void {
    this.oktaAuth.login();
  }
  logout(): void {
    this.oktaAuth.logout();
  }
  onNotifySearch(name: any): void {
    console.log(name);
    this.router.navigate([`search/${name}`], { skipLocationChange: false });
  }

  onSelectedFilter(e: any){
    this.getFilteredSearchList();
  }

  getFilteredSearchList() {
    if(this.searchDataService.searchOption.length > 0) {
      this.profile = this.searchDataService.filteredSearchOptions();
    }
    else {
      this.profile = this.searchDataService.searchData;
    }
  }
}
