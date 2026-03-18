import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full'
  },

  {
    path: 'products',
    loadComponent: () =>
      import('./features/catalog/product-list/product-list.component')
        .then(m => m.ProductListComponent)
  },

  {
    path: 'product/:id',
    loadComponent: () =>
      import('./features/catalog/product-details/product-details.component')
        .then(m => m.ProductDetailsComponent)
  },

  {
    path: 'cart',
    loadComponent: () =>
      import('./features/cart/cart.component')
        .then(m => m.CartComponent)
  },

  {
    path: 'checkout',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/checkout/checkout-form/checkout-form.component')
        .then(m => m.CheckoutFormComponent)
  },

  /* ⭐ LOGIN PAGE */
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login.component')
        .then(m => m.LoginComponent)
  },

  /* ⭐ REGISTER PAGE */
  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/register/register.component')
        .then(m => m.RegisterComponent)
  },

  {
    path: '**',
    redirectTo: 'products'
  }

];