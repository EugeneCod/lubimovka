import { toggleNav, closeNav } from '../scripts/components/nav.js';
import { Slider } from '../scripts/components/Slider.js';        



/* ---------------Запуск видео--------------- */
const videoPlayButton = document.querySelector('.video__play-button');
const video = document.querySelector('.video__element');

const playVideo = evt => {
  evt.target.classList.add('video__play-button_hide');
  video.play();
  video.controls = true;
}

videoPlayButton.addEventListener('click', playVideo);



/* -----------------Слайдеры----------------- */
const config = {
  offsetSlideClass: 'slider__item_offset',
  conciseSlideTextClass: 'slider__text_concise',
  dotActiveClass: 'slider__dot_active',
  inactiveButtonClass: 'slider__btn_inactive',
}

const sliders = {};

const sliderElements = document.querySelectorAll('.slider');
sliderElements.forEach((sliderElement, index) => {
  const slider = new Slider(config, sliderElement);
  sliders[index] = slider;
  slider.enableSlide();
});