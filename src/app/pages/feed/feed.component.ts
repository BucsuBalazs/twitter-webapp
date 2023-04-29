import { Component, OnInit } from '@angular/core';
import { Tweet } from 'src/app/shared/models/Tweet';
import { TweetService } from 'src/app/shared/services/tweet.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent {

  likeUrl: string = 'assets/icons/like2.png';
  commentUrl: string = 'assets/icons/comment2.png';

  tweets: Array<Tweet> = [];

  likes = 0;
  comment = 0;

  constructor(
    private tweetService: TweetService,) { }

  ngOnInit(): void {

    /*this.tweetService.getAll().subscribe(all_tweets => {
      this.tweets = all_tweets;
    });*/

    this.tweetService.getTweetsInLikeOrder().subscribe(all_tweets => {
      this.tweets = all_tweets;
    });
  }

}
