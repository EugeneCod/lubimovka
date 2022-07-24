export default class SliderComments {
  constructor(config, individualСonfig, sliderSelector) {
    this._slider = document.querySelector(sliderSelector);
    this._sliderTrack = this._slider.querySelector(config.sliderTrackSelector);
    this._slides = this._slider.querySelectorAll(config.sliderItemSelector);
    this._offsetSlideClass = individualСonfig.offsetSlideClass;
    this._slidesText = this._slider.querySelectorAll(individualСonfig.slideTextSelector);
    this._offsetSlideTextClass = individualСonfig.offsetSlideTextClass;
    this._dots = this._slider.querySelectorAll('.slider__dot');
    this._sliderButtons = this._slider.querySelectorAll('.slider__btn');
    this._buttonPrev = this._sliderButtons[0];
    this._buttonNext = this._sliderButtons[1];
    this._dotActiveClass = config.dotActiveClass;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._slideWidth = this._slides[0].offsetWidth;
    this._slideMarginRight = Number(window.getComputedStyle(this._slides[0], null).getPropertyValue('margin-right').slice(0, 2));
    this._shiftLength = this._slideWidth + this._slideMarginRight;
    this._sliderTrackWidth = (this._sliderTrack.offsetWidth + this._slideMarginRight) * (this._slides.length - 1);

    this._slideIndex = 0;
    this._prevSlideIndex = 0;
    this._currentTranslate = 0;
    this._prevTranslate = 0;
    this._startPos = 0;
    this._animationID = 0;
    this._isDragging = false;

    this._sliderTrack.style.transition = 'transform .4s';
  }

  // *---------- touch control start ----------------

  _setSliderPosition() {
    if (this._currentTranslate < 25 && this._currentTranslate > -this._sliderTrackWidth - 25) {
      this._sliderTrack.style.transform = `translate3d(${this._currentTranslate}px, 0px, 0px)`;
    }
  }

  _animation() {
    this._setSliderPosition();
    if (this._isDragging) requestAnimationFrame(this._animation.bind(this));
  }

  _getPositionX(evt) {
    return evt.touches[0].clientX;
  }

  _touchStart(index) {
    return (evt) => {
      this._slideIndex = index;
      this._startPos = this._getPositionX(evt);
      this._isDragging = true;
      this._animationID = requestAnimationFrame(this._animation.bind(this));
    }
  }

  _touchEnd() {
    this._isDragging = false;
    cancelAnimationFrame(this._animationID);

    const movedBy = this._currentTranslate - this._prevTranslate;

    if (movedBy < -100 && this._slideIndex < this._slides.length - 1) {
      this._toggleСlasses();
      this._saveCurrentIndex();
      this._slideIndex += 1;
    }

    if (movedBy > 100 && this._slideIndex > 0) {
      this._toggleСlasses();
      this._saveCurrentIndex();
      this._slideIndex -= 1;
    }
    this._slide();
  } 

  _touchMove(evt) {
    if (this._isDragging) {
      const currentPosition = this._getPositionX(evt)
      this._currentTranslate = this._prevTranslate + currentPosition - this._startPos
    }
  }

  _addTouchEventListeners() {
    this._slides.forEach((slide, index) => {
      slide.addEventListener('touchstart', this._touchStart(index));
      slide.addEventListener('touchend', this._touchEnd.bind(this));
      slide.addEventListener('touchmove', this._touchMove.bind(this));
    });
  }

  // *---------- touch control end ----------------

  _slide() {
    if (this._slides[this._slideIndex].classList.contains(this._offsetSlideClass)) {
      this._toggleСlasses();
    }
    this._currentTranslate = -this._shiftLength * this._slideIndex;
    this._prevTranslate = this._currentTranslate;
    this._sliderTrack.style.transform = `translate3d(${this._currentTranslate}px, 0px, 0px)`;

    if (this._slideIndex === this._slides.length - 1) {
      this._buttonNext.classList.add(this._inactiveButtonClass);
    } else if (this._buttonNext.classList.contains(this._inactiveButtonClass)) {
      this._buttonNext.classList.remove(this._inactiveButtonClass);
    }

    if (this._slideIndex === 0) {
      this._buttonPrev.classList.add(this._inactiveButtonClass);
    } else if (this._buttonPrev.classList.contains(this._inactiveButtonClass)) {
      this._buttonPrev.classList.remove(this._inactiveButtonClass);
    }

    this._dots[this._slideIndex].classList.add(this._dotActiveClass);
    if (this._slideIndex !== this._prevSlideIndex) {
      this._dots[this._prevSlideIndex].classList.remove(this._dotActiveClass);
    }
  }

  _handleButtonNext() {
    if (this._slideIndex < this._slides.length - 1) {
      this._toggleСlasses();
      this._saveCurrentIndex();
      this._slideIndex++;
      this._slide();
    }
  }

  _handleButtonPrev() {
    if (this._slideIndex !== 0) {
      this._toggleСlasses();
      this._saveCurrentIndex();
      this._slideIndex--;
      this._slide();
    }
  }

  _saveCurrentIndex() {
    this._prevSlideIndex = this._slideIndex;
  }

  _toggleСlasses() {
    this._slides[this._slideIndex].classList.toggle(this._offsetSlideClass);
    this._slidesText[this._slideIndex].classList.toggle(this._offsetSlideTextClass);
  }

  _addEventListeners() {
    this._buttonNext.addEventListener('click', this._handleButtonNext.bind(this));
    this._buttonPrev.addEventListener('click', this._handleButtonPrev.bind(this));

    this._dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        this._toggleСlasses();
        this._saveCurrentIndex();
        this._slideIndex = index;
        this._slide();
      });
    });
  }

  enableSlide() {
    this._addEventListeners();
    if (document.documentElement.clientWidth < 769) {
      this._addTouchEventListeners();
    }
    this._slide();
  }
}