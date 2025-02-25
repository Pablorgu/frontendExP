import { Injectable } from "@angular/core"
import { BehaviorSubject, Observable } from "rxjs"
import { User } from "../models/user.model"
import { HttpClient } from "@angular/common/http"
import { environment as env } from "../../environments/environment"
import { Control } from "leaflet"

@Injectable({
  providedIn: "root",
})
export class UserService {
  private apiUrl = `${env.BACKEND_URL}/usuarios/`
  private user$: BehaviorSubject<User | null>
  private user: User | null = null

  constructor(private http: HttpClient) {
    this.user$ = new BehaviorSubject<User | null>(this.loadUserFromStorage())
    this.user = this.loadUserFromStorage()
  }

  private loadUserFromStorage(): User | null {
    const userJson = localStorage.getItem("user")
    return userJson ? JSON.parse(userJson) : null
  }

  private saveUserToStorage(user: User): void {
    localStorage.setItem("user", JSON.stringify(user))
  }

  clearUser(): void {
    this.user = null
    this.user$.next(null)
    localStorage.removeItem("user")
  }

  getUserObservable(): Observable<User | null> {
    return this.user$.asObservable()
  }

  getUser(): User | null {
    return this.loadUserFromStorage() ?? this.user
  }

  setUser(user: User): void {
    if (user != this.user) {
      this.user = user
      this.saveUserToStorage(user)
      this.user$.next(user)
    }
  }

  saveUserToDb(user: User): Observable<any> {
    const userData = {
      googleId: user.id,
      name: user.name,
      email: user.email,
      access_token: user.oauth.access_token,
      expires_in: user.oauth.expires_in,
    }
    const headers = {
      Authorization: `Bearer ${user.oauth.access_token}`,
    }
    return this.http.post(this.apiUrl, userData, { headers })
  }

  createUser(user: User): Observable<any> {
    const userData = {
      googleId: user.id,
      name: user.name,
      email: user.email,
      access_token: user.oauth.access_token,
      expires_in: user.oauth.expires_in,
    }
    const headers = {
      Authorization: `Bearer ${user.oauth.access_token}`,
    }
    return this.http.post(this.apiUrl + "crear", userData, {headers})
  }
}
