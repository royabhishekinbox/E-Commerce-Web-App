import { CommonModule } from '@angular/common';
import { Component, inject, computed } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';
import { AuthService } from '../../../core/services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  constructor(
    private cartService: CartService,
    public auth: AuthService
  ) {}

  totalItems() {
    return this.cartService.totalItems();
  }

}
