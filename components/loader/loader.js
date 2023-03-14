// Create a class for the element
class Loader extends HTMLElement {
    constructor() {
        // Always call super first in constructor
        super();

        // Create a shadow root
        const shadow = this.attachShadow({ mode: 'open' });
        const wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'wrapper');
        wrapper.innerHTML = `
      <div class="loader">
          <div class="circle-wrap">
            <div class="circle"></div>
            <div class="circle"></div>
          </div>
        </div>
  `;
        // Create some CSS to apply to the shadow dom
        const style = document.createElement('style');
        style.textContent = `
      .loader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(0, 0, 0, 0.6);
        transition: .2s ease-in;
      }
  
      .circle {
        width: 40px;
        height: 40px;
        background: red;
        border-radius: 20px;
        animation: loader 1.2s infinite;
      }
  
      .circle:first-child {
        margin-bottom: 20px;
        background: blue;
        animation-delay: .6s;
      }
  
      @keyframes loader {
        0% {
          opacity: 0.2;
        }
  
        50% {
          opacity: 1;
        }
  
        100% {
          opacity: 0.2;
        }
      }
  `;
        // create some JS
        const script = document.createElement('script');
        script.textContent = `
      JS logic goes here
      i.e. u can use regularExpression here (s22)
  `
        shadow.appendChild(style);
        shadow.appendChild(wrapper);
        shadow.appendChild(script);
        console.log('loader: style.isConnected: ', style.isConnected);
        console.log('loader: script.isConnected: ', script.isConnected);
    }
}
// component definition
customElements.define('loader', Loader);

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
