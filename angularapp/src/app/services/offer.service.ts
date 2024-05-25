import { Injectable } from '@angular/core';
import { Offer } from '../models/offer';
import { BehaviorSubject, Observable, catchError, of, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  private offers: Offer[] = []; // Stock des offres initiales ou chargées.
  private offersSubject = new BehaviorSubject<Offer[]>(this.offers)
  private offersObservable = this.offersSubject.asObservable();
  private baseUrl: string = 'https://localhost:7229/api/Offre'
  //private baseUrl: string = 'http://tenilo-001-site1.ctempurl.com/'
  //private baseUrl = environment.url;
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'}),
  };

  constructor(private http : HttpClient
    
  ) { }
    
  getOffers(): Observable<Offer[]> {
    return this.http.get<Offer[]>(`${this.baseUrl}/AllOffres`).pipe(
      tap(_ => console.log('fetched Offer')),
      catchError(this.handleError<Offer[]>('getOffer', []))
    );
  }
    
  addOffer(newOffer: Offer): Observable<any> {
    return this.http.post<Offer>(`${this.baseUrl}/CreateNewOffre`,newOffer,this.httpOptions).pipe(
      tap(_ => console.log('fetched Offer')),
      catchError(this.handleError<Offer>('getOffer'))
    );
  }
    
    updateOffer(updatedOffer: Offer) : Observable<any> {
    return this.http.put<Offer>(`${this.baseUrl}/UpdateOffre`,updatedOffer,this.httpOptions).pipe(
      tap(_ => console.log('fetched Offer')),
      catchError(this.handleError<Offer>('updateOffer'))
    );
    }
    
    deleteOffer(id: number): Observable<any> {
    return this.http.delete<Offer>(`${this.baseUrl}/DeleteOffre?id=`+id).pipe(
      tap(_ => console.log('fetched Offer')),
      catchError(this.handleError<Offer>('deleteOffer'))
    );
    }

    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
         console.log(`${operation} failed: ${error.message}`);
         return of(result as T);
      };
    }
}
