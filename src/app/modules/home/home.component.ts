import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(
    private router: Router,
    private gameService: GameService,
    private toastr: ToastrService
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
      this.toastr.warning('Debe haber algún jugador');
    else
      this.router.navigate(['game']);
  }
}
