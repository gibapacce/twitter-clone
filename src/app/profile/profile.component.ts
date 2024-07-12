import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  editMode = false;
  defaultProfilePicture = './profile-picture.jpg';

  user = {
    name: 'John Doe',
    bio: 'This is my bio',
    profilePicture: this.defaultProfilePicture
  };

  originalUser = { ...this.user }; // Copy of the original user data for canceling changes

  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }

  saveProfile(): void {
    // Simulate saving changes (you would replace this with actual API/service call)
    this.originalUser = { ...this.user }; // Save changes to originalUser
    this.editMode = false;
  }

  cancelChanges(): void {
    // Reset user data to originalUser on cancel
    this.user = { ...this.originalUser };
    this.editMode = false;
  }

  handleFileInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      // Handle file upload logic (e.g., upload to server, update user.profilePicture)
      // For simplicity, just display a preview in the UI
      const reader = new FileReader();
      reader.onload = () => {
        this.user.profilePicture = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
}
