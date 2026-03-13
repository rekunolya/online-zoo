export function createAnimalCard(name: string, url: string, alt: string, commonName: string, description: string): HTMLAnchorElement {
  console.log('createAnimalCard')
  const card: HTMLAnchorElement = document.createElement('a');
  card.classList.add('card');
  card.href = './pages/animal/animal.html';

  const animalName: HTMLParagraphElement = document.createElement('p');
  animalName.classList.add('subheader', 'pet__name');
  animalName.textContent = name;

  card.append(animalName);

  const petImage: HTMLDivElement = document.createElement('div');
  petImage.classList.add('pet__image');
  petImage.innerHTML = `<img src="${url}" alt="${alt}">`;

  card.append(petImage);

  const petCommonName: HTMLParagraphElement = document.createElement('p');
  petCommonName.classList.add('subheader', 'pet__animal');
  petCommonName.textContent = commonName;

  card.append(petCommonName);

  const petDescription: HTMLParagraphElement = document.createElement('p');
  petDescription.classList.add('pet__description');
  petDescription.textContent = description; 

  card.append(petDescription);

  const viewButton: HTMLDivElement = document.createElement('div');
  viewButton.classList.add('button-transparent', 'pet__button')
  viewButton.innerHTML = `
    <span>VIEW LIVE CAM</span>
    <span class="button-arrow button-arrow__color"></span>`;

  card.append(viewButton);
  return card;
}
