import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PopupComponent } from './modules/popup/popup.component';
import { MatDialog } from '@angular/material/dialog';
import { GameService } from './services/game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private gameservice: GameService,
  ) {
    this.router.navigate(['']);
    if (localStorage.getItem('lastGame')) {
      this.dialog.open(PopupComponent, {
        data: {
          type: 'adduser',
          title: 'Starting Game',
          message: ['Hay una partida guardada', 'Pulsa ok para acceder.', 'Pulsa fuera del PopUp para no entrar y borrar la partida guardada.'],
        }
      }).afterClosed().subscribe(result => {
        if (result) {
          this.gameservice.getLastGame()
          if (this.gameservice.players.length >= 2) {
            if (this.gameservice.gameState)
              this.router.navigate(['game']);
            else
              this.router.navigate(['']);
          }
        } else {
          this.gameservice.refresh();
          this.gameservice.start()
          this.router.navigate(['']);
        }
      })
    } else {
      this.gameservice.start()
    }
  }
}
