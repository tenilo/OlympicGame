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
  errorMessage = '';
  emailError = 'Le mail saisi n\' est pas valide.'

  

  constructor(private fb: FormBuilder,private authService: AuthService,
    private router: Router) {}

  ngOnInit() {
    this.authForm = this.fb.group({
      firstName: ['', [Validators.required,this.firstNameValidator('firstName')]],
      lastName: ['', [Validators.required,this.firstNameValidator('lastName')]],
      username: ['', [Validators.required,this.firstNameValidator('username')]],
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

  firstNameValidator(name: string): Validators {
    return (control: AbstractControl): ValidationErrors | null => {
      name = control.value;
      const errors: ValidationErrors = {};
      if (!name) return null;
      if (name.length > 50) errors['maxLength'] = 'Le champ ne doit pas dépasser 50 caractères.';
      if (name.length < 2) errors['minLength'] = 'Le champ doit contenir au moins 2 caractères.';
      return Object.keys(errors).length ? errors : null;
    };
  }

  emailValidator(): Validators {
    return (control: AbstractControl): ValidationErrors | null => {
      const email = control.value;
      const errors: ValidationErrors = {};
      if (!email) return null;
      if (!Validators.email) errors['mail'] = 'Le mail saisi n\' est pas valide.';
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
          this.errorMessage = 'some error occurred when trying to save user'
        }
      });
    }
    
}
}
