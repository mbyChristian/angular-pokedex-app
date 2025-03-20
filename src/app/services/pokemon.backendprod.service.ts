import {PokemonService} from './pokemon.service';
import {inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Pokemon, PokemonList} from '../models/pokemon.model';


export class PokemonBackendprodService implements PokemonService{

  private readonly http=inject(HttpClient)
  private readonly BASE_URL:string= 'https://idyllic-bloom-453411-n7.ew.r.appspot.com/pokemons';

  getPokemonList(): Observable<PokemonList> {
    return this.http.get<PokemonList>(this.BASE_URL+'/');
  }

  getPokemonById(id: number): Observable<Pokemon>{
    return this.http.get<Pokemon>(this.BASE_URL+'/'+id);
  }

  deletePokemon(id: number): Observable<void> {
    return  this.http.delete<void>(`${this.BASE_URL}/${id}`);
  }

  updatePokemon(pokemon:Pokemon):Observable<Pokemon>{
    const url=`${this.BASE_URL}/update/${pokemon.id}`;
    return this.http.put<Pokemon>(url, pokemon)
  }
  addPokemon(pokemon: Omit<Pokemon, 'id'>): Observable<Pokemon> {
    return this.http.post<Pokemon>(`${this.BASE_URL}/`, pokemon);
  }

  getPokemonTypeList():string[]{
    return [
      'Plante',
      'Feu',
      'Eau',
      'Insecte',
      'Normal',
      'Electrik',
      'Poison',
      'Fee',
      'Vol'
    ]
  }
}
