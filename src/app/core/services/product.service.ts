import { Injectable, signal, computed } from '@angular/core';
import { Product } from '../../shared/models/product'; 

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private _products = signal<Product[]>([
    {
      id: 1,
      name: 'Wireless Headphones',
      slug: 'wireless-headphones',
      description: 'High-quality noise-canceling headphones.',
      price: 199,
      category: 'Speaker',
      imageUrl: 'data:image/jpeg;base64,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',
      stockQuantity: 15,
      rating: 4.5
    },
    {
      id: 2,
      name: 'Smart Watch',
      slug: 'smart-watch',
      description: 'Track your fitness and notifications with samsung health app.',
      price: 299,
      category: 'Wearables',
      imageUrl: 'https://cdn.thewirecutter.com/wp-content/media/2025/10/BEST-SMARTWATCH-ANDROID-PHONES-04017.jpg?auto=webp&quality=75&width=1024',
      stockQuantity: 10,
      rating: 4.2
    },
    {
      id: 3,
      name: 'I Phone 17',
      slug: 'iphone-17',
      description: 'High-quality apple device with 128GB storage.',
      price: 117599,
      category: 'Mobile',
      imageUrl: 'https://cdn.mos.cms.futurecdn.net/gWtK9fMmfzZCrmrk9LBZtH-1600-80.jpg',
      stockQuantity: 11,
      rating: 4.8
    },
    {
      id: 4,
      name: 'Laptop',
      slug: 'laptop',
      description: 'High-quality dell device with 4GB RAM 226GB SSD.',
      price: 40599,
      category: 'Laptop',
      imageUrl: 'https://assets.thehansindia.com/h-upload/2023/04/26/1348625-dell.webp',
      stockQuantity: 19,
      rating: 4.8
    },
    {
      id: 5,
      name: 'Samsung S24 ultra',
      slug: 'samsung galaxy',
      description: 'High-quality samsung device.',
      price: 99897,
      category: 'Mobile',
      imageUrl: 'https://www.triveniworld.com/cdn/shop/files/samsung-galaxy-s24-ultra-5g-ai-smartphone-titanium-violet-12gb-256gb-storage-triveni-world-6.jpg?v=1736304715&width=1946',
      stockQuantity: 11,
      rating: 4.8
    },
    {
      id: 6,
      name: 'IBELL LED TV',
      slug: 'ibell 104cm led',
      description: 'High-quality image resolution.',
      price: 13599,
      category: 'Electronics',
      imageUrl: 'https://m.media-amazon.com/images/I/51h0RFNd0DL._AC_UF1000,1000_QL80_.jpg',
      stockQuantity: 11,
      rating: 4.8
    },
    {
      id: 7,
      name: 'Bluetooth Airbuds',
      slug: 'bluetooth airbud',
      description: 'Noise free airbuds device.',
      price: 7599,
      category: 'Speaker',
      imageUrl: 'https://goboult.co.in/cdn/shop/files/Artboard4_e0a1d9e9-f2ca-48bb-823a-ef7b44221060.jpg?v=1771499960',
      stockQuantity: 11,
      rating: 4.8
    },
    {
      id: 8,
      name: 'Apple watch',
      slug: 'apple watch',
      description: 'High-quality apple device.',
      price: 9399,
      category: 'Wearables',
      imageUrl: 'https://hips.hearstapps.com/hmg-prod/images/best-apple-watch-workouts-67d1a89e00369.png?crop=0.463xw:0.926xh;0.518xw,0.0385xh&resize=640:*',
      stockQuantity: 11,
      rating: 4.8
    },
    {
      id: 9,
      name: 'One Plus Mobile',
      slug: 'iphone-17',
      description: 'High-quality one plus device.',
      price: 35599,
      category: 'Mobile',
      imageUrl: 'https://cdn.mos.cms.futurecdn.net/v2/t:0,l:250,cw:1500,ch:1125,q:80,w:1500/pZAUvzpQjR2mCJde9oo9sf.jpg',
      stockQuantity: 11,
      rating: 4.8
    },
    {
      id: 10,
      name: 'Google pixel',
      slug: 'google pixel',
      description: 'High-quality google device.',
      price: 56599,
      category: 'Mobile',
      imageUrl: 'https://media.wired.com/photos/66ba7431496f3c2c777f3c8b/3:2/w_2560%2Cc_limit/Google-Pixel-9-Series-SOURCE-Julian-Chokkattu.jpg',
      stockQuantity: 11,
      rating: 4.8
    },
    {
      id: 11,
      name: 'Mac Book Air',
      slug: 'macbook air',
      description: 'High-quality apple device.',
      price: 86599,
      category: 'Laptop',
      imageUrl: 'https://media.wired.com/photos/65ea34d70264b0ad869cbc18/master/w_2560%2Cc_limit/MacBook-Air-M3-Review-Featured-Gear.jpg',
      stockQuantity: 11,
      rating: 4.8
    },
    {
      id: 12,
      name: 'ASUS Vivobook',
      slug: 'asus vivobook',
      description: 'High-quality asus device.',
      price: 30599,
      category: 'Laptop',
      imageUrl: 'https://www.techadvisor.com/wp-content/uploads/2023/09/asus-vivobook-16-review.jpeg?quality=50&strip=all',
      stockQuantity: 11,
      rating: 4.8
    }
  ]);

  products = this._products.asReadonly();

  // Search + filters signals
  searchTerm = signal('');
  selectedCategory = signal('');
  maxPrice = signal<number | null>(null);

  // Categories for filter dropdown
  categories = computed(() =>
    [...new Set(this._products().map(p => p.category))]
  );
// Filtered products by name, category, price
  filteredProducts = computed(() => {

  const search = this.searchTerm().toLowerCase();
  const category = this.selectedCategory();
  const price = this.maxPrice();

  return this._products().filter(product => {

    const matchesSearch =
      product.name.toLowerCase().includes(search);

    const matchesCategory =
      !category || product.category === category;

    const matchesPrice =
      !price || product.price <= price;

    return matchesSearch && matchesCategory && matchesPrice;

  });

});
}