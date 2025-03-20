import {Component, computed, inject, signal} from '@angular/core';
import {DatePipe} from '@angular/common';
import {PokemonBorderDirective} from '../../components/pokemon-border.directive';
import {RouterLink} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';
import {catchError, EMPTY} from 'rxjs';
import {PokemonService} from '../../services/pokemon.service';
import {Pokemon} from '../../models/pokemon.model';

@Component({
  selector: 'app-pokemon-list',
  imports: [
    DatePipe,
    PokemonBorderDirective,
    RouterLink
  ],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.css'
})
export class PokemonListComponent {
  msgError:any;
  private readonly pokemonService =inject(PokemonService)


  pokemonList=toSignal(this.pokemonService.getPokemonList().pipe(
      catchError(err => {
        this.msgError=err;
        return EMPTY
      })
    )
    ,{
      initialValue:[]
    })
  readonly searchTerm=signal('')
  readonly loading=computed(()=>this.pokemonList().length===0)

  readonly pokemonListFiltered= computed(()=>{
    const pokemonList=this.pokemonList();
    const searchTerm=this.searchTerm();
    return pokemonList.filter(pokemon=>pokemon.name.toLowerCase().includes(searchTerm.trim().toLowerCase()));
  })

  size(pokemon:Pokemon):string {
    if (pokemon.life<=10){
      return 'Petit'
    }
    if(pokemon.life>=25){
      return 'Grand'
    }
    return 'Moyen';
  }

  protected readonly console = console;
}
