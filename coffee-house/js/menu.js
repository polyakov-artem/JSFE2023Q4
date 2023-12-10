const CLASS_TAB = "tabs__tab";
const ATTRIBUTE_TAB = "data-tab";

const CLASS_ITEMS_CONTAINER = "menu__grid";
const CLASS_LOAD_BTN = "menu__load-btn";
const CLASS_LOAD_BTN_HIDDEN = "menu__load-btn_hidden";
const CLASS_ITEM = "menu__item";
const CLASS_ACTIVE_TAB = "tabs__tab_active";

const EVENT_TAB_CHANGED = "tabChange";

export class Menu {
  constructor(element) {
    this.domMenu = element;
    this.domLoadBtn = element.querySelector(`.${CLASS_LOAD_BTN}`);

    this.settings = [
      { itemsToShow: 4, maxVWidth: 768 },
      { itemsToShow: 8, maxVWidth: Infinity },
    ];
    this.currentSetting = {};
    this.menu = {};
    this.currentCategory = {};

    this._init();
  }

  _init() {
    this._setCurrentSetting();
    this._bindEvents();

    this._loadProducts()
      .then((products) => this._createMenu(products))
      .then(() => {
        this._setCurrentCategory();
        this._displayFirstProducts();
      })
      .then(() => this._updateLoadBtnState());
  }

  _setCurrentSetting() {
    const windowWidth = window.innerWidth;
    let setting;

    for (let i = 0; i < this.settings.length; i++) {
      if (windowWidth <= this.settings[i].maxVWidth) {
        setting = this.settings[i];
        break;
      }
    }

    this.currentSetting = setting;
  }

  _setCurrentCategory() {
    const categoryName = this.domMenu.querySelector(`.${CLASS_ACTIVE_TAB}`)
      .dataset.tab;

    this.currentCategory = this.menu[categoryName];
  }

  _bindEvents() {
    this.domLoadBtn.addEventListener("click", (e) => {
      this._loadBtnHandler();
    });

    this.domMenu.addEventListener(EVENT_TAB_CHANGED, () => {
      this._tabChangeHandler();
    });

    window.addEventListener("resize", () => {
      this._resizeHandler();
    });
  }

  _loadBtnHandler() {
    this._displayMore(this.currentCategory);
    this._updateLoadBtnState();
  }

  _tabChangeHandler() {
    this._setCurrentCategory();
    this._updateLoadBtnState();
  }

  _resizeHandler() {
    this._setCurrentSetting();
    const itemsToShow = this.currentSetting.itemsToShow;

    for (let category of Object.values(this.menu)) {
      const container = category.container;
      const numOfDisplayed = this._getNumofDisplayed(category);

      if (numOfDisplayed < itemsToShow) {
        this._displayMore(category);
      } else {
        while (container.children.length > itemsToShow) {
          container.removeChild(container.lastChild);
        }
      }
      this._updateLoadBtnState();
    }
  }

  async _loadProducts() {
    const response = await fetch("./assets/json/products.json");
    let products = await response.json();

    if (!Array.isArray(products)) {
      console.log("Can't load products");
      products = [];
    }

    return products;
  }

  _createMenu(products) {
    products.forEach((product, index) => {
      const newProduct = { ...product };
      const { category: categoryName } = newProduct;
      
      if (!(categoryName in this.menu)) {
        this.menu[categoryName] = {
          products: [],
          categoryName: categoryName,
          container: this._getItemsContainer(categoryName),
        };
      }

      newProduct.id = this.menu[categoryName].products.length;
      this.menu[categoryName].products.push(newProduct);
    });
  }

  _getItemsContainer(categoryName) {
    return this.domMenu.querySelector(
      `.${CLASS_TAB}[${ATTRIBUTE_TAB}="${categoryName}"] .${CLASS_ITEMS_CONTAINER}`
    );
  }

  _displayFirstProducts() {
    for (let category of Object.values(this.menu)) {
      this._displayMore(category);
    }
  }

  _displayMore(category) {
    if (this._isAllDisplayed(category)) return;

    const numOfDisplayed = this._getNumofDisplayed(category);
    const startIndex = numOfDisplayed;
    const endIndex = numOfDisplayed + this.currentSetting.itemsToShow;

    const productsToDisplay = category.products.slice(startIndex, endIndex);
    category.container.append(this._createItems(productsToDisplay));
  }

  _isAllDisplayed(category) {
    const numOfDisplayed = this._getNumofDisplayed(category);
    const numOfProducts = this._getNumOfProducts(category);
    return numOfDisplayed === numOfProducts;
  }

  _getNumofDisplayed(category) {
    return category.container.children.length;
  }

  _getNumOfProducts(category) {
    return category.products.length;
  }

  _updateLoadBtnState() {
    if (this._isAllDisplayed(this.currentCategory)) {
      this.domLoadBtn.classList.add(CLASS_LOAD_BTN_HIDDEN);
    } else {
      this.domLoadBtn.classList.remove(CLASS_LOAD_BTN_HIDDEN);
    }
  }

  _getImgPath(name) {
    return `./assets/img/menu/${name.replace(/ /g, "_")}.jpg`;
  }

  _createItems(products = []) {
    const fragment = new DocumentFragment();

    products.forEach((product) => {
      const { name, description, price, category, id } = product;

      const domItem = document.createElement("div");
      domItem.classList.add(CLASS_ITEM);

      const imgPath = this._getImgPath(name);

      const productHtml = `<article class="item-card menu__card" data-action="open-modal" data-category="${category}" data-id="${id}">
          <div class="item-card__img-wrap">
            <img class="cover-img item-card__img" src="${imgPath}" alt="${name} image">
          </div>
          <div class="item-card__body">
            <h4 class="h3 item-card__title">${name}</h4>
            <p class="text item-card__text">${description}</p>
            <p class="h3 item-card__price">$${price}</p>
          </div>
        </article>`;

      domItem.insertAdjacentHTML("afterbegin", productHtml);
      fragment.append(domItem);
    });

    return fragment;
  }
}
