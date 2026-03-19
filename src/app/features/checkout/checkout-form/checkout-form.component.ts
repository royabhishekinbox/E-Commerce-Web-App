import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-checkout-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './checkout-form.component.html',
  styleUrl: './checkout-form.component.scss'
})
export class CheckoutFormComponent {

  cartService = inject(CartService);
  router = inject(Router);

  cartItems = this.cartService.cartItems;
  totalPrice = this.cartService.totalPrice;

  error = '';

  order = {
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    payment: 'cod'
  };

  placeOrder() {

    //  Empty cart check
    if (this.cartItems().length === 0) {
      this.error = 'Your cart is empty';
      return;
    }

    //  Name
    if (!this.order.name.trim()) {
      this.error = 'Full name is required';
      return;
    }

    //  Email
    if (!this.order.email.includes('@')) {
      this.error = 'Enter a valid email';
      return;
    }

    //  Phone (10 digit)
    if (!/^[0-9]{10}$/.test(this.order.phone)) {
      this.error = 'Enter valid 10-digit phone number';
      return;
    }

    // Address
    if (!this.order.address.trim()) {
      this.error = 'Address is required';
      return;
    }

    //  City
    if (!this.order.city.trim()) {
      this.error = 'City is required';
      return;
    }

    //  State
    if (!this.order.state.trim()) {
      this.error = 'State is required';
      return;
    }

    //  Zip (6 digit)
    if (!/^[0-9]{6}$/.test(this.order.zip)) {
      this.error = 'Enter valid 6-digit ZIP code';
      return;
    }

    //  All good
    this.error = '';

    alert("Order Placed Successfully!");

    this.cartService.clearCart();

    this.router.navigate(['/products']);
  }
}