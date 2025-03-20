
export interface Pokemon{
  id:number;
  name: string;
  picture: string;
  life: number;
  damage: number;
  types:[string,string?,string?];
  createdAt:  Date;
}

export type PokemonList=Pokemon[];

export const POKEMON_REGLE={
  NAME_PATTERN: /^[a-zA-Z0-9éè]+$/,
  MAX_NAME:20,
  MIN_NAME:3,

  MAX_LIFE:30,
  MIN_LIFE:10,
  HIGH_LIFE:25,
  LOW_LIFE:15,

  MAX_DAMAGE:10,
  MIN_DAMAGE:1,

  MAX_TYPE:3,
  MIN_TYPE:1,
} as const;

export function getPokemonColor(type:string):string {
  switch (type) {
    case 'Feu':
      return '#EF5350';
    case 'Eau':
      return '#42A5F5';
    case 'Plante':
      return '#66BB6A';
    case 'Insecte':
      return '#8d6e63';
    case 'Vol':
      return '#90CAF9';
    case 'Poison':
      return '#b388ff';
    case 'Fée':
      return '#f8bbd0';
    case 'Electrik':
      return '#f4ff81';
    default:
      return '#303030';
  }

}

