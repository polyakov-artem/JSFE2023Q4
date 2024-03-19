import { classes } from '../../../common/js/constants';
import { Header } from '../header/header';
import { Statistics } from '../statistics/statistics';

export class StatisticsPage {
  header!: Header;
  statistics!: Statistics;

  clearPage(): void {
    const bodyElements: NodeListOf<Element> = document.querySelectorAll('body > *:not(script)');
    bodyElements.forEach((element) => element.remove());
  }

  redraw(): void {
    this.clearPage();
    document.body.className = `${classes.page} ${classes.pageStatisitcs}`;

    if (!this.header) {
      this.header = new Header();
    }
    if (!this.statistics) {
      this.statistics = new Statistics();
    }

    document.body.append(this.header.getNode(), this.statistics.getNode());
    this.statistics.resultsBlock.updateView();
  }
}
