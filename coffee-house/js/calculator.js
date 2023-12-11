const SELECTOR_INPUT_FIELD = ".switch-btn__control";
const SELECTOR_RESULT_FIELD = ".calculator__result-sum";
const CLASS_CALCULATOR = "calculator";
const CLASS_CALCULATOR_CONTAINER = "modal-block__window";


export class CALCULATOR {
  constructor() {
    this.container = document.querySelector(`.${CLASS_CALCULATOR_CONTAINER}`)
    this._createCalculator();
    this._bindEvents();
  }
  
  _bindEvents() {
    this.calculator.addEventListener("input", ()=> {this._setSum()});
  }
  
  _setSum(){
    const checkedInputs = Array.from(this.calculator.querySelectorAll(SELECTOR_INPUT_FIELD)).filter((item)=> item.checked);
    const sum =  checkedInputs.reduce((total, current) => total + +current.value, 0);
    this.calculator.querySelector(SELECTOR_RESULT_FIELD).textContent = `$` + sum.toFixed(2);
  }

  _createCalculator(){
    if (this.calculator) return;
    
    const calculator = document.createElement("div");
    calculator.classList.add(CLASS_CALCULATOR);
    this.container.append(calculator);

    this.calculator  = this.container.querySelector(`.${CLASS_CALCULATOR}`);
  }

  updateView(product = {}){
    const {
      name = "",
      description = "",
      sizes = {},
      additives = [],
      price = "",
      imgPath = "",
    } = product;

    const sizeButtonsData = Object.keys(sizes).map(key=>{
      return {
        value: +sizes[key]?.["add-price"] + +price || "",
        text: sizes[key]?.size || "",
        icon: (key || "").toUpperCase(),
      };
    });

    const addButtonsData = additives.map((additive, index) => {
      return {
        value: additive?.["add-price"] || "",
        text: additive?.name || "",
        icon: index + 1,
      };
    });

    const sizeButtonsHtml = this._getButtonsHtml({buttonsData: sizeButtonsData, name: "size", selectFirst: true, buttonsType: "radio"});
    const addButtonsHtml = this._getButtonsHtml({buttonsData: addButtonsData, name: "additive", selectFirst: false, buttonsType: "checkbox"});
    
    const template = `<div class="calculator__inner">
        <div class="calculator__img-wrap">
          <img class="cover-img calculator__img" src="${imgPath}" alt="">
        </div>
        <form class="calculator__content">
          <h4 class="h3 calculator__title">${name}</h4>
          <p class="calculator__description">${description}</p>

          <fieldset class="calculator__option" name = "sizes">
            <legend class="calculator__option-title">Size</legend>
            <div class="calculator__option-buttons">
              ${sizeButtonsHtml}
            </div>
          </fieldset>

          <fieldset class="calculator__option" name = "additives">
            <legend class="calculator__option-title">Additives</legend>
            <div class="calculator__option-buttons">
              ${addButtonsHtml}
            </div>
          </fieldset>

          <p class="h3 calculator__result">
            <span class="calculator__result-title">Total:</span>
            <span class="calculator__result-sum"></span>
          </p>

          <div class="calculator__note">
            <svg class="calculator__note-icon">
              <use xlink:href="#info"></use>
            </svg>
            <p class="caption calculator__note-text">The cost is not final. Download our mobile app to see the final price and place your order. Earn loyalty points and
            enjoy your favorite coffee with up to 20% discount.</p>
          </div>

          <button class="btn btn-secondary calcultator__close-btn" type="button" data-action="close-modal">
            <span class="btn-secondary__inner">
              <span class="btn-secondary__text">Close</span>
            </span>
          </button>
        </form>
      </div>`;

    this.calculator.innerHTML = template;
    this._setSum();
  }

  _getButtonsHtml(props = {}){
    const {buttonsData = [], buttonsType = "radio", name, selectFirst = false} = props;

    const template = buttonsData.map((btnData, i) => {
      const value = btnData.value || "";
      const text = btnData.text || "";
      const icon = btnData.icon || "";

      return `<label class="switch-btn">
          <input class="switch-btn__control" ${(i == 0 && selectFirst)? "checked" : ""} type="${buttonsType}" name="${name}" value="${value}">
          <span class="btn btn-tab">
            <span class="btn-tab__inner">
              <span class="btn-tab__icon-wrap">
                <span class="btn-tab__icon">${icon}</span>
              </span>
              <span class="btn-tab__text">${text}</span>
            </span>
          </span>
        </label>`;
    });

    return template.join("");
  }
}
