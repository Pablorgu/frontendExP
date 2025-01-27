import { Component, Input } from '@angular/core';
import { SubirImagenesComponent } from '../subir-imagenes/subir-imagenes.component';
import { MapasComponent } from '../mapas/mapas.component';
import { UserService } from '../../services/user.service';
import { Proyeccion } from '../../models/proyeccion.model';
import { SubirImagenesService } from 'app/services/subir-imagenes.service';
import { MapasService } from 'app/services/mapas.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProyeccionesService } from 'app/services/proyecciones.service';

@Component({
  selector: 'app-crear-proyeccion',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './crear-proyeccion.component.html'
})
export class CrearProyeccionComponent {
    user: any;
    proyeccionNew: Proyeccion;
    nombrePelicula: string = '';
    nombreSala: string = '';
    fecha: string = '';

  constructor(
    private userService: UserService,
    private proyeccionesService: ProyeccionesService,
    private router: Router,
  ) {
    this.user = this.userService.getUser();
    this.proyeccionNew = {
      nombrePelicula: '',
      nombreSala: '',
      fecha: '',
    };
   }
  ngOnInit(): void {
    
  }
  crearMarcador() {
    this.proyeccionNew.nombrePelicula = this.nombrePelicula;
    this.proyeccionNew.nombreSala = this.nombreSala;
    this.proyeccionNew.fecha = this.fecha;
    console.log(this.proyeccionNew);
    this.proyeccionesService.setProyeccion(this.proyeccionNew).subscribe((response: any) => {
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
