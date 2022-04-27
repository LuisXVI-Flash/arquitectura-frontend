import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import { map } from "rxjs/operators"

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private userSubject!: BehaviorSubject<any>
  public user!: Observable<any>

  endpoint: string = environment.be_url

  constructor(private http: HttpClient, private router: Router) { 
    this.userSubject = new BehaviorSubject<any>(null)
    this.userSubject.next(this.getuserData())
    this.user = this.userSubject.asObservable()
  }

  login(user: string, password: string): Observable<any> {
    return this.http.post<any>(
      `${this.endpoint}login`, { data: JSON.stringify({username: user, password: password})}
    )
  }

  updateToken(token: string): void {
    localStorage.setItem('access_token', token)
    this.getuserData()
  }

  getuserData() {
    let token = String(this.getToken())
    let array = token.split('.')
    let userData = array[1] ? JSON.parse(atob(array[1])) :  null
    this.userSubject.next(userData)
    return userData ? userData : null
  }

  getToken() {
    return localStorage.getItem('access_token')
  }

  get isLogged(): boolean {
    let authToken = localStorage.getItem('access_token')
    return (authToken !== null)
  }

  logout(redirect: boolean = true) {
    localStorage.removeItem('access_token')
    if (redirect) {
      this.router.navigate(['/login'])
    }
  }

}
