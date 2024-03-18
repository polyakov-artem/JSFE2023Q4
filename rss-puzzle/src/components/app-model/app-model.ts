import { LevelsData, RoundData, SentenceData, UserData } from '../../types/types';

export class AppModel {
  currentLevel: number;
  currentRound: number;
  currentSentenceNumber: number;
  isRoundEnded: boolean;
  userData: UserData;
  lastRoundResults: { resolved: number[]; notResolved: number[] };
  levelsData: LevelsData;

  constructor() {
    this.currentLevel = 0;
    this.currentRound = 0;
    this.currentSentenceNumber = 0;
    this.isRoundEnded = false;
    this.userData = {
      name: '',
      surname: '',
      lastPassedRound: { lastLevel: 0, lastRound: 0 },
      passedLevels: [],
      passedRounds: [],
    };
    this.lastRoundResults = { resolved: [], notResolved: [] };
    this.levelsData = [
      {
        rounds: [
          {
            roundResult: {
              id: '',
              name: '',
              imageSrc: '',
              cutSrc: '',
              author: '',
              year: '',
            },
            sentences: [
              {
                audioExample: '',
                textExample: '',
                textExampleTranslate: '',
                id: 0,
                word: '',
                wordTranslate: '',
              },
            ],
          },
        ],
        roundsCount: 0,
      },
    ];
  }

  // game info
  get numOfLevels(): number {
    return this.levelsData.length;
  }

  get currentSentenceWords(): string[] {
    return this.currentSentenceText.split(' ');
  }

  get currentSentenceText(): string {
    const sentenceData = this.currentSentenceData;
    return sentenceData.textExample;
  }

  get currentSentenceTranslate(): string {
    const sentenceData = this.currentSentenceData;
    return sentenceData.textExampleTranslate;
  }

  get currentSentenceAudio(): string {
    const sentenceData = this.currentSentenceData;
    return sentenceData.audioExample;
  }

  get currentRoundImg(): string {
    const roundData = this.currentRoundData;
    return roundData.roundResult.cutSrc;
  }

  get currentRoundSentences(): SentenceData[] {
    const roundData = this.currentRoundData;
    return roundData.sentences;
  }
  get currentRoundData(): RoundData {
    return this.levelsData[this.currentLevel].rounds[this.currentRound];
  }

  get currentSentenceData(): SentenceData {
    return this.currentRoundSentences[this.currentSentenceNumber];
  }

  // user data
  get name(): string {
    return this.userData.name;
  }
  get surname(): string {
    return this.userData.surname;
  }

  get lastPassedRound(): { lastLevel: number; lastRound: number } {
    return this.userData.lastPassedRound;
  }

  get passedRounds(): number[][] {
    return this.userData.passedRounds;
  }

  get passedLevels(): number[] {
    return this.userData.passedLevels;
  }

  get currentNumOfRounds(): number {
    return this.levelsData[this.currentLevel].rounds.length;
  }

  get currentLevelPassedRounds(): number[] {
    return this.passedRounds[this.currentLevel];
  }
  get currentImgCaption(): string {
    const {
      author = '',
      name = '',
      year = '',
    }: { author: string; name: string; year: string } = this.currentRoundData.roundResult;

    const authorInfo = author.split(', ');
    if (authorInfo.length === 1) {
      return `${authorInfo[0]} - ${name} (${year})`;
    } else {
      const authorName = authorInfo[1];
      let authorSurname = authorInfo[0].toLowerCase();
      authorSurname = authorSurname.slice(0, 1).toUpperCase() + authorSurname.slice(1);
      return `${authorName} ${authorSurname} - ${name} (${year})`;
    }
  }
}
