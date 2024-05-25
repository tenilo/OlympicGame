import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  authForm: FormGroup;

  

  constructor(private fb: FormBuilder,private authService: AuthService,
    private router: Router) {}

  ngOnInit() {
    this.authForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.passwordValidator()]]
    });
  }
  passwordValidator(): Validators {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.value;
      const errors: ValidationErrors = {};
      if (!password) return null;
      if (password.length < 8) errors['minLength'] = 'Le mot de passe doit contenir au moins 8 caractères.';
      if (!/[A-Z]/.test(password)) errors['uppercase'] = 'Le mot de passe doit contenir une majuscule.';
      if (!/[a-z]/.test(password)) errors['lowercase'] = 'Le mot de passe doit contenir une minuscule.';
      if (!/[0-9]/.test(password)) errors['digit'] = 'Le mot de passe doit contenir un chiffre.';
      if (!/[\W_]/.test(password)) errors['specialChar'] = 'Le mot de passe doit contenir un caractère spécial.';
      return Object.keys(errors).length ? errors : null;
    };
  }

  onSubmit() {
    if (this.authForm.valid) {
     
      this.authService.signUp(this.authForm.value).subscribe({
        next: (response) => {
          console.log('Registration successful', response);
          this.router.navigate(['admin/login']); 
        },
        error: (error) => {
          console.error('Registration failed', error);
        }
      });
    }
}
}
