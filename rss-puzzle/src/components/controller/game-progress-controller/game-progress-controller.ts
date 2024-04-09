import { AuthData, LastPassedRound, UserData } from '../../../types/types';
import { AppModel } from '../../app-model/app-model';
import { App } from '../../app/app';

export class GameProgressController {
  startNewGame(): void {
    const { lastPassedRound } = App.appModel;

    if (lastPassedRound.lastLevel !== undefined && lastPassedRound.lastRound !== undefined) {
      App.appView.page.continuePage.redraw();
      return;
    }

    this.autoSelectNextGame();
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

  autoSelectNextGame(): void {
    const { lastPassedRound }: AppModel = App.appModel;

    const { lastLevel, lastRound }: LastPassedRound = lastPassedRound;
    const { passedLevels, numOfLevels }: { passedLevels: number[]; numOfLevels: number } =
      App.appModel;

    if (lastRound === undefined || lastLevel === undefined) {
      this.selectGame(0, 0);
      return;
    }

    if (passedLevels.length === numOfLevels) {
      this.wipeUserProgress();
      this.selectGame(0, 0);
      return;
    }

    const gameLevelsArray: number[] = this.getLevelsArray(numOfLevels);
    const nextLevel: number = this.getNextItem(gameLevelsArray, passedLevels, lastLevel);
    const gameRoundsArray: number[] = this.getRoundsArray(nextLevel);
    const nextRound: number = this.getNextItem(
      gameRoundsArray,
      this.getPassedRounds(nextLevel) ?? [],
      lastRound,
    );

    this.selectGame(nextLevel, nextRound);
  }

  solveSentence(isSolved: boolean): void {
    const { currentSentenceNumber, currentRoundSentences, isRoundEnded, lastRoundResults } =
      App.appModel;
    const gameView = App.appView.page.gamePage.game;
    if (isRoundEnded) return;

    gameView.gameArea.solveSentence();

    isSolved
      ? lastRoundResults.resolved.push(currentSentenceNumber)
      : lastRoundResults.notResolved.push(currentSentenceNumber);

    if (currentSentenceNumber === currentRoundSentences.length - 1) {
      App.appModel.isRoundEnded = true;
      gameView.gameArea.gameButtons.updateView();
      this.saveProgress();
      return;
    }

    App.appModel.currentSentenceNumber += 1;
    gameView.gameArea.updateSentenceRelated();
  }

  wipeUserProgress(): void {
    const { name, surname }: AuthData = App.appModel;
    App.appController.server.wipeUserProgress(name, surname);
    App.appModel.userData = App.appController.server.getUserData(name, surname)!;
  }

  getNextItem(arr: number[], itemsToPass: number[], startPos: number): number {
    const slicedArr: number[] = arr.slice(startPos).concat(arr.slice(0, startPos));
    const nextItems: number[] = slicedArr.filter((el) => !itemsToPass.includes(el));
    return nextItems[0];
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

  saveProgress(): void {
    const { currentLevel, currentRound, userData }: AppModel = App.appModel;
    const { passedLevels, passedRounds }: UserData = userData;

    passedRounds[currentLevel] ??= [];

    if (!passedRounds[currentLevel].includes(currentRound)) {
      passedRounds[currentLevel].push(currentRound);
    }

    if (
      passedRounds[currentLevel].length === this.getNumOfRounds(currentLevel) &&
      !passedLevels.includes(currentLevel)
    ) {
      passedLevels.push(currentLevel);
    }

    userData.lastPassedRound = { lastLevel: currentLevel, lastRound: currentRound };
    App.appController.server.saveUserData(userData);
  }
}
