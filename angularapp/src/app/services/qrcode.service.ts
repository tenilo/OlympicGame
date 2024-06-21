import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { QrCode } from '../models/qr-code';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QRCodeService {
  private baseUrl = environment.url;

  constructor(private http: HttpClient) {}

  
  getQRCodeByUserId(userId: number): Observable<QrCode> {
    return this.http.get<QrCode>(`${this.baseUrl}/User/QrCodeById?id=${userId}`).pipe(
      map(qrCodes => qrCodes),  
      catchError(error => throwError(() => new Error(`Failed to fetch QR code for user ${userId}: ${error.message}`)))

    );
  }

  
  
}

