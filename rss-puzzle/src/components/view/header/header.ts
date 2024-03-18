import { classes } from '../../../common/js/constants';
import { createDomElement } from '../../utils/utils';

export class Header {
  node!: HTMLElement;
  getNode(): HTMLElement {
    if (!this.node) {
      this.node = this.createNode();
    }

    return this.node;
  }

  createNode(): HTMLElement {
    const header: HTMLElement = createDomElement({
      tag: 'header',
      classNames: [classes.header, classes.pageHeader],
    });
    const container: HTMLElement = createDomElement({
      classNames: [classes.container, classes.headerInner],
    });
    const logo: HTMLElement = createDomElement({ classNames: [classes.logo] });

    header.append(container);
    container.append(logo);
    return header;
  }
}
