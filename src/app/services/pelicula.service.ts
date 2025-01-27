import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { Pelicula } from 'app/models/pelicula.model ';
import { UserService } from './user.service';

@Injectable({
    providedIn: 'root'
})
export class PeliculaService {
    private apiUrl = environment.BACKEND_URL + '/peliculas';

    constructor(
        private http: HttpClient,
        private userService: UserService
    ) {}

    getPeliculas(): Observable<any> {
        return this.http.get<Pelicula[]>(this.apiUrl);
    }

    setPelicula(pelicula: Pelicula): Observable<any> {
        const headers = {
            Authorization: `Bearer ${this.userService.getUser()?.oauth.access_token}`,
          }
        return this.http.post<Pelicula>(this.apiUrl, pelicula, { headers });
    }
}