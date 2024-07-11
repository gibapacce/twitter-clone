import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css']
})
export class TweetComponent {
  @Input() tweet: any;

  likeTweet(): void {
    this.tweet.likes++;
  }

  commentTweet(): void {
    // Handle comment logic here
  }

  retweetTweet(): void {
    this.tweet.retweets++;
  }
}
