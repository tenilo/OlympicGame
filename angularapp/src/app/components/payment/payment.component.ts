import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Offer } from 'src/app/models/offer';
import { OrderService } from '../../services/oder.service';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {
  cardNumber: string = '';
  expiryDate: string = '';
  cvv: string = '';
  cartItems: {offer:Offer, quantity:number} [] = [];
  currentUser: { userId: number, userName: string };

  constructor(public dialogRef: MatDialogRef<PaymentComponent>,
    private orderService: OrderService,
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  )  { }
  

  processPayment() {
    if (this.validatePaymentDetails()) {
      this.cartItems = this.cartService.getItems().value; 
     
      this.currentUser = this.authService.getCurrentUser();
      const orderItems = this.cartItems.map(item => ({
        offerId: item.offer.offerId,
        type: item.offer.type,
        quantity: item.quantity,
        price: item.offer.price
        }));
        
        this.orderService.createOrder(orderItems, this.currentUser).subscribe({
        next: (response) => {
          alert('Paiement effectué avec succès!');
          this.cartService.clearCart();
          this.dialogRef.close();
          this.router.navigate(['qrcode']);
        },
        error: (error) => {
          console.error('Failed to create order:', error);
        }
      });
    } else {
      alert('Veuillez remplir tous les champs relatifs à votre carte de crédit.');
    }
  }

  validatePaymentDetails(): boolean {
    return this.cardNumber.trim() !== '' && this.expiryDate.trim() !== '' && this.cvv.trim() !== '';
  }
  }
