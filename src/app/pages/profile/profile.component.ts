import { Component,OnInit,OnDestroy,ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from 'src/app/shared/models/User';
import { UserService } from 'src/app/shared/services/user.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Tweet } from 'src/app/shared/models/Tweet';
import { TweetService } from 'src/app/shared/services/tweet.service';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  showButton: boolean = false;

  tweets: Array<Tweet> = [];

  likeUrl: string = 'assets/icons/like2.png';
  commentUrl: string = 'assets/icons/comment2.png';

  user: User = {
    id: "",
    email: "",
    username: "",
    profile_picture_url: "",
  };

  userForm = this.createForm({
    id: '',
    email: '',
    username: '',
    profile_picture_url: ''
  });
  

  loggedInUser?: firebase.default.User | null;

  constructor(
    private router: Router, 
    private authService: AuthService, 
    private userService: UserService,
    private fb: FormBuilder,
    private tweetService: TweetService,) {

  }


  createForm(model: User) {
    let formGroup = this.fb.group(model);
    formGroup.get('username')?.addValidators([Validators.required]);
    return formGroup
  }

  ngOnInit(): void {

    this.authService.isUserLoggedIn().subscribe(stroreduser => {
      this.loggedInUser = stroreduser;
      this.userService.getById(this.loggedInUser?.uid as string).subscribe(getuser => {
        if (getuser !== undefined) {
          this.user = getuser;
        } else {
          console.log('User document does not exist');
        }

        this.tweetService.getTweetsByEmail(this.user.email).subscribe(all_tweets=>{
          console.log(all_tweets)
          this.tweets = all_tweets;
        });
      });

    }, error => {
      console.error(error);
    });

    /*console.log(this.user.email)
    this.tweetService.getTweetsByEmail(this.user.email).subscribe(all_tweets=>{
      console.log(all_tweets)
      this.tweets = all_tweets;
    });*/

    /*this.tweetService.getAll().subscribe(all_tweets=>{
      this.tweets = all_tweets;
    });*/

  }

  ngOnDestroy(): void {
  }

  onEnter() {
    this.onSubmit()
  }

  onSubmit() {
    this.user.username = this.userForm.get('username')?.value as string;

    this.userService.update(this.user);

    this.userForm.get('username')?.setValue('');
    //this.showButton = false;
  }

  delete(del: Tweet){
    this.tweetService.delete(del.id).then(_ =>{
      this.tweets = this.tweets.filter(tweet => tweet.id !== del.id);
    }).catch(error => {
      console.error(error);
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/feed');
  }

  home() {
    this.router.navigateByUrl('/myfeed');
  }

  profile() {
    this.router.navigateByUrl('/profile');
  }
}
