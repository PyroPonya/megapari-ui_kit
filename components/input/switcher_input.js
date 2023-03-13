// Create a class for the element
class SwitcherInput extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();

    // Create a shadow root
    const shadow = this.attachShadow({mode: 'open'});
    const wrapper = document.createElement('div');
    wrapper.setAttribute('class', 'wrapper');

    const data_start = this.getAttribute('data-start');
    const data_end = this.getAttribute('data-end');

    wrapper.innerHTML = `
    <div class="switcher" data-value="false">
        <label class="switch btn-color-mode-switch">
          <input type="checkbox" name="color_mode" id="color_mode" value="1">
          <label for="color_mode" data-on="${data_end}" data-off="${data_start}" class="btn-color-mode-switch-inner"></label>
        </label>
      </div>
`;

    

    // Create some CSS to apply to the shadow dom
    const style = document.createElement('style');
    style.textContent = `
        .switcher {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-start;
          margin-bottom: 20px;
        }

        .switcher label {
          color: #424242;
          font-style: normal;
          font-weight: 500;
          font-size: 14px;
          line-height: 120%;
          letter-spacing: -0.02em;
          margin: 0;
        }

        .switch {
          width: 100%;
        } 

        .btn-color-mode-switch > label.btn-color-mode-switch-inner{
            margin: 0px;
            /* width: 260px; */
            height: 50px;
            background: #E0E0E0;
            border-radius: 10px;
            overflow: hidden;
            position: relative;
            transition: all 0.3s ease;
            box-shadow: 0px 0px 8px 0px rgba(17, 17, 17, 0.34) inset;
            display: block;
        }

        .btn-color-mode-switch > label.btn-color-mode-switch-inner:before{
          content: attr(data-on);
          position: absolute;
          font-style: normal;
          font-weight: 500;
          font-size: 14px;
          line-height: 120%;
          letter-spacing: -0.02em;
        /*   top: 7px; */
          top: 35%;
          right: 20px;
        }

        .btn-color-mode-switch > label.btn-color-mode-switch-inner:after{
            content: attr(data-off);
            width: 120px;
            height: 36px;
            background: #E6352B;
            border-radius: 10px;
            position: absolute;
            left: 2px;
            top: 2px;
            text-align: center;
            transition: all 0.3s ease;
            box-shadow: 0px 0px 6px -2px #111;
            padding: 5px 0px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .btn-color-mode-switch > .alert{
            display: none;
            background: #FF9800;
            border: none;
            color: #fff;
        }

        .btn-color-mode-switch input[type="checkbox"]{
            cursor: pointer;
            width: 50px;
            height: 25px;
            opacity: 0;
            position: absolute;
            top: 0;
            z-index: 1;
            margin: 0px;
        }

        .btn-color-mode-switch input[type="checkbox"]:checked + label.btn-color-mode-switch-inner{
            /* background: #ffffff; */
            /* color: #fff; */
        }

        .btn-color-mode-switch input[type="checkbox"]:checked + label.btn-color-mode-switch-inner:after {
            content: attr(data-on);
            left: calc(100% - 120px - 2px);
            background: #1B9DD9;
        }

        .btn-color-mode-switch input[type="checkbox"]:checked + label.btn-color-mode-switch-inner:before{
            content: attr(data-off);
            right: auto;
            left: 20px;
        }

        .btn-color-mode-switch input[type="checkbox"]:checked + label.btn-color-mode-switch-inner{
            /*background: #66BB6A; */
            /*color: #fff;*/
        }

        .btn-color-mode-switch input[type="checkbox"]:checked ~ .alert{
            display: block;
        }

        /*mode preview*/
        .dark-preview{
            background: #0d0d0d;
        }

        .dark-preview div.btn-container i.fa-sun-o{
            color: #777;
        }

        .dark-preview div.btn-container i.fa-moon-o{
            color: #fff;
            text-shadow: 0px 0px 11px #fff;
        }

        .white-preview{
            background: #fff;
        }

        .white-preview div.btn-container i.fa-sun-o{
            color: #ffa500;
            text-shadow: 0px 0px 16px #ffa500;
        }

        .white-preview div.btn-container i.fa-moon-o{
            color: #777;
        }

        p.by {
            
        }

        p.by a{
            text-decoration: none;
            color: #000;
        }

        .dark-preview p.by a{
            color: #777;
        }

        .white-preview p.by a{
            color: #000;
        }
`;
    // create some JS
    const script = document.createElement('script');
    // Example RegExp for email
    script.textContent = `
        const switcher_body = document.querySelector('switcher-input');

        const el = document.querySelector('switcher-input').shadowRoot.querySelector('.switcher');
        el.addEventListener('change', (e) => {
          el.setAttribute('data-value', document.querySelector('switcher-input').shadowRoot.querySelector('.btn-color-mode-switch input[type="checkbox"]').checked);

          const input_switch = new CustomEvent("input_switch", { detail: document.querySelector('switcher-input').shadowRoot.querySelector('.btn-color-mode-switch input[type="checkbox"]').checked });

          switcher_body.dispatchEvent(input_switch);
        });

        switcher_body.addEventListener('input_switch', (e) => {
          let switcher_input = document.querySelector('switcher-input') ? document.querySelector('switcher-input') : '';
          switcher_input.setAttribute('data-value', e.detail);
        })
`
    shadow.appendChild(style);
    shadow.appendChild(wrapper);
    shadow.appendChild(script);
    console.log('switcher_input: style.isConnected: ', style.isConnected);
    console.log('switcher_input: script.isConnected: ', script.isConnected);
  }
}
// component definition
customElements.define('switcher-input', SwitcherInput);

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
