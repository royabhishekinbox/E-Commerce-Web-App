import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  private cartService = inject(CartService);

  cartItems = this.cartService.cartItems;
  totalPrice = this.cartService.totalPrice;

  // increase quantity
  increase(itemId: number) {
    const item = this.cartItems().find(i => i.productId === itemId);
    if (!item) return;
    this.cartService.updateQuantity(itemId, item.quantity + 1);
  }

  // decrease quantity
  decrease(itemId: number) {
    const item = this.cartItems().find(i => i.productId === itemId);
    if (!item) return;
    this.cartService.updateQuantity(itemId, item.quantity - 1);
  }
 // remove item
  remove(itemId: number) {
    this.cartService.removeItem(itemId);
  }

  // clear cart
  clearCart() {
    this.cartService.clearCart();
  }
  

}
