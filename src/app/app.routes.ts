import { Routes } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { ProfileComponent } from './modules/profile/profile.component';
import { LogComponent } from './modules/log/log.component';
import { AuthGuard } from './guards/auth.guards';
import { BridgeComponent } from './modules/bridge/bridge.component';
import { CrearSalaComponent } from './modules/crear-sala/crear-sala.component';
import { CrearPeliculaComponent } from './modules/crear-pelicula/crear-pelicula.component';
import { CrearProyeccionComponent } from './modules/crear-proyeccion/crear-proyeccion.component';


export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent},
  { path: 'log', component: LogComponent, canActivate: [AuthGuard] },
  { path: 'bridge', component: BridgeComponent},
  { path: 'crear-sala', component: CrearSalaComponent},
  { path: 'crear-pelicula', component: CrearPeliculaComponent},
  { path: 'crear-proyeccion', component: CrearProyeccionComponent},
];
