import { classes } from '../../../common/js/constants.js';
import { createDomElement } from '../../utils/utils.js';

export class Selector {
  constructor({ title, classNames } = {}) {
    this.classNames = classNames;
    this.title = title;
  }

  getNode() {
    if (!this.node) {
      this.node = this.createNode();
    }

    return this.node;
  }

  createNode() {
    let nodeClasses = [classes.selector];
    if (this.classNames) nodeClasses = nodeClasses.concat(this.classNames);
    const node = createDomElement({ tag: 'select', classNames: nodeClasses });

    return node;
  }

  redraw({ length = 0, valuesToPass = [], selectValue = 'choose' } = {}) {
    this.node.innerHTML = '';
    this.node.append(this.createOption(this.title, 'choose'));

    for (let i = 0; i < length; i += 1) {
      const text = valuesToPass.includes(i) ? `${i + 1} (Passed)` : `${i + 1}`;

      this.node.append(this.createOption(text, i));
    }

    this.node.value = selectValue;
  }

  createOption(text, value) {
    return createDomElement({
      tag: 'option',
      text: text,
      classNames: [classes.selectorOption],
      attr: {
        value: `${value}`,
      },
    });
  }
}
