import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css']
})
export class TweetComponent {
  @Input() tweet: any;
  newComment: string = '';
  commentMode: boolean = false;

  likeTweet(): void {
    this.tweet.likes++;
  }

  commentTweet(): void {
    if (this.newComment.trim()) {
      const comment = {
        user: { name: 'Current User', profilePicture: 'path/to/default/pic.jpg' }, // Replace with actual user data
        content: this.newComment
      };
      this.tweet.comments.unshift(comment); // Add the new comment to the top
      this.newComment = ''; // Clear the comment input
      this.commentMode = false; // Hide the comment input
    }
  }

  deleteComment(index: number): void {
    this.tweet.comments.splice(index, 1);
  }

  retweetTweet(): void {
    this.tweet.retweets++;
  }
}
