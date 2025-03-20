import {Component, computed, inject} from '@angular/core';
import {DatePipe} from '@angular/common';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {PokemonService} from '../../services/pokemon.service';
import {toSignal} from '@angular/core/rxjs-interop';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {DialogDeleteComponent} from '../../components/dialog-delete/dialog-delete.component';
import {catchError, map, of} from 'rxjs';

@Component({
  selector: 'app-pokemon-profile',
  imports: [DatePipe, RouterLink],
  templateUrl: './pokemon-profile.component.html',
  styleUrl: './pokemon-profile.component.css'
})
export class PokemonProfileComponent {
  private readonly snackBar=inject(MatSnackBar);
  private readonly route=inject(ActivatedRoute);
  private readonly router=inject(Router);
  private readonly dialog=inject(MatDialog);
  private readonly pokemonService=inject(PokemonService);

  private readonly pokemonId=Number(this.route.snapshot.paramMap.get('id'));

  private readonly pokemonResponse=toSignal(this.pokemonService.getPokemonById(this.pokemonId)
    .pipe(map(pokemon=>({value:pokemon,error:undefined})),
      catchError(error=>of({value:undefined,error:error}))))
  readonly loading =computed(()=>this.pokemonResponse()===undefined)
  readonly error=computed(()=>this.pokemonResponse()?.error)
  readonly pokemon=computed(()=>this.pokemonResponse()?.value);


  onDelete() {
    const dialog = this.dialog.open(DialogDeleteComponent, {
      width: '200px',
      height: '180px'
    });


    dialog.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.pokemonService.deletePokemon(this.pokemonId).subscribe({
          next: () => {
            this.router.navigateByUrl('/pokemons').then(() => {
              this.snackBar.open('Pokemon deleted successfully.', 'OK', {
                duration: 1000,
                verticalPosition: 'bottom',
                horizontalPosition: 'center',
                panelClass: ['snack-bar-custom']
              });
            });
          },
        });
      }
    });
  }
}
