export class Slider {
  constructor(config, sliderElement) {
    this._slider = sliderElement;
    this._sliderTrack = this._slider.querySelector('.slider__track');
    this._slides = this._slider.querySelectorAll('.slider__item');
    this._slidesText = this._slider.querySelectorAll('.slider__text');
    this._dots = this._slider.querySelectorAll('.slider__dot');
    this._sliderButtons = this._slider.querySelectorAll('.slider__btn');
    this._buttonPrev = this._sliderButtons[0];
    this._buttonNext = this._sliderButtons[1];
    this._offsetSlideClass = config.offsetSlideClass;
    this._conciseSlideTextClass = config._conciseSlideTextClass;
    this._dotActiveClass = config.dotActiveClass;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._slideWidth = this._slides[0].offsetWidth;
    this._slideMarginRight = Number(window.getComputedStyle(this._slides[0], null).getPropertyValue('margin-right').slice(0, 2));
    this._shiftLength = this._slideWidth + this._slideMarginRight,
    this._sliderTrackWidth = (this._sliderTrack.offsetWidth + this._slideMarginRight) * (this._slides.length - 1);

    this._slideIndex = 0,
    this._prevSlideIndex = 0,
    this._currentTranslate = 0,
    this._prevTranslate = 0,
    this._startPos = 0,
    this._animationID = 0,
    this._isDragging = false;

    this._sliderTrack.style.transition = 'transform .4s';
  }

  _enableTouchControl() {
    const setSliderPosition = () => {
      if (this._currentTranslate < 25 && this._currentTranslate > -this._sliderTrackWidth - 25) {
        this._sliderTrack.style.transform = `translate3d(${this._currentTranslate}px, 0px, 0px)`;
      }
    }
    
    const animation = () => {
      setSliderPosition();
      if (this._isDragging) requestAnimationFrame(animation);
    }

    const getPositionX = (evt) => {
      return evt.touches[0].clientX
    }

    const touchStart = (index) => {
      return (evt) => {
        this._slideIndex = index;
        this._startPos = getPositionX(evt);
        this._isDragging = true;
        this._animationID = requestAnimationFrame(animation);
      }
    }

    const touchEnd = () => {
      this._isDragging = false;
      cancelAnimationFrame(this._animationID);

      const movedBy = this._currentTranslate - this._prevTranslate;

      if (movedBy < -100 && this._slideIndex < this._slides.length - 1) {
        this._alternateСlasses();
        this._slideIndex += 1;
      }

      if (movedBy > 100 && this._slideIndex > 0) {
        this._alternateСlasses();
        this._slideIndex -= 1
      }
      this._slide()
    }

    const touchMove = (evt) => {
      if (this._isDragging) {
        const currentPosition = getPositionX(evt)
        this._currentTranslate = this._prevTranslate + currentPosition - this._startPos
      }
    }

    const addTouchEventListenes = () => {
      this._slides.forEach((slide, index) => {
        const headingImage = slide.querySelector('.slider__logo-heading');
        headingImage.addEventListener('dragstart', (evt) => evt.preventDefault());
  
        slide.addEventListener('touchstart', touchStart(index));
        slide.addEventListener('touchend', touchEnd);
        slide.addEventListener('touchmove', touchMove);
      });
    };
    addTouchEventListenes();
  }


  _slide() {

    this._slides[this._slideIndex].classList.remove(this._offsetSlideClass);
    this._slidesText[this._slideIndex].classList.remove(this._conciseSlideTextClass);
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
    console.log(this._slideIndex);
    if (this._slideIndex < this._slides.length - 1) {
      this._alternateСlasses();
      this._slideIndex++;

      
      this._slide();
    }
  }

  _handleButtonPrev() {
    if (this._slideIndex !== 0) {
      this._alternateСlasses();
      this._slideIndex--;
      this._slide();
    }
  }

  _alternateСlasses() {
    this._slides[this._slideIndex].classList.add(this._offsetSlideClass);
    this._slidesText[this._slideIndex].classList.add(this._conciseSlideTextClass);
    this._prevSlideIndex = this._slideIndex;
  }

  _addEventListeners() {
    this._buttonNext.addEventListener('click', this._handleButtonNext.bind(this));
    this._buttonPrev.addEventListener('click', this._handleButtonPrev.bind(this));

    this._dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        this._alternateСlasses();
        this._slideIndex = index;
        this._slide();
      });
    });
  }

  enableSlide() {
    this._addEventListeners();
    if(document.documentElement.clientWidth < 769) {
      this._enableTouchControl()
    }
    this._slide();
  }
}