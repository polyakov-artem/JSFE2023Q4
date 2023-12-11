const CLASS_BTN = "btn";
const CLASS_DOT = "slider__dot";
const CLASS_BTN_INNER = "slider__dot-inner";
const CLASS_DOT_ACTIVE = "slider__dot_active";
// const CLASS_DOT_VISIBLE = "slider__dot_visible";

const SELECTOR_ITEM = ".slider__item";
const SELECTOR_VIEWPORT = ".slider__viewport";
const SELECTOR_ITEMS_WRAP = ".slider__items";
const SELECTOR_NEXT_BTN = ".slider__next-btn";
const SELECTOR_PREV_BTN = ".slider__prev-btn";
const SELECTOR_DOTS_WRAP = ".slider__dots";
const SELECTOR_DOT = ".slider__dot";


export class Slider {
  constructor(element) {
    this.slider = element;
    this.items = element.querySelectorAll(SELECTOR_ITEM);
    this.itemsWrap = element.querySelector(SELECTOR_ITEMS_WRAP);
    this.viewport = element.querySelector(SELECTOR_VIEWPORT);
    this.nextBtn = element.querySelector(SELECTOR_NEXT_BTN);
    this.prevBtn = element.querySelector(SELECTOR_PREV_BTN);
    this.dotsContainer = element.querySelector(SELECTOR_DOTS_WRAP);

    this.lastSlideIndex = this.items.length - 1;
    this.activeSlide = 0;
    this.movingTime = 0.5;
    this.waitingTime = 2000;
    this.currentProgress = 0;
    this.timerId;

    this._createDots();
    this._setTransitionOptions();
    this._bindEvents();
    this.play();
  }

  _createDots() {
    const dotsHtml = 
      `<div class="slider__dots">
        <button class="btn slider__dot">
          <span class="slider__dot-inner"></span>
        </button>
      </div>`.repeat(this.items.length);

    this.dotsContainer.insertAdjacentHTML("afterbegin", dotsHtml);
    this.dotsContainer.children[0].classList.add(CLASS_DOT_ACTIVE);
  }

  _bindEvents() {
    window.addEventListener("click", this._clickHandler.bind(this));
  }

  _setTransitionOptions() {
    this.itemsWrap.style.transition = `transform ${this.movingTime}s ease`;
  }

  slide(slideNum) {
    this.dotsContainer.children[this.activeSlide].classList.remove(
      CLASS_DOT_ACTIVE
    );
    this.dotsContainer.children[slideNum].classList.add(CLASS_DOT_ACTIVE);
    this.itemsWrap.style.transform = `translateX(${-slideNum * 100}%`;
    this.activeSlide = slideNum;
  }

  slideRight() {
    let nextSlideNumber = this.activeSlide + 1;
    if (nextSlideNumber > this.lastSlideIndex) nextSlideNumber = 0;
    this.slide(nextSlideNumber);
  }

  slideLeft() {
    let nextSlideNumber = this.activeSlide - 1;
    if (nextSlideNumber < 0) nextSlideNumber = this.lastSlideIndex;
    this.slide(nextSlideNumber);
  }

  _setActiveDotProgress(val) {
    this.dotsContainer.children[this.activeSlide].style.width = `${val}%`;
  }

  _clearActiveDotProgress(val) {
    _setActiveDotProgress(0);
  }

  play() {
    this.timerId = setInterval(() => {
      this.slideRight();
    }, this.waitingTime);
  }

  disableAutoPlay() {}

  // _disableBtn(btn) {
  //   btn.setAttribute("disabled", "true");
  // }

  // _enableBtn(btn) {
  //   btn.removeAttribute("disabled");
  // }

  _clickHandler(e) {
    const target = e.target;
    const nextBtn = target.closest(SELECTOR_NEXT_BTN);
    const prevBtn = target.closest(SELECTOR_PREV_BTN);

    if (nextBtn) {
      this.slideRight();
      return;
    }

    if (prevBtn) {
      this.slideLeft();
      return;
    }
  }
}
