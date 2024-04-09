import { classes } from '../../../common/js/constants';
import { createDomElement } from '../../utils/utils';
import { LoginBlock } from '../login-block/login-block';

export class Login {
  node!: HTMLElement;

  loginBlock!: LoginBlock;

  getNode(): HTMLElement {
    this.node ??= this.createNode();
    return this.node;
  }

  createNode(): HTMLElement {
    const node: HTMLElement = createDomElement({ tag: 'main', classNames: [classes.login] });
    const container: HTMLElement = createDomElement({
      classNames: [classes.loginInner, classes.container],
    });
    const window: HTMLElement = createDomElement({
      classNames: [classes.window, classes.windowTransparent, classes.windowSmall],
    });

    if (!this.loginBlock) {
      this.loginBlock = new LoginBlock();
    }

    node.append(container);
    container.append(window);
    window.append(this.loginBlock.getNode());

    return node;
  }
}
