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
    this.waitingTime = 4000;
    this.currentProgress = 0;
    this.switchTimer;
    this.timeLeftToSwitch = this.waitingTime;
    this._isStopped = true;
    this.swipeThreshold = 50;

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
    this.slider.addEventListener("click", (e) => {
      this._btnClickHandler(e)
    
    });
    this.viewport.addEventListener("pointerleave", (e) => {
      this.play();
    });
    this.viewport.addEventListener("pointerenter", (e) => {
      this.stop()
    });
    this.viewport.addEventListener("pointerdown", (e) => {
      this._swipeHandler(e)}
    );
    this.viewport.addEventListener("dragstart", (e) => {
      e.preventDefault();
    });
    this.viewport.addEventListener("drop", (e) => {
      e.preventDefault();
    });

    document.addEventListener("keyup", (e) => {
      if (e.key == "ArrowRight") this.slideRight();
      if (e.key == "ArrowLeft") this.slideLeft();
    });
  }

  _swipeHandler(e){
    let startX = e.pageX;
    let endX = startX;

    this.viewport.setPointerCapture(e.pointerId);
    this.viewport.onpointermove = (e) => {
      endX = e.pageX
    };

    this.viewport.onpointerup = (e) => {
      const diff = startX - endX;
      if (Math.abs(diff) > this.swipeThreshold) {
        (diff > 0)? 
          this.slideRight(): 
          this.slideLeft();
      };

      this.viewport.onpointermove = null;
      this.viewport.onpointerup = null;
    };
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
    this._changeActiveSlide(nextSlideIndex);
    this._changeActiveDot(nextSlideIndex);
    this.timeLeftToSwitch = this.waitingTime;
    this.play()
  }
  
  _changeActiveSlide(nextSlideIndex){
    this.slidesWrap.style.transform = `translateX(${-nextSlideIndex * 100}%`;
  }
  
  _changeActiveDot(nextSlideIndex){
    this._resetСurrentProgress();
    this.dotsWrap.children[this.currentSlideIndex].classList.remove(classes.dotActive);
    
    this.dotsWrap.children[nextSlideIndex].classList.add(classes.dotActive);
    this.currentSlideIndex = nextSlideIndex;
  }

  _resetСurrentProgress(){
    this._setCurrentProgress("0%");
  }

  _setCurrentProgress(value){
    const progressBar = this.dotsWrap.children[this.currentSlideIndex].querySelector(`.${classes.progressBar}`);
    progressBar.style.transition = `unset`;
    progressBar.style.width = value;
  }

  _startProgressAnimation(){
    const progressBar = this.dotsWrap.children[this.currentSlideIndex].querySelector(`.${classes.progressBar}`);
    progressBar.style.width = this._getCurrentProggres();
    progressBar.style.transition = `width ${this.timeLeftToSwitch}ms linear`;
    setTimeout( ()=>{progressBar.style.width = "100%";}, 20 )

  }

  play() {
    this._startProgressAnimation();
    if (this._isStopped) {
      this.switchTimer = setInterval(() => {
        this.timeLeftToSwitch -= 100;
        if (this.timeLeftToSwitch <= 0) {
          this.slideRight();
        }
      }, 100);
    };
    this._isStopped = false;
  }
  
  _getCurrentProggres(){
    return Math.round(100 - (this.timeLeftToSwitch / this.waitingTime) * 100) + "%"
  }

  stop(){
    clearInterval(this.switchTimer);
    this._setCurrentProgress(this._getCurrentProggres());
    this._isStopped = true;
  }
}
