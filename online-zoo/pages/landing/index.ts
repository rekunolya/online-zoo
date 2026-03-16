import { AnimalImages } from '../interface/animal-images';
import { Animal } from '../interface/animal';
import { DonationModal } from '../modal/DonationModal';
import { createAnimalCard } from './cadr';
import { Feedback } from 'pages/interface/feedback';
import { createFeedbackCard } from './feedback';

//Slider
const PET_BUTTON_LEFT = document.getElementById('pet-button-left') as HTMLButtonElement; 
const PET_BUTTON_RIGHT = document.getElementById('pet-button-right') as HTMLButtonElement;
const track = document.getElementById('slider__container') as HTMLElement;
const viewport = document.getElementById('pets__container') as HTMLElement;
let sliderContainer = document.querySelector('#slider__container') as HTMLElement;
let feedbackContainer = document.querySelector('.what-our-users-think__cards-container') as HTMLElement;

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
const animalImagesURL:string = 'json/animal-images.json';

async function getAnimal(): Promise<Animal[]> {
  try {
    const response = await fetch(`${URL}/pets`);

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const animals = await response.json();
    for (let animal of animals.data) {
      animalArray.push(animal);
    }

    return animalArray;

  } catch(error) {
    showError ();
    throw error;
  }
}

function showLoader() {
  const loader = `<div class="loader">Loading...</div>`
  if (!sliderContainer) return;
  sliderContainer.innerHTML = loader;

  if(!feedbackContainer) return;
  feedbackContainer.innerHTML = loader;
}

function showError() {
  const errorMessage = `<div class="error-message">
      Something went wrong. Please, refresh the page
    </div>`

  if (!sliderContainer) return;
  sliderContainer.innerHTML = errorMessage;

   if (!feedbackContainer) return;
  feedbackContainer.innerHTML = errorMessage;
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

//Feedbacks
let feedbackArr: Feedback[] =[];
const FEEDBACK_URL = 'https://vsqsnqnxkh.execute-api.eu-central-1.amazonaws.com/prod/feedback';

async function getFeedbacks() {
  try {
    const response = await fetch(FEEDBACK_URL);

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const feedbacks = await response.json();
    for (let feedback of feedbacks.data) {
      feedbackArr.push(feedback);
    }

    return feedbackArr;
  } catch(error) {
    showError();
    throw error;
  }

}

function setFeedbackCards() {
  if (!feedbackContainer) return;
  feedbackContainer.innerHTML = "";

  feedbackArr.forEach((feedback) => {
    const feedbackCard = createFeedbackCard(
      feedback.city,
      feedback.month,
      feedback.year,
      feedback.text,
      feedback.name
    );
    feedbackContainer.append(feedbackCard);
  })
}

async function init() {
  showLoader();

  try {
    await getAnimal();   // wait for loading animal
    await getAnimalImages(); // wait for loading images
    await getFeedbacks();
    setAnimalCards();
    setFeedbackCards();   
    clooneCards();
  } catch(err) {
    console.log(err);
  }

}

init();
