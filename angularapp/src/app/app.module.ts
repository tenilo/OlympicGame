import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { OffersComponent } from './components/offers/offers.component';
import { CartComponent } from './components/cart/cart.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule} from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ReservationFormComponent } from './components/reservation-form/reservation-form.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms'; 
import { AuthComponent } from './components/auth/auth.component';
import { OfferFormComponent } from './components/offer-form/offer-form.component';
import { HttpClientModule } from '@angular/common/http';
import { PaymentComponent } from './components/payment/payment.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { QrCodeDisplayComponent } from './components/qr-code-display/qr-code-display.component';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    OffersComponent,
    CartComponent,
    AdminDashboardComponent,
    AdminLoginComponent,
    NavbarComponent,
    ReservationFormComponent,
    AuthComponent,
    OfferFormComponent,
    PaymentComponent,
   QrCodeDisplayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatBadgeModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    QRCodeModule

    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

