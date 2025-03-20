import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Pokemon, PokemonList} from '../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export abstract class PokemonService {

  abstract getPokemonList(): Observable<PokemonList>
  abstract getPokemonById(id: number): Observable<Pokemon>
  abstract deletePokemon(id: number): Observable<void>
  abstract updatePokemon(pokemon:Pokemon):Observable<Pokemon>
  abstract addPokemon(pokemon: Omit<Pokemon, 'id'>): Observable<Pokemon>
  abstract getPokemonTypeList():string[]
}
