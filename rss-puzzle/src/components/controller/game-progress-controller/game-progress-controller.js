import { App } from '../../app/app.js';

export class GameProgressController {
  startNewGame() {
    const { lastLevel, lastRound } = App.appModel.lastPassedRound;

    if (lastLevel !== undefined && lastRound !== undefined) {
      App.appView.page.continuePage.redraw();
      return;
    }

    this.autoSelectNextGame();
  }

  setGameState(level, round, sentence = 0) {
    App.appModel.currentLevel = level;
    App.appModel.currentRound = round;
    App.appModel.currentSentenceNumber = sentence;
  }

  selectGame(level, round) {
    this.setGameState(level, round);
    App.appModel.isRoundEnded = false;
    App.appModel.lastRoundResults = { resolved: [], notResolved: [] };
    App.appView.page.gamePage.redraw();
  }

  autoSelectNextGame() {
    const { lastLevel, lastRound } = App.appModel.lastPassedRound;
    const { passedLevels, numOfLevels } = App.appModel;

    if (lastRound === undefined) {
      this.selectGame(0, 0);
      return;
    }

    if (passedLevels.length === numOfLevels.length) {
      this.wipeUserProgress();
      this.selectGame(0, 0);
      return;
    }

    const gameLevelsArray = this.getLevelsArray(numOfLevels);
    const nextLevel = this.getNextItem(gameLevelsArray, passedLevels, lastLevel);
    const gameRoundsArray = this.getRoundsArray(nextLevel);
    const nextRound = this.getNextItem(
      gameRoundsArray,
      this.getPassedRounds(nextLevel) ?? [],
      lastRound,
    );

    this.selectGame(nextLevel, nextRound);
  }

  solveSentence(isSolved) {
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

  saveLastRoundResults() {
    App.appModel.lastRoundResults;
  }

  wipeUserProgress() {
    const { name, surname } = App.appModel;
    App.appController.server.wipeUserProgress(name, surname);
    appModel.userData = App.appController.server.getUserData(name, surname);
  }

  getNextItem(arr, itemsToPass, startPos) {
    const slicedArr = arr.slice(startPos).concat(arr.slice(0, startPos));
    const nextItems = slicedArr.filter((el) => !itemsToPass.includes(el));
    return nextItems[0];
  }

  getLevelsArray(numOfLevels) {
    return this.getArrayFromLength(numOfLevels);
  }

  getRoundsArray(level) {
    return this.getArrayFromLength(this.getNumOfRounds(level));
  }

  getArrayFromLength(length) {
    return Array.from(Array(length).keys());
  }

  getNumOfRounds(level) {
    return App.appModel.levelsData[level].rounds.length;
  }

  getPassedRounds(level) {
    return App.appModel.passedRounds[level];
  }

  saveProgress() {
    const { currentLevel, currentRound, userData } = App.appModel;
    const { passedLevels, passedRounds } = userData;

    if (passedRounds[currentLevel] === undefined) {
      passedRounds[currentLevel] = [];
    }

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
