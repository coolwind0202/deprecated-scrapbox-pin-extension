(function(){"use strict";const r=t=>t!=null,l=t=>r(t)?(t.type==="pin"||t.type==="unpin")&&typeof t.target=="string":!1,o={PIN_AT_HOME_TEXT:"Pin at home",UNPIN_FROM_HOME_TEXT:"Unpin from home",PAGE_EDIT_MENU_ID:"page-edit-menu"},u=()=>{const t=document.querySelectorAll("li.pin");console.log(t);const e=n=>n!==void 0;return[...t.values()].map(a).filter(e)},a=t=>t.dataset.pageTitle,s={GetPageNameList:"get-page-name-list",RunAction:"run-action"},g=t=>"type"in t,E=t=>t!=null,_=t=>"action"in t,T=t=>E(t.content),N=t=>t.type===s.GetPageNameList,p=t=>t.type!==s.RunAction||!_(t.content)?!1:l(t.content.action),m=t=>new Promise(n=>{setTimeout(()=>{n(null)},t)}),f=async t=>{window.location.href=t.target,console.log("待機開始"),await m(5e3),console.log("待機");const e=document.getElementById(o.PAGE_EDIT_MENU_ID);if(console.log(e),e===null)return;e.click();const n=document.querySelectorAll(`#${o.PAGE_EDIT_MENU_ID} + ul > li > a`),A=i=>[o.PIN_AT_HOME_TEXT,o.UNPIN_FROM_HOME_TEXT].includes(i),c=[...n.values()].find(i=>A(i.textContent||""));c!==void 0&&c.click()};chrome.runtime.onMessage.addListener((t,e,n)=>{if(console.log(t),!g(t))return!0;if(N(t))return n(u()),!0;if(console.log("not get-page-name-list"),T(t)&&(console.log("with-content"),console.log(t.content),p(t)))return console.log("run-action"),f(t.content.action).then(()=>{n("OK")}),!0})})();