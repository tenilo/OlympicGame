import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Offer } from 'src/app/models/offer';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {

  cartItems: {offer: Offer, quantity: number} []= [];
  private cartSub: Subscription;

  constructor(private cartService: CartService, private router: Router,
    private authService: AuthService,  

  ) { }

  ngOnInit(): void {
    this.cartSub = this.cartService.getItems().subscribe(items => {
      this.cartItems = items;
    });
  }

  ngOnDestroy(): void {
    if (this.cartSub) {
      this.cartSub.unsubscribe();
    }
  }

  increaseQuantity(index: number): void {
    this.cartService.increaseQuantity(index);
    
  }

  decreaseQuantity(index: number): void {
    this.cartService.decreaseQuantity(index);
    
  }

  removeFromCart(index: number): void {
    this.cartService.removeFromCart(index);
  }

  clearCart(): void {
    if (confirm('Êtes-vous sûr de vouloir vider votre panier ?')) {
      this.cartService.clearCart();
    }
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.offer.price * item.quantity, 0);
  }

  goToReservationForm() {
    this.authService.isLoggedIn.subscribe(isLoggedIn => {
      if (isLoggedIn) {
        // Si l'utilisateur est connecté, le diriger vers la page de réservation
        if (this.cartItems.length > 0) {
          this.router.navigate(['/reservation']);
        } else {
          alert('Votre panier est vide. Ajoutez des articles avant de finaliser la commande.');
        }
      } else {
        // Si l'utilisateur n'est pas connecté, le rediriger vers la page de connexion
        this.router.navigate(['admin/login'], { queryParams: { returnUrl: '/reservation' } });
      }
    });
  }
  goBacToOffer(){
    this.router.navigate(['/offers']);
  }
  
}
