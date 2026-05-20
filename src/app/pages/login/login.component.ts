import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {

  email = '';
  password = '';

  constructor(private userService: UserService) {}

  login() {
    console.log("LOGIN CLICKED", this.email, this.password);

    this.userService.login(this.email, this.password).subscribe({
      next: (res: any) => {

  console.log("LOGIN RESPONSE:", res);

  localStorage.setItem("token", res.token);

  alert("Login successful!");

},
    });
  }
}