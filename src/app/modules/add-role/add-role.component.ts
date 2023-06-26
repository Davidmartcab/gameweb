import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from 'src/app/services/game.service';
import { PopupComponent } from '../popup/popup.component';
import { MatDialog } from '@angular/material/dialog';

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
    private dialog: MatDialog,
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
      this.dialog.open(PopupComponent, {
        data: {
          type: 'adduser',
          title: 'Role Added',
          message: ['Nuevo rol añadido', 'El nuevo rol es: ' + this.name],
        }
      }).afterClosed().subscribe(() => {
        this.router.navigate(['']);
      })
      this.router.navigate(['']);
    }
    console.log(res);
  }

}
