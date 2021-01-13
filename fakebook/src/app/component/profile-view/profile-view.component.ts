import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OktaAuthService } from '@okta/okta-angular';
import { Post } from 'src/app/model/post';
import { User } from 'src/app/model/user';
import { FollowService } from 'src/app/service/follow.service';
import { PostService } from 'src/app/service/post.service';
import { ProfileService } from 'src/app/service/profile.service';

@Component({
  selector: 'app-profile-view',
  providers: [ProfileService],
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {
  user: User | undefined;
  selfUser!: User;
  // Person logged in email
  currentUserEmail = '';
  // This should be the email of the person whose profile you click on
  profileUserEmail = '';
  posts: Post[] = [];
  followStatus = false;
  selfProfileCheck = false;

  constructor(private oktaAuth: OktaAuthService,
              private profileService: ProfileService,
              private route: ActivatedRoute,
              private followService: FollowService,
              private postService: PostService) { }

  async ngOnInit(): Promise<void> {
    // Get Current User Email
    const userClaims = await this.oktaAuth.getUser();
    this.currentUserEmail = userClaims.email ?? '';


    this.getUser();
  }

  async getUser(): Promise<void> {
    let tempEmail = '';
    // Async problems possibly
    this.profileService.GetProfile(this.currentUserEmail).subscribe(profile => this.selfUser = profile);

    if (this.route.snapshot.paramMap.get('email') != null) {
      tempEmail += this.route.snapshot.paramMap.get('email');

      const email = tempEmail;

      this.profileService.GetProfile(email).subscribe(user => this.user = user);

      this.postService.GetUserPosts(email).subscribe(posts => this.posts = posts);
      // This might have problems due to async. currentUserEmail may not be set in time
      this.profileService.GetProfile(email)
        .subscribe(user => this.profileService.GetProfile(this.currentUserEmail)
          .subscribe(selfUser => this.followStatus = this.followService.getFollowStatus(selfUser, user)));
    } else {
      const userClaims = await this.oktaAuth.getUser();
      this.currentUserEmail = userClaims.email ?? '';

      this.profileService.GetProfile(this.currentUserEmail).subscribe(user => this.user = user);

      this.postService.GetOwnPosts().subscribe(posts => this.posts = posts);
      this.selfProfileCheck = true;
    }
  }

  followUser(): any {
    if (this.user !== undefined && this.selfUser !== undefined) {
      if (this.followStatus) {
        console.log('UNFOLLOW');
        this.followService.unfollow(this.user, this.selfUser);
        this.followStatus = false;
      } else {
        console.log('FOLLOW');
        this.followService.follow(this.user, this.selfUser);
        this.followStatus = true;
      }
    }
  }

  onNotifyComment(postId: any): void {
    console.log(postId);
  }
}
