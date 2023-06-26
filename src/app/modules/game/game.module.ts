import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game.component';
import { RouterModule, Routes } from '@angular/router';
import { ConsultComponent } from './consult/consult.component';
import { FormsModule } from '@angular/forms';
import { AccuseComponent } from './accuse/accuse.component';
import { MatDialogModule } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';


const routes: Routes = [
  {
    path: '',
    component: GameComponent
  },
  {
    path: 'consult',
    component: ConsultComponent
  },
  {
    path: 'accuse',
    component: AccuseComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  declarations: [
    GameComponent,
    ConsultComponent,
    AccuseComponent,
    PopupComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    MatDialogModule,
  ],
  exports: [RouterModule, CommonModule]
})
export class GameModule { }
