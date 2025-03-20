import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient} from '@angular/common/http';
import {BrowserAnimationsModule, provideAnimations} from '@angular/platform-browser/animations';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ToastrModule} from 'ngx-toastr';
import {PokemonService} from './services/pokemon.service';
import {PokemonBackendprodService} from './services/pokemon.backendprod.service';
import {PokemonBackendlocalService} from './services/pokemon.backendlocal.service';
import {environment} from '../environments/environment.development';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
  provideHttpClient(),
    provideAnimations(),
    BrowserAnimationsModule,
    importProvidersFrom(ToastrModule.forRoot()),
    importProvidersFrom(MatSnackBar),
    {
      provide:PokemonService,
      useFactory:pokemonServiceFactory
    }
  ]
};

export function pokemonServiceFactory(): PokemonService {
  return environment.production
    ? new PokemonBackendlocalService()
    : new PokemonBackendprodService();
}
