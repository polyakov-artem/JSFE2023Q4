const CLASS_TOGGLER = "btn-tab";
const CLASS_TOGGLER_ACTIVE = "btn-tab_active";

const TOGGLER_ATTRIBUTE = "data-target";
const TARGET_TAB_ATTRIBUTE = "data-tab";

const CLASS_TAB_ACTIVE = "tabs__tab_active";
const CLASS_TAB_HIDDEN = "tabs__tab_hidden";

const EVENT_TAB_CHANGED = "tabChange";

export class Tabs {
  constructor(element) {
    this.tabs = element;
    this._bindEvents();
  }

  _bindEvents() {
    this.tabs.addEventListener("click", this._togglerClickHandler.bind(this));
  }

  _togglerClickHandler(e) {
    const nextToggler = e.target.closest(`.${CLASS_TOGGLER}`);
    if (!nextToggler) return;

    const nextTabName = nextToggler.getAttribute(TOGGLER_ATTRIBUTE);
    const nextTab = this.tabs.querySelector(
      `[${TARGET_TAB_ATTRIBUTE}="${nextTabName}"]`
    );

    if (!nextTab) return;

    this._changeCurrentToggler(nextToggler);
    this._changeCurrentTab(nextTab);
  }

  _changeCurrentToggler(nextToggler) {
    const currentToggler = this.tabs.querySelector(`.${CLASS_TOGGLER_ACTIVE}`);
    currentToggler.classList.remove(CLASS_TOGGLER_ACTIVE);
    nextToggler.classList.add(CLASS_TOGGLER_ACTIVE);
  }

  _changeCurrentTab(nextTab) {
    const currentTab = this.tabs.querySelector(`.${CLASS_TAB_ACTIVE}`);
    currentTab.classList.remove(CLASS_TAB_ACTIVE);
    currentTab.classList.remove(CLASS_TAB_HIDDEN);

    nextTab.classList.add(CLASS_TAB_HIDDEN);
    nextTab.classList.add(CLASS_TAB_ACTIVE);

    setTimeout(() => {
      nextTab.classList.remove(CLASS_TAB_HIDDEN);
      this._dispatchChangeEvent();
    }, 20);
  }

  _dispatchChangeEvent() {
    const tabChangeEvent = new CustomEvent(EVENT_TAB_CHANGED);
    this.tabs.dispatchEvent(tabChangeEvent);
  }
}
