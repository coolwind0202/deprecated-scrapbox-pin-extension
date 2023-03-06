import App from './popup.svelte';

let app = null;

document.addEventListener("DOMContentLoaded", () => {
  console.warn("loaded");
  app = new App({
    target: document.getElementById('app'),
  });
});


export default app;