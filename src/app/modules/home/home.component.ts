import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(
    private router: Router,
  ) { }

  goToWiki() {
    this.router.navigate(['wiki']);
  }

  goToCreateRole() {
    this.router.navigate(['create-role']);
  }

  goToAddPlayer() {
    this.router.navigate(['add-player']);
  }

  goToGame() {
    this.router.navigate(['game']);
  }
}
