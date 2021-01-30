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
  styleUrls: ['./profile-view.component.css'],
})
export class ProfileViewComponent implements OnInit {
  // User whose profile page you are on
  user: User | undefined;
  // User logged in
  selfUser!: User;
  // Person logged in email
  currentUserEmail = '';
  posts: Post[] | undefined;
  followStatus = false;
  selfProfileCheck = false;

  constructor(
    private oktaAuth: OktaAuthService,
    private profileService: ProfileService,
    private route: ActivatedRoute,
    private followService: FollowService,
    private postService: PostService
  ) {}

  async ngOnInit(): Promise<void> {
    // Get Current User Email
    const userClaims = await this.oktaAuth.getUser();
    if (userClaims) {
      this.currentUserEmail = userClaims.email ?? '';
    }

    this.getUser();
  }

  async getUser(): Promise<void> {
    if (this.route.snapshot.paramMap.get('email') != null) {
      const email = this.route.snapshot.paramMap.get('email');
      if (email) {
        // Set user
        this.profileService
          .GetProfile(email)
          .subscribe((user) => (this.user = user));
        // Set posts
        this.postService
          .getUserPosts(email)
          .subscribe((posts) => (this.posts = posts));
        // Set follow status
        this.profileService
          .GetProfile(email)
          .subscribe((user) =>
            this.profileService
              .GetProfile(this.currentUserEmail)
              .subscribe(
                (selfUser) =>
                  (this.followStatus = this.followService.getFollowStatus(
                    selfUser,
                    user
                  ))
              )
          );
      }
    } else {
      this.profileService.GetProfileWithNullRoute().subscribe((user) => {
        this.user = user;
        this.postService
          .getUserPosts(this.user.email)
          .subscribe((posts) => (this.posts = posts));
        this.selfProfileCheck = true;
      });
    }
  }

  followUser(): any {
    if (this.user !== undefined && this.selfUser !== undefined) {
      if (this.followStatus) {
        this.followService.unfollow(this.user, this.selfUser);
        this.followStatus = false;
      } else {
        this.followService.follow(this.user, this.selfUser);
        this.followStatus = true;
      }
    }
  }

  onNotifyComment(postId: any): void {
    console.log(postId);
  }
}
