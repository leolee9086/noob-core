export { Plugin as Plugin } from "./plugin.js";
export { api as frontEndApi } from "./api.js";
export { api as noobApi } from "./api.js";

export { kernelApi as kernelApi } from "./api.js";
export {FormItem as FormItem} from './siyuanUI/form.js'
export function batchSetAttribute(element, attributes) {
  Object.getOwnPropertyNames(attributes).forEach((name) => {
    element.setAttribute(name, attributes[name]);
  });
}
export {DOM监听器  as DOMwatcher} from './util/DOMwatcher'
export {DOM监听器} from './util/DOMwatcher'
