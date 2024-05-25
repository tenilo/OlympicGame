import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { OffersComponent } from './components/offers/offers.component';
import { CartComponent } from './components/cart/cart.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ReservationFormComponent } from './components/reservation-form/reservation-form.component';
import { authGuard } from './auth.guard';
import { AuthComponent } from './components/auth/auth.component';
import { PaymentComponent } from './components/payment/payment.component';
import { QrCodeDisplayComponent } from './components/qr-code-display/qr-code-display.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'offers', component: OffersComponent},
  {path:'cart', component: CartComponent},
  { path: 'reservation', component: ReservationFormComponent, canActivate: [authGuard] },
  {path:'admin/login', component: AdminLoginComponent},
  {path:'admin/dashboard', component: AdminDashboardComponent, canActivate: [authGuard]},
  {path:'auth', component: AuthComponent},
  { path: 'payment', component: PaymentComponent , canActivate: [authGuard]},
  { path: 'qrcode', component: QrCodeDisplayComponent , canActivate: [authGuard]},
  {path:'**', redirectTo:''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
