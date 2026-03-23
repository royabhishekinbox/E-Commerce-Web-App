import { Injectable, signal, computed, effect } from '@angular/core';
import { CartItem } from '../../shared/models/cart-item.model';
import { Product } from '../../shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private STORAGE_KEY = 'cart_items';

  // Load initial cart from localStorage
  private _cartItems = signal<CartItem[]>(this.loadCart());

  // readonly cart (used in your component)
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

  constructor() {
    // Auto-save whenever cart changes
    effect(() => {
      this.saveCart(this._cartItems());
    });
  }

  // Load from the localStorage 
  private loadCart(): CartItem[] {
    if (typeof window === 'undefined') return [];

    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  //  Save to localStorage
  private saveCart(items: CartItem[]) {
    if (typeof window === 'undefined') return;

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
  }

  // add product
  addToCart(product: Product) {

    const items = this._cartItems();

    const existingItem = items.find(
      item => item.productId === product.id
    );

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
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.STORAGE_KEY);
    }
  }
}