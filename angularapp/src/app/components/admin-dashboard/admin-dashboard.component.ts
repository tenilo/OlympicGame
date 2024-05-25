import { Component, OnInit, OnDestroy } from '@angular/core';
import { combineLatest,map,Subscription } from 'rxjs';
import { Offer } from 'src/app/models/offer';
import { Order } from 'src/app/models/order';
import { OfferService } from 'src/app/services/offer.service';
import { SalesService } from 'src/app/services/sales.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit, OnDestroy {
  offers: Offer[] = [];
  selectedOffer: Offer|null = null;
  salesDetails: Order;
  totalSales: number = 0;
  totalPrice: number = 0;
  salesByType: Map<string, { quantity: number, total: number }> = new Map();
  keySalesByType: any;
  private refreshSubscription: Subscription;

  constructor(private offerService: OfferService, private salesService: SalesService) { }

  ngOnInit(): void {
   
    this.refreshSubscription= combineLatest(this.offerService.getOffers(),this.salesService.getSalesWithOfferDetails())
    .subscribe(data =>{ 
      this.offers = data[0];
      this.salesDetails = data[1];
      this.aggregateSalesData();
      this.keySalesByType = Array.from(this.salesByType.keys());
      },
    err => console.error(err)
  );
  }

  loadOffers(){
   this.offerService.getOffers().subscribe(
    data => { this.offers = data
  })
  }

  loadSalesDetails(){
    this.salesService.getSalesWithOfferDetails().subscribe(
      data => { this.salesDetails = data

      }
    )
  }

  

  aggregateSalesData() {
    this.totalSales = this.salesDetails.total;
    this.salesByType.clear();
    this.salesDetails.tickets.forEach((ticket: { type: string; quantity: number; price: number }) => {
       
        const existing = this.salesByType.get(ticket.type) || { quantity: 0, total: 0 };
        existing.quantity= ticket.quantity;
        existing.total = ticket.quantity * ticket.price;
        this.totalPrice+= existing.total;
        this.salesByType.set(ticket.type, existing);
      });
    };
  
  showAddForm() {
    this.selectedOffer = { offerId: -1,type: '', access: 0, price: 0, description: '' };
  }

  showEditForm(offer: Offer) {
    this.selectedOffer = { ...offer };
  }

  onSubmit(offerData: Offer) {
    if (offerData.offerId !== -1) {
      this.offerService.updateOffer(offerData).subscribe(() => {
        this.loadOffers();
        this.loadSalesDetails();
        this.selectedOffer = null;
      });
    } else {
      this.offerService.addOffer(offerData).subscribe(() => {
        this.loadOffers();
        this.loadSalesDetails();
        this.selectedOffer = null;
      });
    }
  }

  deleteOffer(id: number) {
    if (id === undefined) {
      console.error('Tentative de suppression d\'une offre sans ID valide');
      return;
    }
    this.offerService.deleteOffer(id).subscribe(() => {
      this.loadOffers();
      this.loadSalesDetails();
    });
  }

  ngOnDestroy(): void {
    this.refreshSubscription.unsubscribe();
  }
}
