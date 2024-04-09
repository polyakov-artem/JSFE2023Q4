import { AddListenersForAudio, PlayFnProps } from '../../../types/types';

export class AudioController {
  audio!: HTMLAudioElement | null;

  constructor() {
    this.audio = null;
  }

  play({ src, startPlayingCb, endPlayingCb, errorCb }: PlayFnProps): void {
    if (this.audio !== null) {
      return;
    }

    this.audio = new Audio(src);
    this.addListeners(startPlayingCb, endPlayingCb, errorCb);
    this.audio.play();
  }

  addListeners: AddListenersForAudio = (startPlayingCb, endPlayingCb, errorCb) => {
    const playListener = (): void => {
      startPlayingCb?.();
    };

    const endListener = (): void => {
      endPlayingCb?.();
      removeListeners();
      this.audio = null;
    };

    const errorListener = (): void => {
      errorCb?.();
      removeListeners();
      this.audio = null;
    };

    const removeListeners = (): void => {
      this.audio!.removeEventListener('playing', playListener);
      this.audio!.removeEventListener('ended', endListener);
      this.audio!.removeEventListener('error', errorListener);
    };

    this.audio!.addEventListener('playing', playListener);
    this.audio!.addEventListener('ended', endListener);
    this.audio!.addEventListener('error', errorListener);
  };
}
