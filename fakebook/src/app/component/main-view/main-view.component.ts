import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent implements OnInit {
  constructor(private oktaAuth: AuthService, private router: Router) {
  }

  async ngOnInit(): Promise<void> {
    this.checkAuthentication();
  }

  checkAuthentication(): void {
    // Contains all the logic in proj 2 fakebook ngOnInit. Moved this to test this functionality.
  }

}
