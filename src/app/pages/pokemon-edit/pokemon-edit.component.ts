import {Component, computed, effect, inject} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {JsonPipe} from '@angular/common';
import { PokemonService } from '../../services/pokemon.service';
import {toSignal} from '@angular/core/rxjs-interop';
import {catchError, map, of} from 'rxjs';
import {getPokemonColor, POKEMON_REGLE} from '../../models/pokemon.model';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-pokemon-edit',
  imports: [
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './pokemon-edit.component.html',
  styleUrl: './pokemon-edit.component.css'
})
export class PokemonEditComponent {
  private readonly toastr=inject(ToastrService);
  private readonly route=inject(ActivatedRoute);
  private readonly router=inject(Router);
  readonly pokemonService=inject(PokemonService);
  private readonly pokemonId=Number(this.route.snapshot.params['id'])
  // readonly pokemon=toSignal<Pokemon>(this.pokemonService.getPokemonById(this.pokemonId));

  private readonly pokemonResponse=toSignal(this.pokemonService.getPokemonById(this.pokemonId)
    .pipe(map(pokemon=>({value:pokemon,error:undefined})),
      catchError(error=>of({value:undefined,error:error}))))
  readonly loading =computed(()=>this.pokemonResponse()===undefined)
  readonly error=computed(()=>this.pokemonResponse()?.error)
  readonly pokemon=computed(()=>this.pokemonResponse()?.value);

  readonly form =new FormGroup({
    name: new FormControl('',[
      Validators.required,
      Validators.maxLength(POKEMON_REGLE.MAX_NAME),
      Validators.minLength(POKEMON_REGLE.MIN_NAME),
      Validators.pattern(POKEMON_REGLE.NAME_PATTERN),
    ]),
    life: new FormControl(),
    damage: new FormControl(),
    types : new FormArray(
      [],
      [
        Validators.required,
        Validators.max(POKEMON_REGLE.MAX_TYPE),
        Validators.min(POKEMON_REGLE.MIN_TYPE)
      ]
    )
  })

  constructor(){
    effect(() => {
      const pokemon=this.pokemon()
      if (pokemon){
        this.form.patchValue({
          name: pokemon.name,
          life: pokemon.life,
          damage: pokemon.damage,
        });
        pokemon.types.forEach(type=>this.pokemonTypeList.push(new FormControl(type)))
      }
    });
  }

  get pokemonTypeList():FormArray{
    return this.form.get('types') as FormArray;
  }
  get pokemonName():FormControl{
    return this.form.get('name') as FormControl;
  }

  get pokemonLife():FormControl{
    return this.form.get('life') as FormControl;
  }

  get pokemonDamage():FormControl{
    return this.form.get('damage') as FormControl;
  }

  incrementDamage():void{
    const newValue=this.pokemonDamage.value+1;
    this.pokemonDamage.setValue(newValue);
  }

  decrementDamage():void{
    const newValue=this.pokemonDamage.value-1;
    this.pokemonDamage.setValue(newValue);
  }

  incrementLife():void{
    const newValue = this.pokemonLife.value + 1;
    this.pokemonLife.setValue(newValue);
  }

  decrementLife():void{
    const newValue = this.pokemonLife.value - 1;
    this.pokemonLife.setValue(newValue);
  }

  isPokemonTypeSelected(type:string):boolean{
    return !!this.pokemonTypeList.controls.find(
      control=>control.value===type
    )
  }
  onPokemonTypeChange(type:string, isChecked:boolean){
    if(isChecked){
      const control=new FormControl(type)
      this.pokemonTypeList.push(control)
    }else {
      const index=this.pokemonTypeList.controls.map(control=>control.value).indexOf(type)
      this.pokemonTypeList.removeAt(index)

    }
  }

  ElectrikType(type:string):string{
    return (type==="Electrik")?'black':'white';
  }




  onsubmit (){
    const isFormValid=this.form.valid;
    const pokemon=this.pokemon()

    if(isFormValid && pokemon){
      const updatedPokemon={
        ...pokemon,
        name:this.pokemonName.value,
        life:this.pokemonLife.value,
        damage:this.pokemonDamage.value,
        types:this.pokemonTypeList.value
      }
      this.pokemonService.updatePokemon(updatedPokemon).subscribe({
        next:()=> {this.router.navigate(['/pokemons', pokemon.id]).then(
          ()=>this.toastr.success('Pokemon updated!',undefined,{
            timeOut:2000,
            positionClass: 'toast-center-bottom',
          }),
        )},
        error:(err)=>{
          console.log(err);
           this.toastr.error("une erreur est survenue !",undefined,{
            positionClass:'toast-bottom-center',
            timeOut:1000,
          });
        },
      })
    }
  };

  protected readonly POKEMON_REGLE = POKEMON_REGLE;
  protected readonly getPokemonColor = getPokemonColor;
}
