import { classes } from '../../../common/js/constants';
import { createDomElement } from '../../utils/utils';

export class Selector {
  classNames: string[];
  title: string;
  node!: HTMLSelectElement;
  constructor({ title = '', classNames = [''] }) {
    this.classNames = classNames;
    this.title = title;
  }

  getNode(): HTMLSelectElement {
    if (!this.node) {
      this.node = this.createNode();
    }

    return this.node;
  }

  createNode(): HTMLSelectElement {
    let nodeClasses: string[] = [classes.selector];
    if (this.classNames) nodeClasses = nodeClasses.concat(this.classNames);
    const node = createDomElement({
      tag: 'select',
      classNames: nodeClasses,
    }) as HTMLSelectElement;

    return node;
  }

  redraw({
    length = 0,
    valuesToPass = [],
    selectValue = 'choose',
  }: { length?: number; valuesToPass?: number[]; selectValue?: string } = {}): void {
    this.node.innerHTML = '';
    this.node.append(this.createOption(this.title, 'choose'));

    for (let i = 0; i < length; i += 1) {
      const text: string = valuesToPass.includes(i) ? `${i + 1} (Passed)` : `${i + 1}`;

      this.node.append(this.createOption(text, `${i}`));
    }

    this.node.value = selectValue;
  }

  createOption(text: string, value: string): HTMLOptionElement {
    return createDomElement({
      tag: 'option',
      text: text,
      classNames: [classes.selectorOption],
      attr: {
        value: `${value}`,
      },
    }) as HTMLOptionElement;
  }
}
