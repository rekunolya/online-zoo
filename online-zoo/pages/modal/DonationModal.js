import { Modal } from "./Modal.js";

export class DonationModal extends Modal {
  constructor(classes) {
    super(classes);
    //this.name = name;
    //this.description = description;
    //this.category = category;
    //this.img = img;
    //this.superpowers = superpowers;
  }

  generateCardModule() {
    console.log('generateCardModule called');

    let template = "";
    template += `<div class="donation__modal">`;
    template += `      
      <div class="donation__header">
        <div class="donation__wrapper">
          <h3>Make your donation</h3>
        </div>
      </div>
      <div class="donation__content">
        <div class="donation__wrapper donation__title">
          <p>Donation Information:</p>
        </div>
        <div class="donation__devider"></div>

        <div class="donation__wrapper donation__form">
        <form>
          <!-- Step 1 -->
          <div class="donation__form-content">
            <div class="donation__donation-amounts">
              <p class="donation__text">
                <span class="required">* </span>Choose your donation amount:
              </p>
              <div class="donation__amounts">
                <button class="button donation__amount">$10</button>
                <button class="button donation__amount">$20</button>
                <button class="button donation__amount">$30</button>
                <button class="button donation__amount">$50</button>
                <button class="button donation__amount">$80</button>
                <button class="button donation__amount">$100</button>
              </div>
            </div>
            <div class="donation__other-amount">
              <button class="button donation__amount">Other amount</button>
              <input type="text" name="other-amount" />
            </div>
            <div class="donation__for-apecial-pet">
              <button class="button donation__amount">For special pet</button>
              <select name="special-pet" id="special-pet-select">
                <option value="" disabled selected> Choose your favourite</option>
                <option value="panda">Lukas the Panda</option>
                <option value="lemur">Andy the Lemur</option>
                <option value="gorilla">Glen the Gorilla</option>
                <option value="alligator">Mike the Alligator</option>
                <option value="eagles">Sam & Lora the eagles family</option>
                <option value="koala">Liz the Koala</option>
                <option value="lion">Shake the Lion</option>
                <option value="tiger">Senja the Tiger</option>
              </select>
            </div>
            <div class="donation__regular">
              <input
                type="checkbox"
                name="regular-donation"
                id="regular-donation"
              />
              <label for="regular-donation">Make this a monthly recurring gift</label>
            </div>
          </div>

          <!-- Step 2 -->
          <div class="donation__form-content invisible">
            <div class="donation__personal-information">
              <label for="donation-name"><span class="required">* </span>Your name</label>
              <input type="text" name="donation-name" id="donation-name" placeholder="First and last name"/>
            </div>
            <div class="donation__personal-information">
              <label for="donation-email"><span class="required">* </span>Your Email address</label>
              <input type="email" name="donation-email" id="donation-email" placeholder="Enter your email"/>
              <p>You will receive emails from the Online Zoo, including updates and news on the latest discoveries and translations. You can unsubscribe at any time.</p>
            </div>
          </div>

          <!-- Step 3 -->
          <div class="donation__form-content invisible">
            <div class="donation__card">
              <div class="donation__card-number">
                <label for="card-number"><span class="required">* </span>Credit Card Number</label>
                <input type="text" name="card-number" id="card-number"/>
              </div>
              <div class="donation__card-cvv">
                <label for="card-cvv"><span class="required">* </span>* CVV Number</label>
                <input type="text" name="card-cvv" id="card-cvv"/>
              </div>
            </div>
            <div class="donation__card-expiration">
              <label for="card-month"><span class="required">* </span>Expiration Date</label>
              <select name="card-month" id="card-month">
                <option value="" disabled selected>Month</option>
                <option value="01">01</option>
                <option value="02">02</option>
                <option value="03">03</option>
                <option value="04">04</option>
                <option value="05">05</option>
                <option value="06">06</option>
                <option value="07">07</option>
                <option value="08">08</option>
                <option value="09">09</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
              </select>
              <label for="card-year"></label>
              <select name="card-year" id="card-year">
                <option value="" disabled selected>Year</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
                <option value="2028">2028</option>
                <option value="2029">2029</option>
                <option value="2030">2030</option>
                <option value="2031">2031</option>
              </select>
            </div>
          </div>



          <!-- Footer -->
          <div class="donation__footer">
            <div class="donation__progress">
              <div class="donation__progress-fill fill"></div>
              <div class="donation__progress-fill none"></div>
              <div class="donation__progress-fill none"></div>
            </div>
            <button class="button donation__submit" id="next-button">
              <span>next</span>
              <span class="button-arrow button-arrow__light"></span>
            </button>
            <button class="button donation__complete invisible">
              Complete donation
              <span class="button-arrow button-arrow__light"></span>
            </button>
          </div>
        </form>
        </div>
      </div>
      `;

    template += `</div>`;
    return template;
  }

  renderModal() {
    console.log('renderModal called');
    let content = this.generateCardModule();
    super.buildModal(content);
    this.initSteps();
  }

  initSteps() {
  console.log('initSteps called');
  let steps = document.querySelectorAll('.donation__form-content');
  let nextButton = document.querySelector('#next-button');
  let currentStep = 0;
  let progressFills = document.querySelectorAll('.donation__progress-fill');
  let donationTitle = document.querySelector('.donation__title > p');

  nextButton.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('Next button clicked');

    steps[currentStep].classList.add('invisible');
    currentStep++;
    if (currentStep >= steps.length) { 
      currentStep = steps.length - 1; 
      return; 
    } 
    steps[currentStep].classList.remove('invisible');
    progressFills[currentStep].classList.remove('none');
    progressFills[currentStep].classList.add('fill');
    donationTitle.textContent = currentStep === 0 ? 'Donation Information:' : currentStep === 1 ? 'Billing Information:' : 'Payment Information:';
    
    if (currentStep === steps.length - 1) {
      nextButton.classList.add('invisible');
      const completeButton = document.querySelector('.donation__complete');
      completeButton.classList.remove('invisible');
    }
  });
  }
}
