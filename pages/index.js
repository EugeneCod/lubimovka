import { toggleNav, closeNav } from '../scripts/components/nav.js';
import SliderComments from '../scripts/components/SliderComments.js';    
import SliderRewievs from '../scripts/components/SliderReviews.js';    

import {
  configSlider,
  configSliderComments,
  configSliderReviews,
  sliderReviewsSelector,
  sliderCommentsSelector,
} from '../scripts/utils/constants.js'; 



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

const sliderComments = new SliderComments(configSlider, configSliderComments, sliderCommentsSelector);
sliderComments.enableSlide();

const sliderRewievs = new SliderRewievs(configSlider, configSliderReviews, sliderReviewsSelector);
sliderRewievs.enableSlide();