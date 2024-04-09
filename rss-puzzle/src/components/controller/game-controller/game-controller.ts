import { GameProgressController } from '../game-progress-controller/game-progress-controller';
import { HintController } from '../hint-controller/hint-controller';

export class GameController {
  gameProgressController: GameProgressController;

  hintController: HintController;

  constructor() {
    this.gameProgressController = new GameProgressController();
    this.hintController = new HintController();
  }
}
