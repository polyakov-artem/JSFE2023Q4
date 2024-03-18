import { classes } from '../../../common/js/constants.js';
import { Header } from '../header/header.js';
import { Statistics } from '../statistics/statistics.js';

export class StatisticsPage {
  clearPage() {
    const bodyElements = document.querySelectorAll('body > *:not(script)');
    bodyElements.forEach((element) => element.remove());
  }

  redraw() {
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
