import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Offer } from 'src/app/models/offer';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
     cartItemCount: number = 0;
     cartItem: { offer: Offer, quantity: number}[];
     isLoggedIn$: Observable<boolean>;
     userType: Observable<string>;
     ;

  constructor(public cartService: CartService, private authService : AuthService, private router : Router) {
    this.cartService.getItems().subscribe(items => {
       this.cartItemCount = 0;
       this.cartItem = items;
       this.sommeQuantity();
    });

    this.isLoggedIn$ = this.authService.isLoggedIn;

    
    //this.userType = this.authService.userTypeAsObservable();

   }

   logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['home'])
      console.log("Déconnexion réussie");
     
    });
  }
  sommeQuantity(){
    this.cartItem.forEach( (x : { offer: Offer, quantity: number}) =>{
      this.cartItemCount += x.quantity;
    } )
  }

}
