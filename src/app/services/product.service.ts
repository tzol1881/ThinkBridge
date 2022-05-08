import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/app/models/product.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  cart: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  constructor(private http: HttpClient) {
  }

  getProductList() {
    return fetch('https://fakestoreapi.com/products');
  }

  addToCart(product: Product) {
    let cart = [...this.cart.value];
    if(cart.find(item => item.id === product.id)){
      this.quantityOperation(product.id, 'increase');
    } else {
      cart.push(product);
      this.cart.next(cart);
    }
  }

  removeFromCart(index: number) {
    let cart = [...this.cart.value];
    cart.splice(index, 1);
    this.cart.next(cart);
  }

  quantityOperation(id: number, operation: string) {
    let cart = [...this.cart.value];
    let productIndex = cart.findIndex(product => product.id === id);
    let product = {...cart[productIndex]}
    if (operation === 'increase') {
      product.quantity = (product.quantity || 0) + 1;
    } else {
      (product.quantity || 0) > 0 && (product.quantity = (product.quantity || 0) - 1);
    }
    cart[productIndex] = product;
    this.cart.next(cart);
  }
}
