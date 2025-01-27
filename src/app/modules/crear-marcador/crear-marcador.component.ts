// import { Component, Input } from '@angular/core';
// import { SubirImagenesComponent } from '../subir-imagenes/subir-imagenes.component';
// import { MapasComponent } from '../mapas/mapas.component';
// import { UserService } from '../../services/user.service';
// import { Sala } from '../../models/marcador.model';
// import { SubirImagenesService } from 'app/services/subir-imagenes.service';
// import { MapasService } from 'app/services/mapas.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-crear-marcador',
//   standalone: true,
//   imports: [SubirImagenesComponent,MapasComponent],
//   templateUrl: './crear-marcador.component.html'
// })
// export class CrearMarcadorComponent {
//   user: any;
//   marcadorNew: Sala

//   constructor(
//     private userService: UserService,
//     private subirImagenesService: SubirImagenesService,
//     private mapasService: MapasService,
//     private router: Router,
//   ) {
//     this.user = this.userService.getUser();
//     this.marcadorNew = {
//       lat: 0,
//       lon: 0,
//       email: this.user.email,
//       imagen: ''
//     };
//    }
//   ngOnInit(): void {
    
//   }

//   recibirMarcador(marcador: { lat: number; lon: number}): void {
//     console.log('Marcador recibido del hijo:', marcador);
//     this.marcadorNew.lat = marcador.lat;
//     this.marcadorNew.lon = marcador.lon;
//   }

//   crearMarcador() {
//     console.log(this.marcadorNew);
//     this.marcadorNew.imagen = this.subirImagenesService.getUrl();
//     this.mapasService.postSala(this.marcadorNew).subscribe((response: any) => {
//       console.log(response);
//       this.router.navigate(['/dashboard']);
//     }, (error: any) => {
//       console.error(error);
//     });
//   }

//   Volver() {
//     this.router.navigate(['/dashboard']);
//   }
// }
