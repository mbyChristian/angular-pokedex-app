import {Component, Inject} from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-dialog-delete',
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle
  ],
  template: `    <h2 mat-dialog-title>
    <img width="25px" height="auto" class="me-0" src="/warning.png" alt="">
    Supprimer un pokemon
  </h2>
  <mat-dialog-content>
    <p>Êtes-vous sûr de vouloir supprimer ce pokemon ?</p>
  </mat-dialog-content>
  <mat-dialog-actions class="d-flex justify-content-between">
    <button class="btn btn-sm btn-danger" [mat-dialog-close]="true">Supprimer</button>
    <button class="btn btn-sm btn-outline-dark" [mat-dialog-close]="false">Annuler</button>
  </mat-dialog-actions>`,

})
export class DialogDeleteComponent {
}
