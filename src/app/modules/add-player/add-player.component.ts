import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GameService } from 'src/app/services/game.service';
import { Role } from 'src/models/role.model';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.scss']
})
export class AddPlayerComponent implements OnInit {

  role: Role = {
    name: '',
    description: '',
    icon: '',
  }

  error: string = '';

  palyerName: string = '';

  constructor(
    private gameService: GameService,
    private router: Router,
    private toastr: ToastrService
  ) {

  }

  ngOnInit(): void {
    this.role = this.gameService.posibleRole();
  }

  goBack() {
    this.router.navigate(['']);
  }

  addPlayer() {
    this.error = '';
    let res = this.gameService.addPlayer(this.palyerName, this.role);
    if (res.status !== 200) {
      if (res.message)
        this.error = res.message;
      return;
    } else {
      this.toastr.warning('User added!');
      this.router.navigate(['']);
    }
    console.log(res);
  }

}
