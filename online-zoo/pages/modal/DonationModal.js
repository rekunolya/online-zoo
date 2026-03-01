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
    
    template += `<div class="donation-modal">`;
    template += `<h3 class="donation-modal__header">Make your donation</h3>`;
    template += `<p class="donation-modal__title">Donation Information:</p>`;
    template += `<div class="donation-modal__devider"></div>`
    template += `<div>
      <div>
        <p class="donation-modal__text"><span class=required>* </span>Choose your donation amount:</p>
        <div class="donation-modal__amounts">
          <button class="donation-modal__amount">$10</button>
          <button class="donation-modal__amount">$20</button>
          <button class="donation-modal__amount">$30</button>
          <button class="donation-modal__amount">$50</button> 
          <button class="donation-modal__amount">$80</button>
          <button class="donation-modal__amount">$100</button>
        </div>
        
      </div>
     </div>`

    template += `</div>`;
    return template;
  }

  renderModal() {
    console.log('renderModal called');
    let content = this.generateCardModule();
    super.buildModal(content);
  }
}
