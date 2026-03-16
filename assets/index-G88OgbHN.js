(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const o of a)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function e(a){const o={};return a.integrity&&(o.integrity=a.integrity),a.referrerPolicy&&(o.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?o.credentials="include":a.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(a){if(a.ep)return;a.ep=!0;const o=e(a);fetch(a.href,o)}})();class b{classes;modalWrapper;modal;modalContent;constructor(t){this.classes=t,this.modalWrapper=document.createElement("div"),this.modal=document.createElement("div"),this.modalContent=document.createElement("div")}buildModal(t){this.modalWrapper=this.createDomNode(this.modalWrapper,"div","modal__wrapper"),this.modal=this.createDomNode(this.modal,"div","modal"),this.modalContent=this.createDomNode(this.modalContent,"div","modal__window"),this.setContent(t),this.appendModalElements(),this.openModal()}createDomNode(t,e,...n){return t=document.createElement(e),t.classList.add(...n),t}setContent(t){typeof t=="string"?this.modalContent.innerHTML=t:(this.modalContent.innerHTML="",this.modalContent.append(t))}appendModalElements(){this.modal.append(this.modalContent),this.modalWrapper.append(this.modal)}openModal(){document.body.append(this.modalWrapper),document.body.classList.add("scroll-hidden")}}class y extends b{constructor(t){super(t)}generateCardModule(){let t="";return t+='<div class="donation__modal">',t+=`      
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
      `,t+="</div>",t}renderModal(){let t=this.generateCardModule();super.buildModal(t),this.initSteps()}initSteps(){let t=Array.from(document.querySelectorAll(".donation__form-content")),e=document.querySelector("#next-button"),n=0,a=Array.from(document.querySelectorAll(".donation__progress-fill")),o=document.querySelector(".donation__title > p");this.selectDonationAmount(),this.setOtherAmount(),this.checkSelectedPet(),this.validateStep1(),this.validateStep2(),e.addEventListener("click",s=>{s.preventDefault(),t[n].classList.add("invisible"),n++,n>=t.length&&(n=t.length-1),t[n].classList.remove("invisible"),a[n].classList.remove("none"),a[n].classList.add("fill"),e.classList.remove("donation__next"),e.classList.add("donation__next-not-active"),o&&(o.textContent=n===0?"Donation Information:":n===1?"Billing Information:":"Payment Information:"),n===t.length-1&&(e.classList.add("invisible"),document.querySelector(".donation__complete").classList.remove("invisible"))})}selectDonationAmount(){const t=document.querySelector(".donation__amounts"),e=document.querySelector("#other-amount"),n=document.querySelector('label[for="other-amount"]');t.addEventListener("click",a=>{const o=a.target;o.classList.contains("donation__amount")&&(t.querySelectorAll(".donation__amount").forEach(s=>s.classList.remove("donation__amount__selected")),n.classList.remove("donation__amount__selected"),e.value="",e.parentElement?.classList.remove("other-amount-error"),o.classList.add("donation__amount__selected"),this.validateStep1())})}setOtherAmount(){const t=document.querySelector(".donation__amounts"),e=document.querySelector("#other-amount"),n=document.querySelector('label[for="other-amount"]');e.addEventListener("input",()=>{t.querySelectorAll(".donation__amount").forEach(o=>o.classList.remove("donation__amount__selected")),Number(e.value)<=0?(n.classList.remove("donation__amount__selected"),e.parentElement?.classList.add("other-amount-error")):(e.parentElement?.classList.remove("other-amount-error"),n.classList.add("donation__amount__selected")),this.validateStep1()}),n.addEventListener("click",()=>{t.querySelectorAll(".donation__amount").forEach(a=>a.classList.remove("donation__amount__selected")),e.value="",e.parentElement?.classList.remove("other-amount-error"),n.classList.add("donation__amount__selected"),this.validateStep1()})}checkSelectedPet(){let t=document.querySelector("#special-pet-select"),e=document.querySelector('label[for="special-pet-select"]');t.addEventListener("change",()=>{e.classList.add("donation__amount__selected"),this.validateStep1()})}validateStep1(){const t=document.querySelector("#next-button"),e=document.querySelector(".donation__amount__selected"),n=document.querySelector("#other-amount"),a=document.querySelector("#special-pet-select"),o=Number(n.value),s=!!e,r=o>0&&!isNaN(o),m=a.value!=="";(s||r)&&m?(t.classList.remove("donation__next-not-active"),t.classList.add("donation__next")):(t.classList.remove("donation__next"),t.classList.add("donation__next-not-active"))}validateStep2(){let t=document.querySelector("#donation-name"),e=document.querySelector("#donation-email"),n=document.querySelector("#next-button"),a=!1,o=!1;const s=()=>{a&&o?(n.classList.remove("donation__next-not-active"),n.classList.add("donation__next")):(n.classList.remove("donation__next"),n.classList.add("donation__next-not-active"))};t.addEventListener("input",()=>{const r=t.value.trim();a=/^[A-Za-z\s]+$/.test(r),a?t.parentElement?.classList.remove("donation-name-error"):t.parentElement?.classList.add("donation-name-error"),s()}),e.addEventListener("input",()=>{const r=e.value.trim();o=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(r),o?e.parentElement?.classList.remove("donation-email-error"):e.parentElement?.classList.add("donation-email-error"),s()}),s()}}function g(i,t,e,n,a){const o=document.createElement("a");o.classList.add("card"),o.href="./pages/animal/animal.html";const s=document.createElement("p");s.classList.add("subheader","pet__name"),s.textContent=i,o.append(s);const r=document.createElement("div");r.classList.add("pet__image"),r.innerHTML=`<img src="${t}" alt="${e}">`,o.append(r);const m=document.createElement("p");m.classList.add("subheader","pet__animal"),m.textContent=n,o.append(m);const u=document.createElement("p");u.classList.add("pet__description"),u.textContent=a,o.append(u);const p=document.createElement("div");return p.classList.add("button-transparent","pet__button"),p.innerHTML=`
    <span>VIEW LIVE CAM</span>
    <span class="button-arrow button-arrow__color"></span>`,o.append(p),o}const E=document.getElementById("pet-button-left"),S=document.getElementById("pet-button-right"),d=document.getElementById("slider__container"),x=document.getElementById("pets__container");let h=document.querySelector("#slider__container"),l=0,q=480,A=2,c=q*A;function C(){const i=Array.from(d?.children);i.slice(-4).forEach(t=>{const e=t.cloneNode(!0);e.classList.add("clone"),d?.append(e)}),i.slice(0,4).forEach(t=>{const e=t.cloneNode(!0);e.classList.add("clone"),d?.append(e)}),l=-c,d.style.transform=`translateX(${l}px)`}function L(i){i==="right"?l-=c:l+=c,d.style.transition="transform 0.4s ease",d.style.transform=`translateX(${l}px)`,d.addEventListener("transitionend",()=>{const t=d.scrollWidth,e=x.offsetWidth;l<=-(t-e-c)&&(d.style.transition="none",l=-c,console.log("position right",l),d.style.transform=`translateX(${l}px)`),l>=0&&(d.style.transition="none",l=-(t-e-c*2),console.log("position left",l),d.style.transform=`translateX(${l}px)`)},{once:!0})}S.addEventListener("click",()=>L("right"));E.addEventListener("click",()=>L("left"));const f=document.getElementById("donation-button");f&&f.addEventListener("click",()=>{new y(["donation-modal"]).renderModal()});let _=[];const w="https://vsqsnqnxkh.execute-api.eu-central-1.amazonaws.com/prod/";let v=[];const N="json/animal-images.json";async function M(){const t=await(await fetch(`${w}/pets`)).json();for(let e of t.data)_.push(e);return _}async function I(){const t=await(await fetch(N)).json();for(let e of t)v.push(e);return v}function T(){h&&_.forEach(i=>{const t=v.find(n=>n.name===i.name),e=g(i.name,t?.src||"",t?.alt||"",i.commonName,i.description);h.append(e)})}async function B(){await M(),await I(),T(),C()}B();
