import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'pokemon-detalle/:id',
    loadComponent: () => import('./pages/pokemon-detalle/pokemon-detalle.page').then( m => m.PokemonDetallePage)
  },
];
