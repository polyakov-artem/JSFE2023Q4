import { classes } from '../../../common/js/constants.js';
import { createDomElement } from '../../utils/utils.js';
import { ResultBlocks } from '../results-block/results-block.js';

export class Statistics {
  getNode() {
    if (!this.node) {
      this.node = this.createNode();
    }

    return this.node;
  }

  createNode() {
    const node = createDomElement({ tag: 'main', classNames: classes.statistics });
    const container = createDomElement({
      classNames: [classes.statisticsInner, classes.container],
    });
    const window = createDomElement({
      classNames: [classes.window, classes.windowTransparent],
    });

    if (!this.resultsBlock) {
      this.resultsBlock = new ResultBlocks();
    }

    node.append(container);
    container.append(window);
    window.append(this.resultsBlock.getNode());

    return node;
  }
}
