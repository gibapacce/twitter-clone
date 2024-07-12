import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { FeedComponent } from './feed/feed.component';
import { TweetComponent } from './tweet/tweet.component';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    RegistrationComponent,
    LoginComponent,
    ProfileComponent,
    FeedComponent,
    TweetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AppComponent
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }
