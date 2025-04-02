import { Routes } from '@angular/router';
import {PokemonEditComponent} from './pages/pokemon-edit/pokemon-edit.component';
import {PokemonProfileComponent} from './pages/pokemon-profile/pokemon-profile.component';
import {PokemonListComponent} from './pages/pokemon-list/pokemon-list.component';
import {PokemonAddComponent} from './pages/pokemon-add/pokemon-add.component';
import {NotFoundComponent} from './pages/not-found/not-found.component';


export const routes: Routes = [
  {path:'pokemons/edit/:id',component:PokemonEditComponent,title:'edition d\'un pokemon'},
  {path:'pokemons/:id',component:PokemonProfileComponent, title: 'Pokemon'},
  {path :'pokemons',component:PokemonListComponent, title: 'Pokedex'},
  {path:'add-pokemon',component:PokemonAddComponent,title:'Add Pokemon'},
  {path:'',redirectTo:'pokemons', pathMatch: 'full'},
  {path:'**',component:NotFoundComponent, title: 'Not Found'}
];
