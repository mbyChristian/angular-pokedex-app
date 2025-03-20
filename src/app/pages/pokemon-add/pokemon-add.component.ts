import {Component, inject} from '@angular/core';
import {FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {PokemonService} from '../../services/pokemon.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {getPokemonColor, Pokemon, POKEMON_REGLE} from '../../models/pokemon.model';

@Component({
  selector: 'app-pokemon-add',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './pokemon-add.component.html',
  styleUrl: './pokemon-add.component.css'
})
export class PokemonAddComponent {

  protected readonly pokemonService=inject(PokemonService)
  private readonly route=inject(Router)
  private snackBar=inject(MatSnackBar)
  readonly form=new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(POKEMON_REGLE.MIN_NAME),
      Validators.maxLength(POKEMON_REGLE.MAX_NAME),
      Validators.pattern(POKEMON_REGLE.NAME_PATTERN)]),
    picture: new FormControl('', [Validators.required]),
    life: new FormControl(10),
    damage: new FormControl(1),
    types: new FormArray([new FormControl('normal')], [Validators.required,Validators.maxLength(POKEMON_REGLE.MAX_TYPE)]),
  })

  get pokemonName() {
    return this.form.get('name') as FormControl;
  }
  get pokemonPicture() {
    return this.form.get('picture') as FormControl;
  }

  get pokemonDamage(){
    return this.form.get('damage') as FormControl;
  }

  get pokemonLife(){
    return this.form.get('life') as FormControl;
  }

  get pokemonTypeList(){
    return this.form.get('types') as FormArray;
  }

  onSubmit(){
    (Object.values(this.form.controls) as FormControl[]).forEach((control) => {
      if (control) {
        control.markAsDirty();
      }
    });

    if(this.form.invalid){
      return;
    }

    const pokemon:Omit<Pokemon,'id'>={
      name:this.pokemonName.value,
      picture:this.pokemonPicture.value,
      life:this.pokemonLife.value,
      damage:this.pokemonDamage.value,
      types:this.pokemonTypeList.controls.map(control=>control.value )as [string,string?,string?],
      createdAt:new Date()
    };

    this.pokemonService.addPokemon(pokemon).subscribe(
      {
        next: ()=>{

          this.snackBar.open('Pokémon ajouté avec succès !','Fermer',{
            duration: 1000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: ['snack-bar-custom']
          }).afterDismissed().subscribe(
            {
              next:()=>
                this.route.navigateByUrl('/pokemons')
            }
          )
        }
      }
    )

  }

  incrementLife(){
    const newLife=this.pokemonLife.value+1;
    this.pokemonLife.setValue(newLife)
  }

  decrementLife(){
    const newLife=this.pokemonLife.value-1;
    this.pokemonLife.setValue(newLife)
  }

  incrementDamage(){
    const newDamage=this.pokemonDamage.value+1;
    this.pokemonDamage.setValue(newDamage)
  }

  decrementDamage(){
    const newDamage=this.pokemonDamage.value-1;
    this.pokemonDamage.setValue(newDamage)
  }

  isPokemonTypeSelected(type:string){
    return this.pokemonTypeList.controls.find(control=>control.value === type);
  }

  onPokemonTypeChange(type: string, isChecked: boolean) {
    if (isChecked) {
      // Add control
      const control = new FormControl(type);
      this.pokemonTypeList.push(control);
    } else {
      // Remove control
      const index = this.pokemonTypeList.controls
        .map((control) => control.value)
        .indexOf(type);
      this.pokemonTypeList.removeAt(index);
    }
  }

  ElectrikType(type:string):string{
    return (type==="Electrik")?'black':'white';
  }

  protected readonly POKEMON_REGLE = POKEMON_REGLE;
  protected readonly getPokemonColor = getPokemonColor;
}
