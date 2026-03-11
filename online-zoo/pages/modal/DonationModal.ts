import { Modal } from "./Modal";

export class DonationModal extends Modal {
  constructor(classes: string[]) {
    super(classes);
    //this.name = name;
    //this.description = description;
    //this.category = category;
    //this.img = img;
    //this.superpowers = superpowers;
  }

  generateCardModule():string {
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
                <div class="donation__amount">$10</div>
                <div class="donation__amount">$20</div>
                <div class="donation__amount">$30</div>
                <div class="donation__amount">$50</div>
                <div class="donation__amount">$80</div>
                <div class="donation__amount">$100</div>
              </div>
            </div>
            <div class="donation__other-amount">
              <label class="donation__amount" for="other-amount">Other amount</label>
              <div class="other-amount-input-wrapper">
                <input id="other-amount" type="text" name="other-amount" />
              </div>
            </div>
            <div class="donation__for-apecial-pet">
              <label class="donation__amount" for="special-pet-select">For special pet</label>
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
              <div class="donation__personal-information email">
                <label for="donation-email"><span class="required">* </span>Your Email address</label>
                <input type="email" name="donation-email" id="donation-email" placeholder="Enter your email"/>
              </div>
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
                <label for="card-cvv"><span class="required">* </span>CVV Number</label>
                <input type="text" name="card-cvv" id="card-cvv"/>
              </div>
            </div>
            <div class="donation__card-expiration">
              <label for="card-month"><span class="required">* </span>Expiration Date</label>
              <div class="donation__card-expiration-date">
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
          </div>



          <!-- Footer -->
          <div class="donation__footer">
            <div class="donation__progress">
              <div class="donation__progress-fill fill"></div>
              <div class="donation__progress-fill none"></div>
              <div class="donation__progress-fill none"></div>
            </div>
            <button class="button donation__next-not-active" id="next-button">
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

  renderModal(): void {
    let content = this.generateCardModule();
    super.buildModal(content);
    this.initSteps();
  }

  initSteps(): void {
    let steps = Array.from(document.querySelectorAll('.donation__form-content')) as HTMLElement[];
    let nextButton = document.querySelector('#next-button') as HTMLButtonElement;
    let currentStep: number = 0;
    let progressFills = Array.from(document.querySelectorAll('.donation__progress-fill')) as HTMLElement[];
    let donationTitle = document.querySelector('.donation__title > p') as HTMLParagraphElement;
    
    this.selectDonationAmount();
    this.setOtherAmount();
    this.checkSelectedPet();
    this.validateStep1();
    this.validateStep2();

    nextButton.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('next button clicked')

      steps[currentStep].classList.add('invisible');
      currentStep++;

      if (currentStep >= steps.length) {
        currentStep = steps.length - 1;
      }

      steps[currentStep].classList.remove('invisible');
      progressFills[currentStep].classList.remove('none');
      progressFills[currentStep].classList.add('fill');
      nextButton.classList.remove('donation__next');
      nextButton.classList.add('donation__next-not-active');
      
      if (donationTitle) {
        donationTitle.textContent = 
          currentStep === 0 ? 'Donation Information:' : 
          currentStep === 1 ? 'Billing Information:' : 
          'Payment Information:';
      }

      if (currentStep === steps.length -1) {
        nextButton.classList.add('invisible');
        const completeButton = document.querySelector('.donation__complete') as HTMLButtonElement;
        completeButton.classList.remove('invisible');
      }
    });
  }

  selectDonationAmount(): void {
    const container = document.querySelector('.donation__amounts') as HTMLElement;
    const donationAmountInput = document.querySelector('#other-amount') as HTMLInputElement; 
    const donationAmountLabel = document.querySelector('label[for="other-amount"]') as HTMLFormElement;

    container.addEventListener('click', (event) => {
      const target: HTMLElement = event.target as HTMLElement;

      if (target.classList.contains('donation__amount')) {
        container.querySelectorAll('.donation__amount')
        .forEach((el) => el.classList.remove('donation__amount__selected'))

        donationAmountLabel.classList.remove('donation__amount__selected');
        donationAmountInput.value = '';
        donationAmountInput.parentElement?.classList.remove('other-amount-error');

        target.classList.add('donation__amount__selected');

        this.validateStep1();
      }
    })
  }

  setOtherAmount(): void {
    const container = document.querySelector('.donation__amounts') as HTMLElement;
    const donationAmountInput = document.querySelector('#other-amount') as HTMLInputElement; 
    const donationAmountLabel = document.querySelector('label[for="other-amount"]') as HTMLFormElement;
    
    donationAmountInput.addEventListener('input', () => { 
      container.querySelectorAll('.donation__amount')
      .forEach((el) => el.classList.remove('donation__amount__selected'));
      
      const donationValue:number = Number(donationAmountInput.value); 

      if (donationValue <= 0) {
        donationAmountLabel.classList.remove('donation__amount__selected');
        donationAmountInput.parentElement?.classList.add('other-amount-error');
      } else {
        donationAmountInput.parentElement?.classList.remove('other-amount-error');
        donationAmountLabel.classList.add('donation__amount__selected');
      }
      
      this.validateStep1();
    });

    donationAmountLabel.addEventListener('click', () => {
      container.querySelectorAll('.donation__amount')
        .forEach((el) => el.classList.remove('donation__amount__selected'));

      donationAmountInput.value = '';
      donationAmountInput.parentElement?.classList.remove('other-amount-error');
      donationAmountLabel.classList.add('donation__amount__selected');
      this.validateStep1();
    })
  }

  checkSelectedPet(): void {
    let selectedPet = document.querySelector('#special-pet-select') as HTMLFormElement;
    let selectedPetLabel = document.querySelector('label[for="special-pet-select"]') as HTMLFormElement;

    selectedPet.addEventListener('change', () => {
      selectedPetLabel.classList.add('donation__amount__selected');
      this.validateStep1();
    })
  }

  validateStep1(): void {
    console.log('validate step1');
    const nextButton = document.querySelector('#next-button') as HTMLButtonElement;
    const selectedAmount = document.querySelector('.donation__amount__selected');
    const otherInput = document.querySelector('#other-amount') as HTMLInputElement;
    const petSelected = document.querySelector('#special-pet-select') as HTMLFormElement;
    
    const otherAmount: number = Number(otherInput.value);

    const fixedAmountValid: boolean = !!selectedAmount;

    const otherAmountValid: boolean = otherAmount > 0 && !isNaN(otherAmount);

    const petValid: boolean = petSelected.value !== "";

    const amountValid: boolean = fixedAmountValid || otherAmountValid

    if(amountValid && petValid) {
      nextButton.classList.remove('donation__next-not-active');
      nextButton.classList.add('donation__next');
    } else {
      nextButton.classList.remove('donation__next');
      nextButton.classList.add('donation__next-not-active');
    }
  }

  validateStep2(): void {
    console.log('validate step2')
    let donationInputName = document.querySelector('#donation-name') as HTMLInputElement;
    let donationInputEmail = document.querySelector('#donation-email') as HTMLInputElement;
    let nextButton = document.querySelector('#next-button') as HTMLButtonElement;

    let isValidDonationName: boolean = false;
    let isValidDonationEmail: boolean = false;

    const validate = () => {
      if (isValidDonationName && isValidDonationEmail) {
        nextButton.classList.remove('donation__next-not-active')
        nextButton.classList.add('donation__next');
      } else {
        nextButton.classList.remove('donation__next');
        nextButton.classList.add('donation__next-not-active')
      }
    }


    donationInputName.addEventListener('input', () => {
      const value: string = donationInputName.value.trim();

      isValidDonationName = /^[A-Za-z\s]+$/.test(value);

      if(!isValidDonationName) {
        donationInputName.parentElement?.classList.add('donation-name-error');
      } else {
        donationInputName.parentElement?.classList.remove('donation-name-error');
      }

      validate();
    });

    donationInputEmail.addEventListener('input', () => {
      const emailValue: string = donationInputEmail.value.trim();

      isValidDonationEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);

      if (!isValidDonationEmail) {
        donationInputEmail.parentElement?.classList.add('donation-email-error');
      } else {
        donationInputEmail.parentElement?.classList.remove('donation-email-error');
      }
      
      validate();
    });

    validate();
  }
}
