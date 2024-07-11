import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user = {
    name: 'John Doe',
    profilePicture: 'path/to/profile-pic.jpg',
    bio: 'This is my bio',
    followers: 123,
    tweets: [
      { content: 'Hello world!', likes: 5, comments: 2, retweets: 1 },
      // More tweets here
    ]
  };

  constructor() {}

  ngOnInit(): void {}

  editProfile(): void {
    // Handle profile editing logic here
  }
}
