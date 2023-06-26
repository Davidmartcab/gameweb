import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss']
})
export class AddRoleComponent {

  error: string = '';
  name: string = '';
  description: string = '';

  constructor(
    private router: Router,
    private gameService: GameService,
    private toastr: ToastrService
  ) { }

  goBack() {
    this.router.navigate(['']);
  }

  addRole() {
    this.error = '';
    let res = this.gameService.addNewRole(this.name, this.description);
    if (res.status !== 200) {
      if (res.message)
        this.error = res.message;
      return;
    } else {
      this.toastr.warning('Role added!');
      this.router.navigate(['']);
    }
    console.log(res);
  }

}
