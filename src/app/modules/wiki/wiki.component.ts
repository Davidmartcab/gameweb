import { Component } from '@angular/core';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-wiki',
  templateUrl: './wiki.component.html',
  styleUrls: ['./wiki.component.scss']
})
export class WikiComponent {

  sections: { name: string, visible: boolean }[] = [
    {
      name: 'Roles',
      visible: false
    },
    {
      name: 'Reglas',
      visible: true
    }
  ]

  roles = this.gameService.roles;

  constructor(
    private gameService: GameService,
  ) { }

  toggleSectionVisibility(name: string) {
    // change the visibility of the section
    let section = this.sections.find(section => section.name === name);
    if (section) {
      section.visible = !section.visible;
    }
  }

  getSectionVisibility(name: string) {
    let section = this.sections.find(section => section.name === name);
    if (section) {
      return section.visible ? 'yes' : 'no';
    }
    return 'no';
  }
}
