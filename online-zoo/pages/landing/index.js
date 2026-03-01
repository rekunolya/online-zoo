import { DonationModal } from '../modal/DonationModal.js'; 

//Slider
const PET_BUTTON_LEFT = document.getElementById('pet-button-left'); 
const PET_BUTTON_RIGHT = document.getElementById('pet-button-right');
let offset = 0; // initial left indent in the slider
let start = 0;
const SLIDER = document.getElementById('slider-carousel');
let sliderWidth = SLIDER.offsetWidth; // slider width
let swapSlider = 0; // the length to scroll the slider
let visibleArea = 0; // width of the slider's visible area

function disableButton(btn, func) {
  btn.removeEventListener('click', func);
  btn.classList.add('button-arrow_nonactive');
}

function enableButton(btn, func) {
  btn.addEventListener('click', func);
  btn.classList.remove('button-arrow_nonactive');
}
const moveRight = () => {
  offset -= swapSlider;
  SLIDER.style.left = offset + 'px';
  if (offset < start) {
    enableButton(PET_BUTTON_LEFT, moveLeft);
  }
  if (offset <= -visibleArea - swapSlider) {
    disableButton(PET_BUTTON_RIGHT, moveRight);
  }
}

const moveLeft = () => {
  offset += swapSlider;
  SLIDER.style.left = offset + 'px';
  if (offset >= start) {
    disableButton(PET_BUTTON_LEFT, moveLeft);
  }

  if (offset > -visibleArea) {
    enableButton(PET_BUTTON_RIGHT, moveRight);
  }
}

function setSwapSlider() {
  let windowWidth = window.screen.width; // screen width
  swapSlider = 0;
  offset = 0;

  // screen width > 1920px
  if (windowWidth > 1920) {
    windowWidth = 1920;
  }
  if (windowWidth >= 1200) {
    start = 0; // according to the layout, with a width > 1200px, the slider's left margin = 0
    swapSlider = 480; // 480 - width of one card + space between cards
    console.log('swapSlider after', swapSlider);
    visibleArea = windowWidth - start; // Slider's visible area = screen width - left margin
    console.log('visibleArea after', visibleArea);
  } /*else if (windowWidth < 769 && windowWidth >= 380) {
    start = 10;
    swapSlider = (sliderWidth - (windowWidth - start)) / 6;
  } */
  offset = start;
  console.log('offset', offset);
  SLIDER.style.left = offset + 'px';
  visibleArea = sliderWidth - (windowWidth - offset);
  console.log('visibleArea', visibleArea);
  swapSlider = Math.round(swapSlider);
  disableButton(PET_BUTTON_LEFT, moveLeft);
  enableButton(PET_BUTTON_RIGHT, moveRight);
} 

setSwapSlider();
window.addEventListener('resize', setSwapSlider);

PET_BUTTON_RIGHT.addEventListener('click', moveRight);
PET_BUTTON_LEFT.addEventListener('click', moveLeft); 

//Donation button
const DONATION_BUTTON = document.getElementById('donation-button');
DONATION_BUTTON.addEventListener('click', () => {
  console.log('Donation button clicked');
  const donationModal = new DonationModal(['donation-modal']);
  donationModal.renderModal();
});