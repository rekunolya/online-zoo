import { Animal } from 'pages/interface/animal';
import { DonationModal } from '../modal/DonationModal'; 
import { createAnimalCard } from './cadr';
import { AnimalImages } from 'pages/interface/animal-images';

//Slider
const PET_BUTTON_LEFT = document.getElementById('pet-button-left') as HTMLButtonElement; 
const PET_BUTTON_RIGHT = document.getElementById('pet-button-right') as HTMLButtonElement;
const track = document.getElementById('slider__container') as HTMLElement;
const viewport = document.getElementById('pets__container') as HTMLElement;
let sliderContainer = document.querySelector('#slider__container')

let position = 0;
let cardWidth = 480;
let cardsPetSlide = 2;
let step = cardWidth * cardsPetSlide;

function clooneCards() {
  const cards = Array.from(track?.children);

  cards.slice(-4).forEach((card) => {
    const clone = card.cloneNode(true) as HTMLElement;
    clone.classList.add('clone');
    track?.append(clone);
  });

  cards.slice(0, 4).forEach((card) => {
    const clone = card.cloneNode(true) as HTMLElement;
    clone.classList.add('clone');
    track?.append(clone);
  });

  position = -step;
  track.style.transform = `translateX(${position}px)`;
}

function move(direction: 'left' | 'right') {
  if (direction === 'right') {
    position -= step;
  } else {
    position += step;
  }

  track.style.transition = 'transform 0.4s ease';
  track.style.transform = `translateX(${position}px)`;

  track.addEventListener('transitionend', () => {
    const totalWidth = track.scrollWidth;
    const viewportWidth = viewport.offsetWidth;

    // End of container -> return to the start
    if (position <= -(totalWidth - viewportWidth - step)) {
      track.style.transition = 'none';
      position = -step;
      console.log('position right', position);
      track.style.transform = `translateX(${position}px)`;
    }

    // Slide to left, if start -> return to the end
    if (position >= 0) {
      track.style.transition = 'none';
      position = -(totalWidth - viewportWidth - step * 2);
      console.log('position left', position);
      track.style.transform = `translateX(${position}px)`;
    }
  }, { once: true });
}

PET_BUTTON_RIGHT.addEventListener('click', () => move('right'));
PET_BUTTON_LEFT.addEventListener('click', () => move('left'));

const DONATION_BUTTON = document.getElementById('donation-button');
if (DONATION_BUTTON) {
  DONATION_BUTTON.addEventListener('click', () => {
    //console.log('Donation button clicked');
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
  for (let animal of animals.data) {
    animalArray.push(animal);
  }
  return animalArray;
}

async function getAnimalImages(): Promise<AnimalImages[]> {
  const response = await fetch(animalImagesURL);
  const imageURLs = await response.json();
  for (let url of imageURLs) {
    animalImages.push(url)
  }

  return animalImages;
}

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
  clooneCards();
}

init();