import { Component, OnInit } from '@angular/core';
import { Offer } from 'src/app/models/offer';
import { CartService } from 'src/app/services/cart.service';
import { OfferService } from 'src/app/services/offer.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {
  offers: Offer[] = []
 

  constructor(private offerService: OfferService,private cartService : CartService) { }
  ngOnInit(): void {
    this.offerService.getOffers().subscribe({
      next: (data) => {
        this.offers = data;
      },
      error: (error) => console.error('Failed to load offers', error)
    });
    }

  addToCart(ticket : Offer): void {
    this.cartService.addToCart(ticket);
  }

}
