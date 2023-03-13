let document = window.parent.document;
let currentThemeURL = (
    window.parent.document.getElementById("themeStyle")
    ? window.parent.document.getElementById("themeStyle")
    : window.parent.document.getElementById("themeDefaultStyle")
).getAttribute("href");
currentThemeURL = currentThemeURL
  .split("/")
  .slice(0, currentThemeURL.split("/").length - 1)
  .join("/");
export { currentThemeURL as currentThemeURL };
export let snippetsURL = "/snippets";
export let appearanceURL = "/appearance";
