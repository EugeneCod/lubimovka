// Constants
const hamburgerMenu = document.querySelector('.nav__hamburger');
const header = document.querySelector('.header');
const navList = document.querySelector('.nav__list');
const navLinks = document.querySelectorAll('.nav__link');


// Toggle Navigation
const toggleNav = () => {
  hamburgerMenu.classList.toggle('active');
  document.body.classList.toggle('lock')
  navList.classList.toggle('nav__list_show');
}

// Remove menu on link click
const closeNav = () => {
  hamburgerMenu.classList.remove('active');
  document.body.classList.remove('lock');
  navList.classList.remove('nav__list_show');
}

// Add and remove fixed header
const toggleHeader = () => {
  const scrollHeight = window.pageYOffset;
  const headerHeight = header.getBoundingClientRect().height;

  if (scrollHeight > headerHeight) {
    header.classList.add('header_fixed');
  } else {
    header.classList.remove('header_fixed');
  }
} 

// Event listeners
hamburgerMenu.addEventListener('click', toggleNav);
window.addEventListener('scroll', toggleHeader); 
navLinks.forEach(navLink => {
  navLink.addEventListener('click', closeNav);
})


export {  toggleNav, closeNav, toggleHeader };