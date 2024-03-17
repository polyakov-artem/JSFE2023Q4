import { classSelectors, classes } from '../../../common/js/constants';
import { createDomElement } from '../../utils/utils';
import { loginField } from '../login-field/login-field';
import { loginLabel } from '../login-label/login-label';
import { primaryBtn } from '../primary-btn/primary-btn';

export class LoginBlock {
  node!: HTMLElement;
  nameField!: HTMLElement;
  nameInput!: HTMLElement;
  surnameField!: HTMLElement;
  surnameInput!: HTMLElement;
  loginBtn!: HTMLElement;
  getNode() {
    if (!this.node) {
      this.node = this.createNode();
      this.nameField = this.node.querySelector(classSelectors.loginBlockNameField)!;
      this.nameInput = this.nameField.querySelector(classSelectors.inputControl)!;
      this.surnameField = this.node.querySelector(classSelectors.loginBlockSurnameField)!;
      this.surnameInput = this.surnameField.querySelector(classSelectors.inputControl)!;
      this.loginBtn = this.node.querySelector(classSelectors.loginBtn)!;
    }

    return this.node;
  }

  createNode() {
    const node = createDomElement({ classNames: [classes.loginBlock] });
    const formElement = createDomElement({
      tag: 'form',
      classNames: [classes.loginBlockForm],
      attr: { action: '' },
    });
    const nameLabel = loginLabel({ text: 'First Name', inputId: 'name' });
    const surnameLabel = loginLabel({ text: 'Surname', inputId: 'surname' });
    const nameField = loginField({ name: 'name' });
    const surnameField = loginField({ name: 'surname' });
    const loginBtn = primaryBtn({
      text: 'Login',
      classNames: [classes.loginBlockLoginBtn, classes.loginBtn],
      disabled: true,
    });
    node.append(formElement);
    formElement.append(nameLabel, nameField, surnameLabel, surnameField, loginBtn);

    return node;
  }
}
