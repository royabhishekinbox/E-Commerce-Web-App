import { Injectable, signal, computed } from '@angular/core';
import { CartItem } from '../../shared/models/cart-item.model';
import { Product } from '../../shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private _cartItems = signal<CartItem[]>([]);

  // readonly cart
  cartItems = this._cartItems.asReadonly();

  // total items
  totalItems = computed(() =>
    this._cartItems().reduce((total, item) => total + item.quantity, 0)
  );

  // total price
  totalPrice = computed(() =>
    this._cartItems().reduce(
      (total, item) => total + item.price * item.quantity,
      0
    )
  );

  // add product to cart
  addToCart(product: Product) {

    const items = this._cartItems();

    const existingItem = items.find(
      item => item.productId === product.id
    );

    // prevent adding more than stock
    if (existingItem && existingItem.quantity >= product.stockQuantity) {
      return;
    }

    if (existingItem) {

      this._cartItems.update(items =>
        items.map(item =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );

    } else {

      const newItem: CartItem = {
        productId: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        quantity: 1
      };

      this._cartItems.update(items => [...items, newItem]);
    }

  }

  // remove item 
  removeItem(productId: number) {
    this._cartItems.update(items =>
      items.filter(item => item.productId !== productId)
    );
  }

  // update quantity
  updateQuantity(productId: number, quantity: number) {

    if (quantity <= 0) {
      this.removeItem(productId);
      return;
    }

    this._cartItems.update(items =>
      items.map(item =>
        item.productId === productId
          ? { ...item, quantity }
          : item
      )
    );
  }

  // clear cart
  clearCart() {
    this._cartItems.set([]);
  }

}