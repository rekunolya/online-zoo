export class Modal {
  classes: string[];
  modalWrapper: HTMLElement;
  modal: HTMLElement;
  modalContent: HTMLElement;

  constructor(classes: string[]) {
    this.classes = classes;
    this.modalWrapper = document.createElement("div");
    this.modal = document.createElement("div");
    this.modalContent = document.createElement("div");
  }

  buildModal(content: string | HTMLElement) {
    console.log("buildModal content");
    //Modal wrapper
    this.modalWrapper = this.createDomNode(
      this.modalWrapper,
      "div",
      "modal__wrapper",
    );
    //console.log('this.modalWrapper', this.modalWrapper);

    //Modal
    this.modal = this.createDomNode(this.modal, "div", "modal");
    //console.log('this.modal', this.modal);

    //CloseBtn
    //this.modalCloseButton = this.createDomNode(this.modalCloseBtn, 'div', 'modal__button');
    //this.modalCloseButton.innerHTML = `<img src = "../christmas-shop/images/close.png">`

    //ModalContent
    this.modalContent = this.createDomNode(
      this.modalContent,
      "div",
      "modal__window",
    );

    this.setContent(content);
    this.appendModalElements();

    //bind events
    //this.bindEvents();

    //Open modal
    this.openModal();
  }

  createDomNode(node: HTMLElement, element: string, ...classes: string[]): HTMLElement {
    node = document.createElement(element);
    node.classList.add(...classes);
    return node;
  }

  setContent(content: string | HTMLElement) {
    //console.log('setContent content', content);
    if (typeof content === "string") {
      this.modalContent.innerHTML = content;
    } else {
      this.modalContent.innerHTML = "";
      this.modalContent.append(content);
    }
  }

  appendModalElements() {
    //this.modal.append(this.modalCloseButton);
    this.modal.append(this.modalContent);
    this.modalWrapper.append(this.modal);
  }

  //bindEvents() {
    //this.modalWrapper.addEventListener("click", this.closeModal);
 //}

  openModal() {
    document.body.append(this.modalWrapper);
    document.body.classList.add("scroll-hidden");
  }

  /*closeModal(event){
      let closeBtn = event.target;
      let body = document.body;
      if(closeBtn.classList.contains('modal__wrapper') || closeBtn.classList.contains('modal__button') || closeBtn.closest('.modal__button')){
        document.querySelector('.modal__wrapper').remove('modal__wrapper');
        body.classList.remove('scroll-hidden'); 
      }
    } */
}
