// Create a class for the element
class EmailInput extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();

    // Create a shadow root
    const shadow = this.attachShadow({mode: 'open'});
    const wrapper = document.createElement('div');
    wrapper.setAttribute('class', 'wrapper');
    wrapper.innerHTML = `
    <div class="email_input_container">
        <div class="email_container">
          <input type="email" class="email_input" placeholder="E-mail">
        </div>
        <div class="email_error" style="display: none;">wrong format!</div>
      </div>
`;

    
    const background_color = 
    this.hasAttribute("background-color")
    ?
    this.getAttribute("background-color")
    :
    "#ffffff";


    // Create some CSS to apply to the shadow dom
    const style = document.createElement('style');
    style.textContent = `
        input {
          border: 0;
          outline: none;
        }
        .email_input_container {
          position: relative;
          width: 100%;
        }
        .email_container {
          /* background-color: #a09e9e; */
          /* height: 50px; */
          /* border-radius: 15px; */
        }
        .email_input {
          background-color: ${background_color};
          border: 1px solid #D9D9D9;
          height: 50px;
          width: calc(100% - 30px);
          border-radius: 15px;
          padding: 0px 15px;
          font-style: normal;
          font-weight: 500;
          font-size: 15px;
          line-height: 120%;
          letter-spacing: -0.02em;
        }
        .email_error {
          position: absolute;
          color: #FF0000;
          left: 2%;
          bottom: -35%;
        }
`;
    // create some JS
    const script = document.createElement('script');
    // Example RegExp for email
    const regularExpression = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    script.textContent = `
    const email_input = document.querySelector('email-input').shadowRoot.querySelector('.email_input');
    const email_error = document.querySelector('email-input').shadowRoot.querySelector('.email_error');
    email_input.addEventListener('input', (e) => {
      e.target.value !== ''
      ?
      ${regularExpression}.test(e.target.value)
      ?
      email_error.style.display = 'none'
      :
      email_error.style.display = 'flex'
      :
      email_error.style.display = 'none';
    })
`
    shadow.appendChild(style);
    shadow.appendChild(wrapper);
    shadow.appendChild(script);
    console.log('email_input: style.isConnected: ', style.isConnected);
    console.log('email_input: script.isConnected: ', script.isConnected);
  }
}
// component definition
customElements.define('email-input', EmailInput);

// in HTML
/*
<script src="./module_example.js" defer></script>
<component-name class="styled_class"></component-name>
*/
