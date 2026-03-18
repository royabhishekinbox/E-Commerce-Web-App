import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../shared/models/product';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
  
   private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
   private cartService = inject(CartService); 

  product = signal<Product | null>(null);

  ngOnInit() {

    const id = Number(this.route.snapshot.paramMap.get('id'));

    const foundProduct = this.productService
      .products()
      .find(p => p.id === id);

    if (foundProduct) {
      this.product.set(foundProduct);
    }

  }
  addToCart() {

    const product = this.product();

    if (product) {
      this.cartService.addToCart(product);
    }

  }

}
