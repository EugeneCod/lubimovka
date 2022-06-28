import { toggleNav, closeNav, toggleHeader } from '../scripts/components/nav.js';

/* ---------------Запуск видео--------------- */
const videoPlayButton = document.querySelector('.video__play-button');
const video = document.querySelector('.video__element');

const playVideo = evt => {
  evt.target.classList.add('video__play-button_hide');
  video.play();
  video.controls = true;
}

videoPlayButton.addEventListener('click', playVideo);

