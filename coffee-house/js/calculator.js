const SELECTOR_INPUT_FIELD = ".switch-btn__control";
const SELECTOR_RESULT_FIELD = ".calculator__result-sum";
const EVENT_PRDOCUT_CARD_UPDATED = "productCardUpdated";

export class CALCULATOR {
  constructor(element) {
    this.calculator = element;
    this.resultField = element.querySelector(SELECTOR_RESULT_FIELD);
    this.inputs = element.querySelectorAll(SELECTOR_INPUT_FIELD);

    this._bindEvents();
  }

  _setSum(){
    const checkedInputs = Array.from(this.inputs).filter((item)=> item.checked);
    const sum =  checkedInputs.reduce((total, current) => total + +current.value, 0);
    this.resultField.textContent = `$` + sum;
  }

  _bindEvents() {
    this.calculator.addEventListener(EVENT_PRDOCUT_CARD_UPDATED, this._setSum.bind(this));
    this.calculator.addEventListener("input", this._setSum.bind(this));
  }
}
