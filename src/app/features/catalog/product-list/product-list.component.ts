import { Component, inject } from '@angular/core';
import { ProductService } from '../../../core/services/product.service';
import { CartService } from '../../../core/services/cart.service';
import { Product } from '../../../shared/models/product';

import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, RouterModule],
  templateUrl: './product-list.component.html'
})
export class ProductListComponent {

 private productService = inject(ProductService);
 //cart service
 private cartService = inject(CartService);

  products = this.productService.filteredProducts;
  categories = this.productService.categories;

  searchTerm = this.productService.searchTerm;
  selectedCategory = this.productService.selectedCategory;
  maxPrice = this.productService.maxPrice;
  //add to cart
  addToCart(product: Product) {
  this.cartService.addToCart(product);
}

}