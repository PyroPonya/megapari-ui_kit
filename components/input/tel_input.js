// Create a class for the element
class TelInput extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();

    // Create a shadow root
    const shadow = this.attachShadow({mode: 'open'});
    const wrapper = document.createElement('div');
    wrapper.setAttribute('class', 'wrapper');
    wrapper.innerHTML = `
        <input class="tel" value="" type="tel" />
`;
    // Create some CSS to apply to the shadow dom
    const style = document.createElement('style');
    style.textContent = `
        input.tel {
          width: 100%;
          height: 50px;
          border-radius: 8px;
          border: 1px solid #D9D9D9;
          text-align: center;
          font-size: 24px;
          background-color: #ffffff;
        }
        input.tel:focus, input.tel:focus, input.tel:active{
            outline: none;
        }
`;

    const country_code = this.getAttribute('country-code');
    const operator_code = parseInt(this.getAttribute('operator-length'));
    const phone_length = parseInt(this.getAttribute('phone-length'));

    const script = document.createElement('script');
    script.textContent = `
    const input = document.querySelector('tel-input').shadowRoot.querySelector(".tel");

        input.addEventListener("input", (e) => {
          const value = input.value.replace(${/\D+/g}, "");
          const numberLength = ${phone_length};

          let result = ${country_code};

          for (let i = ${country_code.length}; i < value.length && i < numberLength; i++) {
            switch (i) {
              case 0:
                result = ${country_code};
                console.log(result);
                continue;
              case ${country_code.length}:
                result += " (";
                break;
              case ${country_code.length + operator_code}:
                result += ") ";
                break;
              case ${country_code.length + operator_code + 3}:
                result += "-";
                break;
              case ${country_code.length + operator_code + 6}:
                result += "-";
                break;
              case ${country_code.length + operator_code + 9}:
                result += "-";
                break;
              case ${country_code.length + operator_code + 12}:
                result += "-";
                break;
              default:
                break;
            }
            result += value[i];
          }
          input.value = result;
        });
`
    shadow.appendChild(style);
    shadow.appendChild(wrapper);
    shadow.appendChild(script);
    console.log('style.isConnected: ', style.isConnected);
    console.log('script.isConnected: ', script.isConnected);
  }
}
// component definition
customElements.define('tel-input', TelInput);

// in HTML
/*
<script src="./module_example.js" defer></script>
<component-name class="styled_class"></component-name>

props:
<custom-component img='some url'></custom-component>

img.src = this.hasAttribute("img")
  ? this.getAttribute("img")
  : "img/default.png";
*/
