import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.url;

  private loggedIn = new BehaviorSubject<boolean>(this.checkInitialLoginStatus());
  private userType = new BehaviorSubject<string>('user'); 
  private checkInitialLoginStatus(): boolean {
    return !!localStorage.getItem('user');  // Retourne true si 'user' est stocké dans localStorage
  }
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'}),
  };
  constructor(private http: HttpClient) {}

  get isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  userTypeAsObservable(): Observable<string> {
    return this.userType.asObservable();
  }


  
  login(email: string, password: string): Observable<any> {
    let data ={
      "username": email,
      "password": password
      };
     
    return this.http.post<any>(`${this.baseUrl}/User/authentificate`, data,this.httpOptions).pipe(
      tap(users => {
        if (users) {
          const user = users;
          localStorage.setItem('user', JSON.stringify(user));
          this.loggedIn.next(true);  // Activer le statut de connexion
          
        } else {
          this.loggedIn.next(false);  // Désactiver le statut de connexion si aucun utilisateur n'est trouvé
        }
      }),
      catchError(error => {
        this.loggedIn.next(false);  //  désactiver le statut de connexion en cas d'erreur
        console.error('Login error:', error);
        return throwError(() => new Error('Failed to login: ' + error.message));
      })
    );
  }
  
  

  logout(): Promise<void> {
    localStorage.removeItem('user');  // Supprimez les données de l'utilisateur stockées
    this.loggedIn.next(false);  // Réinitialiser le statut de connexion
    return Promise.resolve();
  }
  

  signUp(userData: { firstName: string; lastName: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/User/NewUser`, userData,this.httpOptions);
  }
  getCurrentUser() {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      return JSON.parse(userJson);
    }
    return null;
  }
  

  

}
