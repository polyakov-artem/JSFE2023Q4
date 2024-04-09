export class StorageService {
  constructor(private readonly storageKeyPrefix: string) {}

  getStorageKey(key: string): string {
    return `${this.storageKeyPrefix}_${key}`;
  }

  saveData<T>(key: string, data: T): void {
    const storageKey = this.getStorageKey(key.toString());
    localStorage.setItem(storageKey, JSON.stringify(data));
  }

  getData<T>(key: string): T | null {
    const storageKey = this.getStorageKey(key.toString());
    const data = localStorage.getItem(storageKey);
    return data ? JSON.parse(data) : null;
  }
  removeData(key: string): void {
    const storageKey: string = this.getStorageKey(key.toString());
    localStorage.removeItem(storageKey);
  }
}
