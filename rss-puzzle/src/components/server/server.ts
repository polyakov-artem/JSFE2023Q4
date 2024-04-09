import level1 from '../../../static/data/wordCollectionLevel1.json';
import level2 from '../../../static/data/wordCollectionLevel2.json';
import level3 from '../../../static/data/wordCollectionLevel3.json';
import level4 from '../../../static/data/wordCollectionLevel4.json';
import level5 from '../../../static/data/wordCollectionLevel5.json';
import level6 from '../../../static/data/wordCollectionLevel6.json';
import { StorageService } from '../controller/storage-service/storage-service';
import { SEVER_STORAGE_KEY, defaultUser } from '../../common/js/constants';
import { LevelData, UserData } from '../../types/types';

export class Server {
  levelsData: LevelData[];
  storage: StorageService;
  constructor() {
    this.levelsData = [level1, level2, level3, level4, level5, level6];
    this.storage = new StorageService(SEVER_STORAGE_KEY);
  }

  getLevelsData(): LevelData[] {
    return this.levelsData;
  }

  login(name: string | undefined, surname: string | undefined): UserData | undefined {
    if (!name || !surname) return;
    return this.getUserData(name, surname) ?? this.createUserData(name, surname);
  }

  createUserData(name: string, surname: string): UserData {
    const userData = structuredClone<UserData>(defaultUser);
    userData.name = name;
    userData.surname = surname;
    this.saveUserData(userData);
    return userData;
  }

  getUserData(name: string, surname: string): UserData | null {
    return this.storage.getData(this.generateStorageKey(name, surname));
  }

  saveUserData(userData: UserData): void {
    this.storage.saveData(this.generateStorageKey(userData.name, userData.surname), userData);
  }

  generateStorageKey(name: string, surname: string): string {
    return `${name}_${surname}`;
  }

  wipeUserProgress(name: string, surname: string): void {
    const userData = this.getUserData(name, surname);
    if (!userData) return;
    userData.lastPassedRound = {};
    userData.passedLevels = [];
    userData.passedRounds = [];
    this.saveUserData(userData);
  }
}
