import {Directive, ElementRef, HostListener, input} from '@angular/core';
import {getPokemonColor} from '../models/pokemon.model';

@Directive({
  selector: '[appPokemonBorder]'
})
export class PokemonBorderDirective {


  private readonly initialColor: string;
  pokemonType = input.required<string>()

  constructor(private el: ElementRef) {
    this.initialColor = el.nativeElement.style.backgroundColor;
    this.el.nativeElement.style.borderWidth = '2px'
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    const color = getPokemonColor(this.pokemonType())
    this.setBorderColor(color);
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    const color = this.initialColor;
    this.setBorderColor(color);
  }

  setBorderColor(color: string) {
    this.el.nativeElement.style.borderColor = color;
  }
}
