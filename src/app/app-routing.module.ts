import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { AddPlayerComponent } from './modules/add-player/add-player.component';
import { WikiComponent } from './modules/wiki/wiki.component';
import { AddRoleComponent } from './modules/add-role/add-role.component';
import { GameModule } from './modules/game/game.module';

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
    path: 'add-role',
    component: AddRoleComponent
  },
  {
    path: 'wiki',
    component: WikiComponent
  },
  {
    path: 'game',
    loadChildren: () => GameModule
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
