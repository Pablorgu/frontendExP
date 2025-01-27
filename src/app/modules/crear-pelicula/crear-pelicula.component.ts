import { Component, Input } from '@angular/core';
import { SubirImagenesComponent } from '../subir-imagenes/subir-imagenes.component';
import { MapasComponent } from '../mapas/mapas.component';
import { UserService } from '../../services/user.service';
import { SubirImagenesService } from 'app/services/subir-imagenes.service';
import { MapasService } from 'app/services/mapas.service';
import { Router } from '@angular/router';
import { PeliculaService } from 'app/services/pelicula.service';
import { Pelicula } from 'app/models/pelicula.model ';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-crear-Pelicula',
  standalone: true,
  imports: [SubirImagenesComponent,FormsModule],
  templateUrl: './crear-pelicula.component.html'
})
export class CrearPeliculaComponent {
  user: any;
  PeliculaNew: Pelicula
  nombrePelicula: string = ''; 

  constructor(
    private userService: UserService,
    private subirImagenesService: SubirImagenesService,
    private router: Router,
    private peliculasService: PeliculaService
  ) {
    this.user = this.userService.getUser();
    this.PeliculaNew = {
      titulo: '',
      imagen: ''
    };
   }
  ngOnInit(): void {
    
  }



  crearMarcador() {
    console.log(this.PeliculaNew);
    this.PeliculaNew.titulo = this.nombrePelicula;
    this.PeliculaNew.imagen = this.subirImagenesService.getUrl();
    this.peliculasService.setPelicula(this.PeliculaNew).subscribe((response: any) => {
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
