// Create a class for the element
class ExampleComponent extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();

    // Create a shadow root
    const shadow = this.attachShadow({mode: 'open'});
    const wrapper = document.createElement('div');
    wrapper.setAttribute('class', 'wrapper');
    wrapper.innerHTML = `
    html content goes here
`;
    // Create some CSS to apply to the shadow dom
    const style = document.createElement('style');
    style.textContent = `
    styles goes here
`;
    // create some JS
    const script = document.createElement('script');
    // Example RegExp for email
    // const regularExpression = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+")){3,}@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]{2,})+.+[a-zA-Z]{1,}))$/;
    script.textContent = `
    JS logic goes here
    i.e. u can use regularExpression here (s22)
`
    shadow.appendChild(style);
    shadow.appendChild(wrapper);
    shadow.appendChild(script);
    console.log('style.isConnected: ', style.isConnected);
    console.log('script.isConnected: ', script.isConnected);
  }
}
// component definition
customElements.define('component-name', ExampleComponent);

// in HTML
/*
<script src="./module_example.js" defer></script>
<component-name class="styled_class"></component-name>
*/
