import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router'
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-navbar-view',
  templateUrl: './navbar-view.component.html',
  styleUrls: ['./navbar-view.component.css']
})
export class NavbarViewComponent implements OnInit {
  isAuthenticated: boolean = false;

  searchName: string = '';
  constructor(private router: Router) { }

  async ngOnInit() {

  }
  
  login() {
    console.log("login");
  }
  logout() {
    console.log("logout");
  }
  onNotifySearch(name: any){
    console.log(name)
    this.router.navigate([`search/${name}`], { skipLocationChange: false })
  }
}
