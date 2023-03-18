import Pickr from "/snippets/noobcore/frontEnd/noobApi/customDialog/pickr-master/pickr-esm2022.js";

export class FormItem {
    constructor(Item, container) {
      this.container = container;
      this.element = document.createElement("label");
      this.element.setAttribute("class", "fn__flex b3-label");
      this.element.innerHTML = `
          <div class="fn__flex-1">
          ${Item.name}
          <div class="b3-label__text">${Item.label}</div>
      </div>
      <span class="fn__space"></span>
          `;
      this.inputter = new FormIpputer(Item, this);
      this.element.appendChild(this.inputter.element);
    }
  }
  export class FormIpputer {
    constructor(options, formItem) {
      this.options = options;
      this.formItem = formItem;
      this.element = this.buildElement(options);
    }
    buildElement(options) {
      let element = document.createElement("input");
  
      switch (options.type) {
        case "boolean":
          batchSetAttribute(element, {
            class: "b3-switch fn__flex-center",
            type: "checkbox",
            value: options.value,
            onchange: () => {
              options.value = element.value;
            },
          });
          break
        case "string":
          batchSetAttribute(element, {
            class: "b3-text-field fn__flex-center fn__size200",
            value: options.value||"",
            onchange: () => {
              options.value = element.value;
            },
          });
          break
        case "color":
          element = document.createElement("div")
          this.formItem.container.formElement.appendChild(this.formItem.element)
          this.formItem.element.appendChild(element)
            const pickr =new Pickr({
              container: "#pluginCustomPanel",
              el: element,
              theme: "nano",
              default: options.value||'blue',
              comparison: false,
              components: {
                preview: true,
                opacity: true,
                hue: true,
                interaction: {
                  input: true,
                },
              },
            });
            pickr.on('change', (color, source, instance) => {
              options.value = color.toRGBA().toString();
              console.log(options.value)
            })
            break
        default:
          if (options.render) {
            element = options.render(options);
          } else {
            batchSetAttribute(element, {
              class: "b3-text-field fn__flex-center fn__size200",
              value: options.value,
              onchange: () => {
                options.value = element.value;
              },
            });
          }
      }
      return element;
    }
  }
  export function batchSetAttribute(element, attributes) {
    Object.getOwnPropertyNames(attributes).forEach((name) => {
      element.setAttribute(name, attributes[name]);
    });
  }