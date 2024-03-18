import { HintController } from '../hint-controller/hint-controller.js';
import { GameProgressController } from '../game-progress-controller/game-progress-controller.js';

export class GameController {
  constructor() {
    this.gameProgressController = new GameProgressController();
    this.hintController = new HintController();
  }
}
