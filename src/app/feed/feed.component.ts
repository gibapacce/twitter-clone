import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  newTweet: string = '';
  tweets = [
    { content: 'First tweet!', likes: 10, comments: 5, retweets: 2 },
    // More tweets here
  ];

  constructor() {}

  ngOnInit(): void {}

  postTweet(): void {
    if (this.newTweet.length <= 280) {
      this.tweets.unshift({ content: this.newTweet, likes: 0, comments: 0, retweets: 0 });
      this.newTweet = '';
    }
  }
}
