import { Injectable } from "@angular/core"
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { environment } from "../../environments/environment";
import * as L from "leaflet"
import { catchError, Observable, throwError } from "rxjs"
import { Marcador } from "../models/marcador.model";
import { UserService } from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class MapasService {
  private apiUrl = environment.BACKEND_URL + '/marcadores/';
  private map:any

  constructor(private http: HttpClient,
    private userService: UserService
  ) {}

  setReferenceToMap(map:any) {
    this.map = map
  }

  addMarker(lat:number, lon:number, label = ""):void {
    if (this.map) {
      this.map.addMarker(lat, lon, label)
    }
  }

  emitirMarcador() {
    if (this.map) {
      this.map.mapaCreated.emit("Marcador creado")
    }
  }

  searchByQuery(params: {
    query?: string
    lat?: number
    lon?: number
  }): Observable<any> {
    let url = this.apiUrl

    if (params.query) {
      url += `?q=${encodeURIComponent(params.query)}`
    } else if (params.lat !== undefined && params.lon !== undefined) {
      url += `?lat=${params.lat}&lon=${params.lon}`
    } else {
      throw new Error("Debe proporcionar una 'query' o 'lat' y 'lon'")
    }

    return this.http.get<any>(url).pipe(
      catchError((error) => {
        console.error("Error al buscar ubicación:", error)
        return throwError(() => error)
      }),
    )
  }


//extras
  getMarkersbyEmail(email: string): Observable<any> {
    return this.http.get<Marcador[]>(this.apiUrl + "todos?email=" + email).pipe(
      catchError((error) => {
        console.error("Error al obtener los marcadores", error)
        return throwError(() => error)
      })
    )
  }

  postMarker(marker: Marcador): Observable<any> {
    const headers = {
      Authorization: `Bearer ${this.userService.getUser()?.oauth.access_token}`,
    }
    return this.http.post(this.apiUrl, marker, {headers}).pipe(
      catchError((error) => {
        console.error("Error al crear el marcador", error)
        return throwError(() => error)
      })
    )
  }
    

}