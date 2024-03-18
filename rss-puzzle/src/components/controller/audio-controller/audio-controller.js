export class AudioContoller {
  constructor() {
    this.audio = null;
  }

  play({ src, startPlayingCb, endPlayingCb, errorCb }) {
    if (this.audio !== null) {
      return;
    }

    this.audio = new Audio(src);
    this.addListeners(startPlayingCb, endPlayingCb, errorCb);
    this.audio.play();
  }

  addListeners(startPlayingCb, endPlayingCb, errorCb) {
    const playLister = (e) => {
      startPlayingCb?.(e);
    };

    const endListener = (e) => {
      endPlayingCb?.(e);
      removeListeners();
      this.audio = null;
    };

    const errorListener = (e) => {
      errorCb?.(e);
      removeListeners();
      this.audio = null;
    };

    const removeListeners = () => {
      this.audio.removeEventListener('playing', playLister);
      this.audio.removeEventListener('ended', endListener);
      this.audio.removeEventListener('error', errorListener);
    };

    this.audio.addEventListener('playing', playLister);
    this.audio.addEventListener('ended', endListener);
    this.audio.addEventListener('error', errorListener);
  }
}
