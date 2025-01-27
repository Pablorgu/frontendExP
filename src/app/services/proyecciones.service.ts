import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { Proyeccion } from 'app/models/proyeccion.model';
import { UserService } from './user.service';


@Injectable({
    providedIn: 'root'
})
export class ProyeccionesService {
    private apiUrl = environment.BACKEND_URL + '/proyecciones';

    constructor(private http: HttpClient,
        private userService: UserService
    ) {}

    getProyecciones(): Observable<any> {
        return this.http.get<Proyeccion[]>(this.apiUrl);
    }

    setProyeccion(proyeccion: Proyeccion): Observable<any> {
        const headers = {
            Authorization: `Bearer ${this.userService.getUser()?.oauth.access_token}`,
          }
        return this.http.post<Proyeccion>(this.apiUrl, proyeccion, { headers });
    }
}
