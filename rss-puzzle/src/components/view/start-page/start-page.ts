import { classes } from '../../../common/js/constants';
import { Header } from '../header/header';
import { Intro } from '../intro/intro';

export class StartPage {
  header!: Header;

  intro!: Intro;

  clearPage(): void {
    const bodyElements: NodeListOf<Element> = document.querySelectorAll('body > *:not(script)');
    bodyElements.forEach((element) => element.remove());
  }

  redraw(): void {
    this.clearPage();
    document.body.className = `${classes.page} ${classes.pageStart}`;

    this.header ??= new Header();
    this.intro ??= new Intro();
    document.body.append(this.header.getNode(), this.intro.getNode());
  }
}
