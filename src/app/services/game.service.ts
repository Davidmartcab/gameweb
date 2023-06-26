import { Injectable } from '@angular/core';
import { Player } from 'src/models/player.model';
import { Role } from 'src/models/role.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  roles: Role[] = [];
  players: Player[] = [];
  gameState: boolean = false;
  iconScale: number = 50;

  constructor() { }

  public posibleRole() {
    let role: Role = this.roles.filter(role => !role.selected)[Math.floor(Math.random() * this.roles.filter(role => !role.selected).length)];
    return role;
  }

  public addPlayer(name: string, role: Role) {
    if (!this.roles || !this.roles.filter(role => !role.selected).length)
      return { status: 400, message: 'No hay roles disponibles' };

    if (!name)
      return { status: 400, message: 'El nombre del jugador es obligatorio' };

    if (this.players.filter(player => player.name === name).length)
      return { status: 400, message: 'El nombre del jugador ya existe' };

    role = this.roles.filter(r => r.name === role.name)[0];
    if (role.selected)
      return { status: 400, message: 'El rol ya está seleccionado' };

    let id: string = uuidv4();

    role.selected = true;
    this.players.push({ id, name, role });
    this.players.sort((a, b) => a.name.localeCompare(b.name));
    localStorage.setItem('lastGame', JSON.stringify({ state: this.gameState, players: this.players, roles: this.roles }));
    return { status: 200, data: { id, name, role } };
  }

  public addNewRole(name: string, description: string) {

    if (!name)
      return { status: 400, message: 'El nombre del rol es obligatorio' };

    if (!description)
      return { status: 400, message: 'La descripción del rol es obligatoria' };

    if (this.roles.filter(role => role.name === name).length)
      return { status: 400, message: 'El rol ya existe' };

    let role: Role = { name, description, icon: '/assets/icons/interrogacion/interrogacion-50.svg', selected: false };

    this.roles.push(role);
    this.roles.sort((a, b) => a.name.localeCompare(b.name));
    localStorage.setItem('lastGame', JSON.stringify({ state: this.gameState, players: this.players, roles: this.roles }));
    return { status: 200, data: role };
  }

  public consultRole(name: string) {
    if (!name)
      return { status: 400, message: 'El nombre del jugador es obligatorio' };

    let player: Player = this.players.filter(player => player.name === name)[0];
    if (!player)
      return { status: 400, message: 'El jugador no existe' };

    if (!player.role)
      return { status: 400, message: 'El jugador no tiene rol' };

    return { status: 200, data: player.role };
  }

  public onAccuse(name: string, role: string) {
    if (!name)
      return { status: 400, message: 'El nombre del jugador es obligatorio' };

    if (!role)
      return { status: 400, message: 'El nombre del rol es obligatorio' };

    let player: Player = this.players.filter(player => player.name === name)[0];
    if (!player)
      return { status: 400, message: 'El jugador no existe' };

    if (player.role.name !== role)
      return { status: 400, message: 'El jugador no tiene ese rol' };

    this.players = this.players.filter(player => player.name !== name);
    this.roles.filter(r => r.name === role)[0].selected = false;

    localStorage.setItem('lastGame', JSON.stringify({ state: this.gameState, players: this.players, roles: this.roles }));

    return { status: 200, data: { name, role } };
  }

  public refresh() {
    this.roles.forEach(role => role.selected = false);
    this.players = [];
    localStorage.clear();
  }

  public start() {
    this.roles.push(
      {
        name: 'Borracho',
        description: 'El borracho: tienes que beber cada vez que alguno del grupo beba. Si beben más de uno a la vez tienes que beber tantas veces como personas hayan bebido.',
        icon: `/assets/icons/borracho/borracho-${this.iconScale}.svg`
      },
      {
        name: 'Cansino',
        description: 'El cansino: tienes que freir a preguntas a los demás jugadores. Si alguno de los jugadores no te responde a la pregunta, tienes que beber.',
        icon: `/assets/icons/cansino/cansino-${this.iconScale}.svg`
      },
      {
        name: 'Empanado',
        description: 'El empanado: No te enteras de nada, cuando alguien te dice algo tienes que preguntarle varias veces ¿Qué?, pero ojo, no seas muy cantoso porque sino te pillarán.',
        icon: `/assets/icons/empanado/empanado-${this.iconScale}.svg`
      },
      {
        name: 'Dramatico',
        description: 'El dramático: tienes que exagerar todo lo que digas.',
        icon: `/assets/icons/dramatico/dramatico-${this.iconScale}.svg`
      },
      {
        name: 'Fanatico',
        description: 'El fanático: tienes que decir que todo lo que hace el grupo está mal y que tú lo harías mejor.',
        icon: `/assets/icons/fanatico/fanatico-${this.iconScale}.svg`
      },
      {
        name: 'Desafinado',
        description: 'El desafinado: cada vez que suene una canción tienes que ponerte a cantar, pero tienes que desafinar. Si la música está permanentemente sonando, tienes que cantar cada 5 minutos +-',
        icon: `/assets/icons/desafinado/desafinado-${this.iconScale}.svg`
      },
      {
        name: 'Leyenda',
        description: 'La leyenda: tienes que inventar una historia asombrosa cada vez que te toque hablar. Si los demás jugadores no creen en tu historia, tienes que beber.',
        icon: `/assets/icons/leyenda/leyenda-${this.iconScale}.svg`
      },
      {
        name: 'Poliglota',
        description: 'El políglota: tienes que hablar en diferentes idiomas. Si alguien te responde en el mismo idioma (excepto español), tienes que beber.',
        icon: `/assets/icons/poliglota/poliglota-${this.iconScale}.svg`
      },
      {
        name: 'Mudo',
        description: 'El mudo: no puedes hablar en toda la partida. Si hablas, tienes que beber. Intena gesticular para que los demas no te pillen',
        icon: `/assets/icons/mudo/mudo-${this.iconScale}.svg`
      },
      {
        name: 'Sabiondo',
        description: 'El sabiondo: tienes que responder a todas las preguntas que te hagan con información falsa o inventada. Si no se lo creen tienes que beber.',
        icon: `/assets/icons/sabiondo/sabiondo-${this.iconScale}.svg`
      },
      {
        name: 'Perfeccionista',
        description: 'El perfeccionista: tienes que corregir a los demás jugadores cada vez que digan algo mal',
        icon: `/assets/icons/perfeccionista/perfeccionista-${this.iconScale}.svg`
      },
      {
        name: 'Bromista',
        description: 'El bromista: tienes que hacer una broma a los demás jugadores cada vez que te toque hablar. Si no se ríen, tienes que beber.',
        icon: `/assets/icons/bromista/bromista-${this.iconScale}.svg`
      },
      {
        name: 'Borde',
        description: 'El borde: tienes que ser borde con los demás jugadores. Si alguno de los jugadores se enfada, tienes que beber.',
        icon: `/assets/icons/borde/borde-${this.iconScale}.svg`
      },
      {
        name: 'Adivino',
        description: 'El adivino: tienes que intentar terminar las frases de los demás todo el rato.',
        icon: `/assets/icons/adivino/adivino-${this.iconScale}.svg`
      }
    )
    this.roles.sort((a, b) => a.name.localeCompare(b.name));
  }

  public startGame() {
    this.gameState = true;
    localStorage.setItem('lastGame', JSON.stringify({ state: this.gameState, players: this.players, roles: this.roles }));
  }

  public getLastGame() {
    let lastGame = localStorage.getItem('lastGame');
    if (lastGame) {
      let game = JSON.parse(lastGame);
      this.players = game.players;
      this.roles = game.roles;
      this.gameState = game.state;
    }
    console.log(this.gameState);

  }


}
