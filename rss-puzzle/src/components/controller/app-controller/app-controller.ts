import { CLIENT_STORAGE_KEY } from '../../../common/js/constants';
import { App } from '../../app/app';
import { Server } from '../../server/server';
import { AudioController } from '../audio-controller/audio-controller';
import { AuthController } from '../auth-controller/auth-controller';
import { GameController } from '../game-controller/game-controller';
import { StorageService } from '../storage-service/storage-service';

export class AppController {
  authController!: AuthController;

  storage!: StorageService;

  server!: Server;

  gameController!: GameController;

  audioController!: AudioController;

  init() {
    this.server = new Server();
    this.storage = new StorageService(CLIENT_STORAGE_KEY);
    App.appModel.levelsData = this.server.getLevelsData();
    this.audioController = new AudioController();
    this.authController = new AuthController();
    this.gameController = new GameController();
  }
}
