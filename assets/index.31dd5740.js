import{r as e,o as t,c as o,a as n,b as r,d as s}from"./vendor.79e35d63.js";const i={};let d;i.render=function(n,r){const s=e("router-view");return t(),o(s)};const a={},c=function(e,t){if(!t||0===t.length)return e();if(void 0===d){const e=document.createElement("link").relList;d=e&&e.supports&&e.supports("modulepreload")?"modulepreload":"preload"}return Promise.all(t.map((e=>{if((e=`/vite-stock/${e}`)in a)return;a[e]=!0;const t=e.endsWith(".css"),o=t?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${e}"]${o}`))return;const n=document.createElement("link");return n.rel=t?"stylesheet":d,t||(n.as="script",n.crossOrigin=""),n.href=e,document.head.appendChild(n),t?new Promise(((e,t)=>{n.addEventListener("load",e),n.addEventListener("error",t)})):void 0}))).then((()=>e()))};var m=n({history:r("/vite-stock/"),routes:[{path:"/",name:"Home",component:()=>c((()=>import("./Home.a32d0165.js")),["assets/Home.a32d0165.js","assets/Home.b78ee162.css","assets/vendor.79e35d63.js"])},{path:"/stockInfo",name:"StockInfo",component:()=>c((()=>import("./StockInfo.2c6f29a0.js")),["assets/StockInfo.2c6f29a0.js","assets/StockInfo.1f473e1b.css","assets/vendor.79e35d63.js","assets/axios.0c23cb9a.js"])},{path:"/stockDividend",name:"StockDividend",component:()=>c((()=>import("./StockDividend.ab1bbd10.js")),["assets/StockDividend.ab1bbd10.js","assets/axios.0c23cb9a.js","assets/vendor.79e35d63.js"])}]});s(i).use(m).mount("#app");
