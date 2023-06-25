import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { AddPlayerComponent } from './modules/add-player/add-player.component';
import { WikiComponent } from './modules/wiki/wiki.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'add-player',
    component: AddPlayerComponent
  },
  {
    path: 'wiki',
    component: WikiComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
