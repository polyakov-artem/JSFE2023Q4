import { CLIENT_STORAGE_KEY } from '../../../common/js/constants';
import { Server } from '../../server/server';
import { AuthController } from '../auth-controller/auth-controller';
import { StorageService } from '../storage-service/storage-service';

export class AppController {
  authController!: AuthController;
  storage!: StorageService;
  server!: Server;
  init() {
    this.server = new Server();
    this.storage = new StorageService(CLIENT_STORAGE_KEY);
    this.authController = new AuthController();
  }
}
