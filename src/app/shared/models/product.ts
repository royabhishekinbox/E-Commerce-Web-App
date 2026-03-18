export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  discountPrice?: number;
  category: string;
  imageUrl: string;
  stockQuantity: number;
  rating?: number;
  createdAt?: Date;
  updatedAt?: Date;
}