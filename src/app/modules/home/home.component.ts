import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from 'src/app/services/game.service';
import { PopupComponent } from '../popup/popup.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(
    private router: Router,
    private gameService: GameService,
    private dialog: MatDialog,
  ) { }

  goToWiki() {
    this.router.navigate(['wiki']);
  }

  goToCreateRole() {
    this.router.navigate(['add-role']);
  }

  goToAddPlayer() {
    this.router.navigate(['add-player']);
  }

  goToGame() {
    if (this.gameService.players.length < 2)
      this.dialog.open(PopupComponent, {
        data: {
          type: 'adduser',
          title: 'Can`t start game',
          message: ['Debes añadir como mínimo dos jugadores', 'Hay ' + this.gameService.players.length + ' jugador' + (this.gameService.players.length === 1 ? '' : 'es') + '.'],
        }
      })
    else
      this.dialog.open(PopupComponent, {
        data: {
          type: 'adduser',
          title: 'Starting Game',
          message: ['La partida comenzará en breve', 'Hay ' + this.gameService.players.length + ' jugador' + (this.gameService.players.length === 1 ? '' : 'es') + '.', 'Pulsa ok para acceder.', 'Pulsa fuera del PopUp para no entrar.'],
        }
      }).afterClosed().subscribe(result => {
        if (result) {
          this.gameService.startGame();
          this.router.navigate(['game']);
        }
      })
  }
}
