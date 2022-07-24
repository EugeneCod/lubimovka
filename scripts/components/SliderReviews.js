import SliderComments from './SliderComments.js';

export default class SliderRewievs extends SliderComments {
  constructor(config, individualСonfig, sliderSelector) {
    super(config, individualСonfig, sliderSelector);
    this._headingImageSelector = config.headingImageSelector;
  }

  _addTouchEventListeners() {
    super._addTouchEventListeners();
    this._slides.forEach((slide) => {
      const headingImage = slide.querySelector(this._headingImageSelector);
      headingImage.addEventListener('dragstart', (evt) => evt.preventDefault());
    });
  }
}
