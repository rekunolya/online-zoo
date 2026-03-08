import { DonationModal } from '../modal/DonationModal'; 

//Slider
const PET_BUTTON_LEFT = document.getElementById('pet-button-left'); 
const PET_BUTTON_RIGHT = document.getElementById('pet-button-right');
let offset = 0; // initial left indent in the slider
let start = 0;
const SLIDER = document.getElementById('slider-carousel');
let sliderWidth: number = SLIDER?.offsetWidth || 0; // slider width
let swapSlider = 0; // the length to scroll the slider
let visibleArea = 0; // width of the slider's visible area

function disableButton(btn: HTMLElement, func: () => void) {
  btn.removeEventListener('click', func);
  btn.classList.add('button-arrow_nonactive');
}

function enableButton(btn: HTMLElement, func: () => void) {
  btn.addEventListener('click', func);
  btn.classList.remove('button-arrow_nonactive');
}
const moveRight = () => {
  offset -= swapSlider;
  if (SLIDER) {
    SLIDER.style.left = offset + 'px';
  }
  if (offset < start && PET_BUTTON_LEFT) {
    enableButton(PET_BUTTON_LEFT, moveLeft);
  }
  if (offset <= -visibleArea - swapSlider && PET_BUTTON_RIGHT) {
    disableButton(PET_BUTTON_RIGHT, moveRight);
  }
}

const moveLeft = () => {
  offset += swapSlider;
  if (SLIDER) {
    SLIDER.style.left = offset + 'px';
  }
  if (offset >= start && PET_BUTTON_LEFT) {
    disableButton(PET_BUTTON_LEFT, moveLeft);
  }

  if (offset > -visibleArea && PET_BUTTON_RIGHT) {
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

    visibleArea = windowWidth - start; // Slider's visible area = screen width - left margin

  } /*else if (windowWidth < 769 && windowWidth >= 380) {
    start = 10;
    swapSlider = (sliderWidth - (windowWidth - start)) / 6;
  } */
  offset = start;

  if (SLIDER) {
    SLIDER.style.left = offset + 'px';
  }
  visibleArea = sliderWidth - (windowWidth - offset);

  swapSlider = Math.round(swapSlider);
  disableButton(PET_BUTTON_LEFT as HTMLButtonElement, moveLeft);
  enableButton(PET_BUTTON_RIGHT as HTMLButtonElement, moveRight);
} 

setSwapSlider();
window.addEventListener('resize', setSwapSlider);

if (PET_BUTTON_RIGHT) {
  PET_BUTTON_RIGHT.addEventListener('click', moveRight);
}
if (PET_BUTTON_LEFT) {
  PET_BUTTON_LEFT.addEventListener('click', moveLeft);
}

//Donation button
const DONATION_BUTTON = document.getElementById('donation-button');
if (DONATION_BUTTON) {
  DONATION_BUTTON.addEventListener('click', () => {
    console.log('Donation button clicked');
    const donationModal = new DonationModal(['donation-modal']);
    donationModal.renderModal();
  });
}