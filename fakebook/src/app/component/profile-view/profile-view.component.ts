import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // getting the id number
import { User } from 'src/app/model/user';
import { ProfileService } from '../../service/profile.service';

@Component({
  selector: 'app-profile-view',
  providers: [ProfileService],
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {
  user: User | null = null;

  constructor(
    private route: ActivatedRoute, // getting the id # in route
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.getUser();
  }
  getUser(): void {
    let tempId = ''; // the only way i could declare a variable that may accept a null value in thefuture
    // get the id number from the route
    debugger;
    if (this.route.snapshot.paramMap.get('id') != null) {
      tempId += this.route.snapshot.paramMap.get('id');

      const id = tempId;

      this.profileService.GetProfile(id).subscribe((gotuser: User | null) => (this.user = gotuser));

    }
  }
}

