import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Order } from '../models/order';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = environment.url;
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'}),
  };
  constructor(private http: HttpClient) {}

  createOrder(cartItems: { offerId: number,type: string, quantity: number, price: number }[], user: { userId: number, userName: string }): Observable<any> {
    const order: Order = {
      date: new Date().toISOString(),
      total: this.calculateTotal(cartItems),
      resume: this.createResume(cartItems),
      user:{
        userId: user.userId,
        userName: user.userName
      },
      
      tickets: cartItems
    };
    
    return this.http.post<any>(`${this.baseUrl}/User/Command`, order,this.httpOptions);
  }
  

    private calculateTotal(cartItems: {quantity: number, price: number}[]): number {
      return cartItems.reduce((total, item) => total + (item.quantity * item.price), 0);
    }

    private createResume(cartItems: {quantity: number, type: string}[]): string {
      return cartItems.map(item => `${item.quantity} ticket(s) ${item.type}`).join(", ");
    }

  saveOrder(orderData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/User/orders`, orderData);
  }

  getQRCodeByUserId(userId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/User/orders?userId=${userId}`).pipe(
      map(response => response[0])
    );
  }
}
