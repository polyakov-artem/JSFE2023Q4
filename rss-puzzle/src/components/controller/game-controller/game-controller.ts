import { GameProgressController } from '../game-progress-controller/game-progress-controller';

export class GameController {
  gameProgressController: GameProgressController;
  constructor() {
    this.gameProgressController = new GameProgressController();
  }
}
