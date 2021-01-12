import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // getting the id number
import { User } from 'src/app/model/user';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-profile-view',
  providers: [UserService],
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {
  user: User | undefined;

  constructor(
    private route: ActivatedRoute, // getting the id # in route
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getUser();
  }
  getUser(): void {
    let tempId = ''; // the only way i could declare a variable that may accept a null value in thefuture
    // get the id number from the route
    if (this.route.snapshot.paramMap.get('id') != null) {
      tempId += this.route.snapshot.paramMap.get('id');

      const id = tempId;

      this.userService.getUser(id).subscribe(user => this.user = user);

    }
  }
}

