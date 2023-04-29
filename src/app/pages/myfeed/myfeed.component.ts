import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Tweet } from 'src/app/shared/models/Tweet';
import { TweetService } from 'src/app/shared/services/tweet.service';

@Component({
  selector: 'app-myfeed',
  templateUrl: './myfeed.component.html',
  styleUrls: ['./myfeed.component.scss']
})
export class MyfeedComponent {

  //tweetObject: Tweet = {};
  tweets: Array<Tweet> = [];

  likeUrl: string = 'assets/icons/like2.png';
  commentUrl: string = 'assets/icons/comment2.png';

  loggedInUser?: firebase.default.User | null;

  tweetFrom = this.createForm({
    id: '',
    email: '',
    content: '',
    date: new Date(),
    likes: 0,
    comments: 0,
  });
  

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private authService: AuthService,
    private tweetService: TweetService,) { }

  ngOnInit(): void {

    this.authService.isUserLoggedIn().subscribe(user => {
      this.loggedInUser = user;
    }, error => {
      console.error(error);
    });

    this.tweetService.getAll().subscribe(all_tweets=>{
      this.tweets = all_tweets;
    });
  }

  ngOnDestroy(): void {

  }

  createForm(model: Tweet) {
    console.log("in create form: " + model.content)
    let formGroup = this.fb.group(model);
    formGroup.get('content')?.addValidators([Validators.required]);
    console.log("in create form: " +formGroup.get('content')?.value)
    return formGroup
  }


  profile() {
    this.router.navigateByUrl('/profile');
  }

  home() {
    this.router.navigateByUrl('/myfeed');
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/feed');
  }

  tweetit() {
    console.log("in tweet it"+this.tweetFrom.get('content')?.value)

    let geteamil: string = '';
    if (this.loggedInUser?.email != null){
      geteamil = this.loggedInUser?.email.toString();
    }
    this.tweetFrom.get('email')?.setValue(geteamil);

    let post: Tweet = {
      id: '',
      email: this.tweetFrom.get('email')?.value as string,
      content: this.tweetFrom.get('content')?.value as string,
      date: this.tweetFrom.get('date')?.value ?? new Date(),
      likes: this.tweetFrom.get('likes')?.value ?? 0,
      comments: this.tweetFrom.get('comments')?.value ?? 0
    };

    //console.log(post);
    //this.tweets.push(post);

    this.tweetService.create(post).then(_ => {
      
    }).catch(error => {
      console.error(error);
    });

    this.tweetFrom.get('content')?.setValue('');

  }

  onlike(update: Tweet) {
 


    update.likes = update.likes +1;

    console.log(update);
    this.tweetService.update(update);

  }

  delete(del: Tweet){
    this.tweetService.delete(del.id).then(_ =>{
      this.tweets = this.tweets.filter(tweet => tweet.id !== del.id);
    }).catch(error => {
      console.error(error);
    });
  }
}
