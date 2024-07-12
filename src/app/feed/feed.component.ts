import { Component } from '@angular/core';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent {
  tweets: any[] = []; // Initialize with an empty array of tweets

  newTweet: string = ''; // Assuming you have a property for new tweet input
  maxTweetLength: number = 280; // Maximum allowed characters for a tweet

  postTweet(): void {
    // Trim whitespace from the newTweet input
    const trimmedTweet = this.newTweet.trim();

    // Check if the trimmedTweet is not empty and does not exceed maxTweetLength characters
    if (trimmedTweet && trimmedTweet.length <= this.maxTweetLength) {
      // Create a new tweet object
      const newTweet = {
        content: trimmedTweet,
        user: {
          name: 'John Doe', // Replace with actual user name
          profilePicture: 'path/to/profile-pic.jpg' // Replace with actual path to profile picture
        },
        likes: 0,
        comments: [],
        retweets: 0
      };

      // Prepend the new tweet to the beginning of the tweets array
      this.tweets.unshift(newTweet);

      this.newTweet = ''; // Clear the new tweet input after posting
    } else {
      // Handle invalid tweet (blank or exceeds character limit) if needed
      console.log('Invalid tweet input');
    }
  }

  updateTweet(updatedTweet: any): void {
    const index = this.tweets.findIndex(t => t.id === updatedTweet.id); 
    if (index !== -1) {
      this.tweets[index] = updatedTweet; 
    }
  }
}
