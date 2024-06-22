import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent {
  username = '';
  password = '';
  errorMessage = '';
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: (response: any) => {
        if (this.authService.isLoggedIn) {
          const user = JSON.parse(localStorage.getItem('user') || '{}');
          if (user.isAdmin === true) {
            this.router.navigate(['admin/dashboard']);
          } else {
            this.router.navigate(['reservation']);
          }
        }
      },
      error: (error: any) => {
        console.error('Login failed', error);
        this.errorMessage = 'Username or password is incorrect';
      }
    });
  }
  redirectToSignUp() {
    this.router.navigate(['/auth']);  
  }
}
