import { Animal } from 'pages/interface/animal';
import { DonationModal } from '../modal/DonationModal'; 
import { createAnimalCard } from './cadr';
import { AnimalImages } from 'pages/interface/animal-images';

//Slider
const PET_BUTTON_LEFT = document.getElementById('pet-button-left'); 
const PET_BUTTON_RIGHT = document.getElementById('pet-button-right');
let offset = 0; // initial left indent in the slider
let start = 0;
const SLIDER = document.getElementById('slider-carousel');
let sliderWidth: number = SLIDER?.offsetWidth || 0; // slider width
console.log('sliderWidth', sliderWidth)
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

//Render animal card to landing page
let animalArray: Animal[] = [];
const URL: string = 'https://vsqsnqnxkh.execute-api.eu-central-1.amazonaws.com/prod/';

let animalImages: AnimalImages[] = [];
const animalImagesURL:string = '/pages/json/animal-images.json';

async function getAnimal(): Promise<Animal[]> {
  const response = await fetch(`${URL}/pets`);
  const animals = await response.json();
  console.log('animals', animals);
  for (let animal of animals.data) {
    animalArray.push(animal);
  }
  return animalArray;
}

async function getAnimalImages(): Promise<AnimalImages[]> {
  console.log('getAnimalImages')
  const response = await fetch(animalImagesURL);
  const imageURLs = await response.json();
  console.log('imageURLs', imageURLs)
  for (let url of imageURLs) {
    animalImages.push(url)
  }

  return animalImages;
}

let sliderContainer = document.querySelector('#slider__container')

function setAnimalCards() {
  if (!sliderContainer) return;

  animalArray.forEach((animal) => {
    const image: AnimalImages | undefined = animalImages.find((img) => img.name === animal.name);

    const card = createAnimalCard(
      animal.name,
      image?.src || '',
      image?.alt || '',
      animal.commonName,
      animal.description
    );
    sliderContainer.append(card);
  })
}

async function init() {
  await getAnimal();   // wait for loading animal
  await getAnimalImages(); // wait for loading images
  setAnimalCards();   
}

init();