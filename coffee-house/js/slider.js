const classes = {
  btn: "btn",
  progressBar: "slider__dot-inner",
  dot: "slider__dot",
  dotActive: "slider__dot_active",
  dotsWrap: "slider__dots",
  slide: "slider__item",
  slidesWrap: "slider__items",
  viewport: "slider__viewport",
  nextBtn: "slider__next-btn",
  prevBtn: "slider__prev-btn"
};

export class Slider {
  constructor(element) {
    this.slider = element;
    this.slides = element.querySelectorAll(`.${classes.slide}`);
    this.slidesWrap = element.querySelector(`.${classes.slidesWrap}`);
    this.dotsWrap = element.querySelector(`.${classes.dotsWrap}`);
    this.viewport = element.querySelector(`.${classes.viewport}`);
    this.currentSlideIndex = 0;
    this.switchingTime = 500;
    this.waitingTime = 2000;
    this.currentProgress = 0;
    this.switchTimer;
    this.timeLeftToSwitch = this.waitingTime;

    this._createDots();
    this._setSlidingOptions()
    this._bindEvents();
    this.play();
  }

  _createDots() {
    const dotsHtml = 
      `<div class="slider__dots">
        <button class="btn slider__dot">
          <span class="slider__dot-inner"></span>
        </button>
      </div>`.repeat(this.slides.length);

    this.dotsWrap.insertAdjacentHTML("afterbegin", dotsHtml);
    this.dotsWrap.children[this.currentSlideIndex].classList.add(classes.dotActive);
  }
  
  _setSlidingOptions() {
    this.slidesWrap.style.transition = `transform ${this.switchingTime}ms ease`;
  }

  _bindEvents() {
    this.slider.addEventListener("click", (e) => {this._btnClickHandler(e)});
    // this.viewport.addEventListener("pointerout", (e) => {this._play()});
    // this.viewport.addEventListener("pointerenter", (e) => {this._stop()});
    // this.viewport.addEventListener("pointerdown", (e) => {this._stop()});
  }

  _btnClickHandler(e) {
    const nextBtn = e.target.closest(`.${classes.nextBtn}`);
    const prevBtn = e.target.closest(`.${classes.prevBtn}`);

    if (nextBtn) {
      this.slideRight();
      return;
    }

    if (prevBtn) {
      this.slideLeft();
      return;
    }
  }

  slideRight() {
    let nextSlideIndex = this.currentSlideIndex + 1;
    if (nextSlideIndex > this.slides.length - 1) nextSlideIndex = 0;
    this.switchSlide(nextSlideIndex);
  }

  slideLeft() {
    let nextSlideIndex = this.currentSlideIndex - 1;
    if (nextSlideIndex < 0) nextSlideIndex = this.slides.length - 1;
    this.switchSlide(nextSlideIndex);
  }

  switchSlide(nextSlideIndex) {
    const prevSlideIndex = this.currentSlideIndex;
    this.currentSlideIndex = nextSlideIndex;
    this.timeLeftToSwitch = this.waitingTime;
    
    this._changeActiveSlide();
    this._changeActiveDot(prevSlideIndex);
  }

  _changeActiveSlide(){
    this.slidesWrap.style.transform = `translateX(${-this.currentSlideIndex * 100}%`;
  }

  _changeActiveDot(prevSlideIndex){
    this._resetProgress(prevSlideIndex);
    this.dotsWrap.children[prevSlideIndex].classList.remove(classes.dotActive);

    this.dotsWrap.children[this.currentSlideIndex].classList.add(classes.dotActive);
    this._startProgressAnimation(this.currentSlideIndex);
  }

  _resetProgress(dotIndex){
    this._setProgress("0%", dotIndex);
  }

  _setProgress(value, dotIndex){
    const progressBar = this.dotsWrap.children[dotIndex].querySelector(`.${classes.progressBar}`);
    progressBar.style.transition = `none`;
    progressBar.style.width = value;
  }

  _startProgressAnimation(dotIndex){
    const progressBar = this.dotsWrap.children[dotIndex].querySelector(`.${classes.progressBar}`);
    progressBar.style.transition = `width ${this.timeLeftToSwitch}ms linear`;
    setTimeout(()=>{progressBar.style.width = "100%";}, 20)
  }

  play() {
    this._startProgressAnimation(this.currentSlideIndex)
    
    this.switchTimer = setInterval( () => {
      this.timeLeftToSwitch -= 100;

      if (this.timeLeftToSwitch <= 0) {
        this.slideRight();
      }
    },
    100);
  }

  stop(){
    clearTimeout(this.switchTimer);
    this._setActiveProgress(`${Math.round(this.timeLeftToSwitch/this.waitingTime)*100}%`)
  }
}
