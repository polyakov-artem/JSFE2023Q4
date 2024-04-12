import { classes, attributeKeys, classSelectors } from '../../../common/js/constants';
import { TabsConstructorParams } from '../../../types/types';
import { createDomElement } from '../create-dom-element/create-dom-element';
import { primaryBtn } from '../primary-btn/primary-btn';

export class Tabs {
  activeTabIndex?: number;

  tabsNames: string[];

  node!: HTMLElement;

  buttonsText: string[];

  tabsContent: HTMLElement[];

  constructor(props: TabsConstructorParams) {
    this.activeTabIndex = props.activeTabIndex ?? 0;
    this.tabsNames = props.tabsNames;
    this.buttonsText = props.buttonsText;
    this.tabsContent = props.tabsContent;

    this.createNode();
    this.addListeners();
  }

  getNode(): HTMLElement {
    return this.node;
  }

  createNode(): void {
    const node: HTMLElement = createDomElement({ classNames: [classes.tabs] });
    const tabsControls: HTMLElement = createDomElement({ classNames: [classes.tabsControls] });
    const tabsContent: HTMLElement = createDomElement({ classNames: [classes.tabsContent] });
    node.append(tabsControls, tabsContent);

    this.tabsNames.forEach((tabName: string, i: number): void => {
      const isActive: boolean = i === this.activeTabIndex;
      const buttonText: string = this.buttonsText[i];

      const btnClasses: string[] = isActive
        ? [classes.tabBtn, classes.tabBtnActive]
        : [classes.tabBtn];

      const tabClasses: string[] = isActive
        ? [classes.tabsTab, classes.tabsTabActive]
        : [classes.tabsTab];

      const tabBtn: HTMLButtonElement = primaryBtn({
        classNames: btnClasses,
        text: buttonText,
        attr: {
          [attributeKeys.tabBtn]: tabName,
        },
      });

      const tab: HTMLElement = createDomElement({
        classNames: tabClasses,
        attr: {
          [attributeKeys.tab]: tabName,
        },
      });

      tabsControls.append(tabBtn);
      tabsContent.append(tab);
      tab.append(this.tabsContent[i]);
    });

    this.node = node;
  }

  addListeners(): void {
    this.node.addEventListener('click', (e: MouseEvent): void => {
      this.clickHandler(e);
    });
  }

  clickHandler(e: MouseEvent): void {
    if (!e?.target) return;

    const clickedToggler: HTMLElement | null = (e.target as HTMLElement).closest(
      classSelectors.tabBtn,
    );

    if (!clickedToggler) return;

    const isActive: boolean = clickedToggler.classList.contains(classes.tabBtnActive);

    if (isActive) return;

    const nextTabName: string = clickedToggler.getAttribute(attributeKeys.tabBtn)!;

    const nextTab: HTMLElement = this.node.querySelector(
      `[${attributeKeys.tab}="${nextTabName}"]`,
    )!;

    const currentTab: HTMLElement = this.node.querySelector(classSelectors.tabsTabActive)!;
    const currentToggler: HTMLElement = this.node.querySelector(classSelectors.tabBtnActive)!;

    currentToggler.classList.remove(classes.tabBtnActive);
    clickedToggler.classList.add(classes.tabBtnActive);
    currentTab.classList.remove(classes.tabsTabActive);
    nextTab.classList.add(classes.tabsTabActive);
  }
}
