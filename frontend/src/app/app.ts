import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from './services/user.service';
import { RouterOutlet } from '@angular/router';
// import { LoginComponent } from './pages/login/login.component';s

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent implements OnInit {

  users: any[] = [];

  fullname = '';
  email = '';
  password = '';
  role = 'user';

  showLogin = false;

  editingUserId: number | null = null;

  showCreateForm = false;

  editUser(user: any) {
  this.editingUserId = user.id;

  this.fullname = user.fullname;
  this.email = user.email;
  this.role = user.role;

  this.showCreateForm = true;
}

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers();
  }

    clearForm() {
  this.fullname = '';
  this.email = '';
  this.password = '';
  this.role = 'user';
  this.editingUserId = null;
  this.showCreateForm = false;
}

  loadUsers() {
    this.userService.getUsers().subscribe((res: any) => {
      this.users = res;
    });
  }

  createUser() {
    const data = {
      fullname: this.fullname,
      email: this.email,
      password: this.password,
      role: this.role
    };

    if (this.editingUserId) {
      this.userService.updateUser(this.editingUserId, data).subscribe(() => {
        this.loadUsers();
      });
    } else {
      this.userService.createUser(data).subscribe(() => {
        this.loadUsers();
      });
    }
  }

  deactivateUser(id: number) {
    this.userService.deactivateUser(id).subscribe(() => {
      this.loadUsers();
    });
  }

  activateUser(id: number) {
    this.userService.activateUser(id).subscribe(() => {
      this.loadUsers();
    });
  }
}