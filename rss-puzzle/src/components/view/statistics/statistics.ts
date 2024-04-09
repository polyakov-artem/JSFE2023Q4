import { classes } from '../../../common/js/constants';
import { createDomElement } from '../../utils/utils';
import { ResultBlocks } from '../results-block/results-block';

export class Statistics {
  node!: HTMLElement;

  resultsBlock!: ResultBlocks;

  getNode(): HTMLElement {
    this.node ??= this.createNode();
    return this.node;
  }

  createNode(): HTMLElement {
    const node: HTMLElement = createDomElement({ tag: 'main', classNames: [classes.statistics] });
    const container: HTMLElement = createDomElement({
      classNames: [classes.statisticsInner, classes.container],
    });
    const window: HTMLElement = createDomElement({
      classNames: [classes.window, classes.windowTransparent],
    });

    this.resultsBlock ??= new ResultBlocks();

    node.append(container);
    container.append(window);
    window.append(this.resultsBlock.getNode());

    return node;
  }
}
