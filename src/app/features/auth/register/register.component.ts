import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  name = '';
  email = '';
  password = '';
  error = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  register() {

    //  Name validation
    if (!this.name.trim()) {
      this.error = 'Full name is required';
      return;
    }

    //  Email validation
    if (!this.email.includes('@')) {
      this.error = 'Enter a valid email';
      return;
    }

    //  Password validation
    if (this.password.length < 6) {
      this.error = 'Password must be at least 6 characters';
      return;
    }

    const user = {
      name: this.name,
      email: this.email,
      password: this.password
    };

    this.auth.register(user);

    this.error = '';
    alert('Registration successful');

    this.router.navigate(['/login']);
  }

}