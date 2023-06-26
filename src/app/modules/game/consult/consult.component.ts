import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GameService } from 'src/app/services/game.service';
import { Player } from 'src/models/player.model';

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
    private toastr: ToastrService
  ) { }
  
  ngOnInit(): void {
    this.players = this.gameService.players;
  }

  goBack() {
    this.router.navigate(['game']);
  }

  onConsult() {
    this.error = '';
    console.log({name: this.name});
    let res = this.gameService.consultRole(this.name);
    if (res.status !== 200) {
      if (res.message)
        this.error = res.message;
      return;
    } else {
      this.toastr.warning('El rol es: ' + res.data!.name);
      this.router.navigate(['game']);
    }
  }

}
