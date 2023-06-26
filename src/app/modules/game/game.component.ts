import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {

  constructor(
    private router: Router
  ) { }

  goToConsult() {
    this.router.navigate(['game/consult']);
  }

  goToAccuse() {
    this.router.navigate(['game/accuse']);
  }

  goHome() {
    this.router.navigate(['']);
  }

  goToWiki() {
    this.router.navigate(['game/wiki']);
  }

}
