import { Component, OnInit } from '@angular/core';
import { QRCodeService } from '../../services/qrcode.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-qr-code-display',
  templateUrl: './qr-code-display.component.html',
  styleUrls: ['./qr-code-display.component.scss']
})
export class QrCodeDisplayComponent implements OnInit {
  qrCodeValue: any;
  commandResume: any ;
  isLoading = true;

  constructor(
    private qrCodeService: QRCodeService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadUserData();
    
  }

  loadUserData(): void {
    const user: User = this.authService.getCurrentUser();
    if (user && user.userId) {
      this.qrCodeService.getQRCodeByUserId(user.userId).subscribe({
        next: (qrCode) => {
          this.qrCodeValue = qrCode.finalKey.toString();
          this.commandResume = qrCode.commandResume.toString();
          this.generateQrCodeData(user, this.commandResume);
          this.isLoading = false;
          
        },
        error: (error) => {
          console.error('Erreur lors de la récupération du QR Code:', error);
        }})
      
    } else {
      this.isLoading = false;
      console.error('No user logged in');
    }
  }

generateQrCodeData(user: User, command: any): void {
  const data = {
      nom: user.lastName,
      prenom: user.firstName,
      commandes: command
  };
  this.qrCodeValue = JSON.stringify(data);
  
 }
}
