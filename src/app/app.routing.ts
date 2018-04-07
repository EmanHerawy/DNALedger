import { Routes } from '@angular/router';
import {
  HomeComponent, CitizenAddComponent, CitizenEditComponent, CitizenSearchComponent,
  AddAuthComponent, AddDNAComponent, AuthComponent, CitizenListComponent, CitizenComponent
} from './index';


export const AppRouts: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  { path: 'home', component: HomeComponent },
  { path: 'citizen-profile', component: CitizenComponent },
  { path: 'list', component: CitizenListComponent },
  { path: 'add-citizen', component: CitizenAddComponent },
  { path: 'add-auth', component: AddAuthComponent },
  { path: 'edit-citizen', component: CitizenEditComponent },
  { path: 'search-citizen', component: CitizenSearchComponent },
  { path: 'citizen-dna', component: AddDNAComponent },
  { path: 'members', component: AuthComponent }, {
    path: '**',
    redirectTo: 'home'
  }
];


