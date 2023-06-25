import { Component } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { ViewportScroller } from '@angular/common';

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
      visible: false
    },
    {
      name: 'How',
      visible: false
    }
  ]

  roles = this.gameService.roles;

  constructor(
    private gameService: GameService,
    private viewportScroller: ViewportScroller
  ) { }

  toggleSectionVisibility(name: string) {
    let section = this.sections.find(section => section.name === name);
    if (section) {
      this.sections.forEach(section => {
        if (section.name !== name) {
          section.visible = false;
        }
      });
      section.visible = !section.visible;
    }
    this.scrollToTop();
  }

  getSectionVisibility(name: string) {
    let section = this.sections.find(section => section.name === name);
    if (section) {
      return section.visible ? 'yes' : 'no';
    }
    return 'no';
  }

  getSectionVisibilityArrow(name: string) {
    let section = this.sections.find(section => section.name === name);
    if (section) {
      return section.visible ? 'keyboard_arrow_up' : 'keyboard_arrow_down';
    }
    return 'keyboard_arrow_down';
  }

  private scrollToTop() {
    this.viewportScroller.scrollToPosition([0, 0]);
  }
}
