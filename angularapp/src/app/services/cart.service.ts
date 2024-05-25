import { Injectable } from '@angular/core';
import { Offer } from '../models/offer';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private itemsInCartSubject = new BehaviorSubject<{ offer: Offer, quantity: number}[]>([]);

  constructor() { 
    this.loadInitialData();
    this.itemsInCartSubject.subscribe(items => {
      localStorage.setItem('cartItems', JSON.stringify(items));
    });
  }

  loadInitialData() {
    let items = localStorage.getItem('cartItems');
    if (items) {
      this.itemsInCartSubject.next(JSON.parse(items));
    }
  }

  addToCart(ticket: Offer): void {
    const currentItems = this.itemsInCartSubject.value;
    const existingItemIndex = currentItems.findIndex(item => item.offer.offerId === ticket.offerId);
    if (existingItemIndex !== -1) {
      // augmente la quantité si l'offre est selectionnée plus d'une fois
      const updatedItem = {
        ...currentItems[existingItemIndex],
        quantity: currentItems[existingItemIndex].quantity + 1
      };
      const updatedItems = [...currentItems];
      updatedItems[existingItemIndex] = updatedItem;
      this.itemsInCartSubject.next(updatedItems);
      
    } else {
      // ajoute une nouvelle offre avec quantity égale à 1
     this.itemsInCartSubject.next([...currentItems, { offer: ticket, quantity: 1}]);
    }
  }

  removeFromCart(index: number): void {
    const currentItems = this.itemsInCartSubject.value;
    const updatedItems = currentItems.filter((_, i) => i !== index);
    this.itemsInCartSubject.next(updatedItems);
  }

  increaseQuantity(index: number): void {
   const currentItems = this.itemsInCartSubject.value;
    const updatedItems = [...currentItems];
    updatedItems[index].quantity += 1;
    this.itemsInCartSubject.next(updatedItems);
  }

  decreaseQuantity(index: number): void {
    const currentItems = this.itemsInCartSubject.value;
    if (currentItems[index].quantity > 1) {
      const updatedItems = [...currentItems];
      updatedItems[index].quantity -= 1;
      this.itemsInCartSubject.next(updatedItems);
    } else {
      // Enleve l'offre si la quntite est 1
      this.removeFromCart(index);
    }
  }
  getTotalPrice(): number {
    const currentItems = this.itemsInCartSubject.value;
    return currentItems.reduce((total, item) => total + (item.offer.price * item.quantity), 0);
  }

  clearCart(): void {
    this.itemsInCartSubject.next([]);
    
  }

  getItems(): BehaviorSubject<{ offer: Offer, quantity: number }[]> {
    return this.itemsInCartSubject;
  }
}
