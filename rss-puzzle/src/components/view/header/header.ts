import { classSelectors, classes } from '../../../common/js/constants';
import { App } from '../../app/app';
import { createDomElement } from '../../utils/utils';
import { primaryBtn } from '../primary-btn/primary-btn';

export class Header {
  node!: HTMLElement;

  getNode(): HTMLElement {
    if (!this.node) {
      this.node = this.createNode();
      this.addListeners();
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
    const logoutBtn: HTMLElement = primaryBtn({
      text: 'Logout',
      classNames: [classes.logoutBtn],
      isSmall: true,
    });

    header.append(container);
    container.append(logo, logoutBtn);
    return header;
  }

  addListeners(): void {
    this.node.querySelector(classSelectors.logoutBtn)!.addEventListener('click', () => {
      App.appController.authController.logout();
    });
  }
}
