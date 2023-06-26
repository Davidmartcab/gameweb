import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GameService } from 'src/app/services/game.service';
import { Player } from 'src/models/player.model';
import { Role } from 'src/models/role.model';
import { PopupComponent } from '../../popup/popup.component';

@Component({
  selector: 'app-accuse',
  templateUrl: './accuse.component.html',
  styleUrls: ['./accuse.component.scss']
})
export class AccuseComponent implements OnInit {

  name: string = '';
  role: string = '';
  players: Player[] = [];
  roles: Role[] = [];
  error: string = '';

  constructor(
    private router: Router,
    private gameService: GameService,
    private dialog: MatDialog,
  ) { }
  ngOnInit(): void {
    this.players = this.gameService.players;
    this.roles = this.gameService.roles;
  }

  goBack() {
    this.router.navigate(['game']);
  }

  onAccuse() {
    this.error = '';
    let res = this.gameService.onAccuse(this.name, this.role);
    console.log(res);
    if (res.status !== 200) {
      if (res.message)
        this.error = res.message;
      return;
    } else {
      this.dialog.open(PopupComponent, {
        data: {
          type: 'adduser',
          title: 'Accuse',
          message: ['Estás acusando a ' + this.name + ' de ser ' + this.role + '.', 'Y... es verdad.'],
          defaultButtons: ['OK'],
        }
      }).afterClosed().subscribe(result => {
        if (this.gameService.players.length < 2) {
          this.router.navigate(['']);
          this.dialog.open(PopupComponent, {
            data: {
              type: 'adduser',
              title: 'Win',
              message: ['El ganador es: ' + this.gameService.players[0].name + '.'],
              defaultButtons: ['OK'],
            }
          }).afterClosed().subscribe(() => {
            this.gameService.refresh();
          })
        } else
          this.router.navigate(['game'])
      })
    }

  }
}
