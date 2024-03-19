import { App } from '../../app/app';

export class GameProgressController {
  startNewGame(): void {
    App.appView.page.gamePage.redraw();
  }

  setGameState(level: number, round: number, sentence = 0): void {
    App.appModel.currentLevel = level;
    App.appModel.currentRound = round;
    App.appModel.currentSentenceNumber = sentence;
  }
  selectGame(level: number, round: number): void {
    this.setGameState(level, round);
    App.appModel.isRoundEnded = false;
    App.appModel.lastRoundResults = { resolved: [], notResolved: [] };
    App.appView.page.gamePage.redraw();
  }

  getLevelsArray(numOfLevels: number): number[] {
    return this.getArrayFromLength(numOfLevels);
  }

  getRoundsArray(level: number): number[] {
    return this.getArrayFromLength(this.getNumOfRounds(level));
  }

  getArrayFromLength(length: number): number[] {
    return Array.from(Array(length).keys());
  }

  getNumOfRounds(level: number): number {
    return App.appModel.levelsData[level].rounds.length;
  }

  getPassedRounds(level: number): number[] {
    return App.appModel.passedRounds[level];
  }
}
