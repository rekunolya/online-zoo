export function createFeedbackCard(city: string, month: string, year: string, text: string, name: string): HTMLElement {
  let feedbackCard: HTMLDivElement = document.createElement('div');
  feedbackCard.classList.add('what-our-users-think__card')

  const feedbackQuates: HTMLDivElement = document.createElement('div');
  feedbackQuates.classList.add('what-our-users-think__card-icon');
  feedbackCard.append(feedbackQuates);

  let subheader: HTMLParagraphElement = document.createElement('p');
  subheader.classList.add('subheader');
  subheader.innerText = `${city}, ${month} ${year}`;
  feedbackCard.append(subheader);

  let feedbackText:HTMLParagraphElement = document.createElement('p');
  feedbackText.classList.add('what-our-users-think__card__feedback');
  feedbackText.innerText = `${text}`;
  feedbackCard.append(feedbackText);

  let feedbackName: HTMLParagraphElement = document.createElement('p');
  feedbackName.classList.add('what-our-users-think__card__name');
  feedbackName.innerText = `${name}`;
  feedbackCard.append(feedbackName);

  return feedbackCard;
}
