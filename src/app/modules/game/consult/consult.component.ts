import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from 'src/app/services/game.service';
import { Player } from 'src/models/player.model';
import { PopupComponent } from '../../popup/popup.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-consult',
  templateUrl: './consult.component.html',
  styleUrls: ['./consult.component.scss']
})
export class ConsultComponent implements OnInit {

  players: Player[] = [];
  name: string = '';
  error: string = '';

  constructor(
    private router: Router,
    private gameService: GameService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.players = this.gameService.players;
  }

  goBack() {
    this.router.navigate(['game']);
  }

  onConsult() {
    this.error = '';
    console.log({ name: this.name });
    let res = this.gameService.consultRole(this.name);
    if (res.status !== 200) {
      if (res.message)
        this.error = res.message;
      return;
    } else {
      this.dialog.open(PopupComponent, {
        data: {
          type: 'adduser',
          title: 'Consult',
          message: ['El rol de ' + this.name + ' es ' + res.data!.name + '.'],
        }
      }).afterClosed().subscribe(() => {
        this.router.navigate(['game']);
      })
    }
  }

}
