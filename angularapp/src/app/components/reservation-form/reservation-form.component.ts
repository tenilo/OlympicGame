import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Offer } from 'src/app/models/offer';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { PaymentComponent } from '../payment/payment.component';
import { MatDialog } from '@angular/material/dialog';
import { OrderService } from '../../services/oder.service';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.scss']
})
export class ReservationFormComponent implements OnInit {
  reservationForm: FormGroup;
  cartItems: {offer:Offer, quantity:number} [] = []; 
  private subscriptions = new Subscription();


  constructor(private fb: FormBuilder, 
    private cartService: CartService,
    private authService: AuthService,
    private router: Router,
    public dialog: MatDialog) { }
    private orderService : OrderService

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();  // Récupère l'utilisateur actuel
    console.log("reservation form ", currentUser)
    this.reservationForm = this.fb.group({
      email: [currentUser?.email || '', [Validators.required, Validators.email]],  
      firstName: [currentUser?.firstName || '', Validators.required],  
      lastName: [currentUser?.lastName || '', Validators.required],  
    });

    this.subscriptions.add(
      this.cartService.getItems().subscribe(items => {
        this.cartItems = items;
      })
    );

  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }


  submitReservation() {
    if (this.reservationForm.valid) {
        console.log("Form Data:", this.reservationForm.value);
        // Ouvrir le popup de paiement
        this.openPaymentDialog();
    } else {
        console.log("Form is not valid.");
    }
  }
  calculateTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + (item.quantity * item.offer.price), 0);
  }  

  calculateTotal(): number {
    return this.cartItems.reduce((acc, item) => acc + (item.quantity * item.offer.price), 0);
  }

  openPaymentDialog() {
    const dialogRef = this.dialog.open(PaymentComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirmed') {
        // Traiter la confirmation de paiement
        console.log('Payment was successful');
        this.cartService.clearCart();
        this.router.navigate(['/success']);
      } else {
        console.log('Payment was cancelled');
      }
    });
  
  }

  saveOrder() {
    const orderData = {
      date: new Date().toISOString(),
      total: this.calculateTotal(),
      user: {
        userId: this.authService.getCurrentUser().id,
        userName: this.authService.getCurrentUser().userName
      },
      tickets: this.cartItems.map(item => ({
        offerId: item.offer.offerId,
        type: item.offer.type,
        quantity: item.quantity,
        price: item.offer.price
      }))
    };
  
    
    this.orderService.saveOrder(orderData).subscribe({
      next: (response) => console.log('Order saved successfully', response),
      error: (error) => console.error('Failed to save order', error)
    });
  }
}
