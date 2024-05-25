import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { User } from '../models/user';
import { Order } from '../models/order';
import { QrCode } from '../models/qr-code';

@Injectable({
  providedIn: 'root'
})
export class QRCodeService {
  private baseUrl = 'https://localhost:7229/api/User';

  constructor(private http: HttpClient) {}

  
  getQRCodeByUserId(userId: number): Observable<QrCode> {
    return this.http.get<QrCode>(`${this.baseUrl}/QrCodeById?id=${userId}`).pipe(
      map(qrCodes => qrCodes),  
      catchError(error => throwError(() => new Error(`Failed to fetch QR code for user ${userId}: ${error.message}`)))

    );
  }

  
  
}

