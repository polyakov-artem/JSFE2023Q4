import { classSelectors, classes } from '../../../common/js/constants';
import { App } from '../../app/app';
import { Page } from '../page/page';

export class AppView {
  page!: Page;
  init(): void {
    this.page = new Page();
    this.addListeners();
  }

  addListeners(): void {
    document.addEventListener('click', (e: MouseEvent): void => {
      this.clickHandler(e);
    });
  }

  clickHandler(e: MouseEvent): void {
    const target = e.target as HTMLElement;
    if (target.closest(classSelectors.playAudioBtn)) {
      this.playBtnHandler(target);
    }
  }

  playBtnHandler(btn: HTMLElement) {
    const src: string | null = btn.getAttribute('data-src');
    const playbackStatusBtn: HTMLElement = document.querySelector(
      classSelectors.playbackStatusBtn,
    )!;
    if (!src) return;
    const startPlayingCb = (): void => {
      btn.classList.add(classes.playAudioBtnActive);
      playbackStatusBtn?.classList.add(classes.playbackStatusBtnActive);
    };
    const endPlayingCb = (): void => {
      btn.classList.remove(classes.playAudioBtnActive);
      playbackStatusBtn?.classList.remove(classes.playbackStatusBtnActive);
    };
    App.appController.audioController.play({
      src,
      startPlayingCb,
      endPlayingCb,
      errorCb: endPlayingCb,
    });
  }
}
