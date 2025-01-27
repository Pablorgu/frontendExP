import { Component, Input } from '@angular/core';
import { MapasComponent } from '../mapas/mapas.component';
import { UserService } from '../../services/user.service';
import { Sala } from '../../models/sala.model';
import { MapasService } from 'app/services/mapas.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crear-sala',
  standalone: true,
  imports: [MapasComponent,FormsModule],
  templateUrl: './crear-sala.component.html'
})
export class CrearSalaComponent {
  user: any;
  salaNew: Sala
  nombreSala: string = ''; 

  constructor(
    private userService: UserService,
    private mapasService: MapasService,
    private router: Router,
  ) {
    this.user = this.userService.getUser();
    this.salaNew = {
      lat: 0,
      lon: 0,
      email: this.user.email,
      nombre: '',
    };
   }
  ngOnInit(): void {
    
  }

  recibirMarcador(marcador: { lat: number; lon: number}): void {
    console.log('Marcador recibido del hijo:', marcador);
    this.salaNew.lat = marcador.lat;
    this.salaNew.lon = marcador.lon;
  }

  crearMarcador() {
    console.log(this.salaNew);
    this.salaNew.nombre = this.nombreSala;
    this.mapasService.postSala(this.salaNew).subscribe((response: any) => {
      console.log(response);
      this.router.navigate(['/dashboard']);
    }, (error: any) => {
      console.error(error);
    });
  }

  Volver() {
    this.router.navigate(['/dashboard']);
  }
}
