import { CommonModule, JsonPipe, NgIf } from '@angular/common';
import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGoogleService } from '../../services/auth-google.service';
import { UserService } from '../../services/user.service';
import { MapasComponent } from "../mapas/mapas.component";
import { MapasService } from '../../services/mapas.service';
import { Marcador } from '../../models/marcador.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MapasComponent],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  profile: any;
  user: any;
  markers: Marcador[] = [];
  // token: string;

  constructor(
    private authService: AuthGoogleService,
    private router: Router,
    private userService: UserService,
    private mapService: MapasService,
  ) {
    this.profile = this.authService.profile;
    this.user = this.userService.getUser();
  }

  ngOnInit(): void {
    console.log(this.userService.getUser());
    this.mapService.getMarkersbyEmail(this.user.email).subscribe((markers: any) => {
      this.markers = markers.marcadores;
      console.log(this.markers);
        for (let marker of this.markers) {
          this.mapService.addMarker(marker.lat, marker.lon);
        }
    });
    // this.profile.subscribe((profile: any) => {
    //   if (profile) {
    //     console.log(profile);
    //     const { name, email, picture, sub } = profile;
    //     this.userService.setUser({
    //       name,
    //       email,
    //       imagen: picture,
    //       googleId: sub,
    //     });
    //   }
    // });
  }

  logOut() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  toProfile() {
    this.router.navigate(['/profile']);
  }

  crearEvento() {
     this.router.navigate(['/crear-marcador']);
  }

  toLog() {
    this.router.navigate(['/log']);
  }
}
