import { classes } from '../../../common/js/constants';
import { Login } from '../login/login';

export class LoginPage {
  login!: Login;
  clearPage(): void {
    const bodyElements: NodeListOf<Element> = document.querySelectorAll('body > *:not(script)');
    bodyElements.forEach((element) => element.remove());
  }

  redraw(): void {
    this.clearPage();
    document.body.className = `${classes.page} ${classes.pageLogin}`;

    if (!this.login) {
      this.login = new Login();
    }

    document.body.append(this.login.getNode());
  }
}
