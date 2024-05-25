import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, timer } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Order } from '../models/order'; 

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  private baseUrl = 'https://localhost:7229/api/User'; 
  

  constructor(private http: HttpClient) {}
  getSalesWithOfferDetails(): Observable<Order>{
    return this.http.get<Order>(`${this.baseUrl}/CommadHistory`).pipe(
      tap(_ => console.log('fetched Order')),
      catchError(this.handleError<Order>('getOrder'))
    );
  }
  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
       console.log(`${operation} failed: ${error.message}`);
       return of(result as T);
    };
  }
}
