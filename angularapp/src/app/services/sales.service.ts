import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { catchError,  tap } from 'rxjs/operators';
import { Order } from '../models/order'; 
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  private baseUrl = environment.url; 
  

  constructor(private http: HttpClient) {}
  getSalesWithOfferDetails(): Observable<Order>{
    return this.http.get<Order>(`${this.baseUrl}/User/CommadHistory`).pipe(
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
