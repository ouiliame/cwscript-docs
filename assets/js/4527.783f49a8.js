(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[4527],{5448:(e,t,n)=>{"use strict";n.d(t,{F:()=>i});var r=n(7294),o=n(902);const s={attributes:!0,characterData:!0,childList:!0,subtree:!0};function a(e,t){const[n,a]=(0,r.useState)(),i=(0,r.useCallback)((()=>{a(e.current?.closest("[role=tabpanel][hidden]"))}),[e,a]);(0,r.useEffect)((()=>{i()}),[i]),function(e,t,n){void 0===n&&(n=s);const a=(0,o.zX)(t),i=(0,o.Ql)(n);(0,r.useEffect)((()=>{const t=new MutationObserver(a);return e&&t.observe(e,i),()=>t.disconnect()}),[e,a,i])}(n,(e=>{e.forEach((e=>{"attributes"===e.type&&"hidden"===e.attributeName&&(t(),i())}))}),{attributes:!0,characterData:!1,childList:!1,subtree:!1})}function i(){const[e,t]=(0,r.useState)(!1),[n,o]=(0,r.useState)(!1),s=(0,r.useRef)(null),i=(0,r.useCallback)((()=>{const n=s.current.querySelector("code");e?n.removeAttribute("style"):(n.style.whiteSpace="pre-wrap",n.style.overflowWrap="anywhere"),t((e=>!e))}),[s,e]),c=(0,r.useCallback)((()=>{const{scrollWidth:e,clientWidth:t}=s.current,n=e>t||s.current.querySelector("code").hasAttribute("style");o(n)}),[s]);return a(s,c),(0,r.useEffect)((()=>{c()}),[e,c]),(0,r.useEffect)((()=>(window.addEventListener("resize",c,{passive:!0}),()=>{window.removeEventListener("resize",c)})),[c]),{codeBlockRef:s,isEnabled:e,isCodeScrollable:n,toggle:i}}},6412:(e,t,n)=>{"use strict";n.d(t,{p:()=>s});var r=n(2949),o=n(6668);function s(){const{prism:e}=(0,o.L)(),{colorMode:t}=(0,r.I)(),n=e.theme,s=e.darkTheme||n;return"dark"===t?s:n}},7016:(e,t,n)=>{"use strict";n.d(t,{QC:()=>i,Vo:()=>a,bc:()=>o,nt:()=>s});n(7594);const r=/title=(?<quote>["'])(?<title>.*?)\1/;function o(e){return e?.match(r)?.groups.title??""}function s(e){return Boolean(e?.includes("showLineNumbers"))}function a(e){const t=e.split(" ").find((e=>e.startsWith("language-")));return t?.replace(/language-/,"")}function i(e){const t={color:"--prism-color",backgroundColor:"--prism-background-color"},n={};return Object.entries(e.plain).forEach((e=>{let[r,o]=e;const s=t[r];s&&"string"==typeof o&&(n[s]=o)})),n}},7594:(e,t)=>{function n(e){let t,n=[];for(let r of e.split(",").map((e=>e.trim())))if(/^-?\d+$/.test(r))n.push(parseInt(r,10));else if(t=r.match(/^(-?\d+)(-|\.\.\.?|\u2025|\u2026|\u22EF)(-?\d+)$/)){let[e,r,o,s]=t;if(r&&s){r=parseInt(r),s=parseInt(s);const e=r<s?1:-1;"-"!==o&&".."!==o&&"\u2025"!==o||(s+=e);for(let t=r;t!==s;t+=e)n.push(t)}}return n}t.default=n,e.exports=n},3746:(e,t,n)=>{"use strict";n.d(t,{ZP:()=>f,lG:()=>a});var r=n(7410);const o={plain:{backgroundColor:"#2a2734",color:"#9a86fd"},styles:[{types:["comment","prolog","doctype","cdata","punctuation"],style:{color:"#6c6783"}},{types:["namespace"],style:{opacity:.7}},{types:["tag","operator","number"],style:{color:"#e09142"}},{types:["property","function"],style:{color:"#9a86fd"}},{types:["tag-id","selector","atrule-id"],style:{color:"#eeebff"}},{types:["attr-name"],style:{color:"#c4b9fe"}},{types:["boolean","string","entity","url","attr-value","keyword","control","directive","unit","statement","regex","atrule","placeholder","variable"],style:{color:"#ffcc99"}},{types:["deleted"],style:{textDecorationLine:"line-through"}},{types:["inserted"],style:{textDecorationLine:"underline"}},{types:["italic"],style:{fontStyle:"italic"}},{types:["important","bold"],style:{fontWeight:"bold"}},{types:["important"],style:{color:"#c4b9fe"}}]};var s=n(7294),a={Prism:r.Z,theme:o};function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function c(){return c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},c.apply(this,arguments)}var l=/\r\n|\r|\n/,u=function(e){0===e.length?e.push({types:["plain"],content:"\n",empty:!0}):1===e.length&&""===e[0].content&&(e[0].content="\n",e[0].empty=!0)},p=function(e,t){var n=e.length;return n>0&&e[n-1]===t?e:e.concat(t)};function y(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&-1===t.indexOf(r)&&(n[r]=e[r]);return n}var d=function(e){function t(){for(var t=this,n=[],r=arguments.length;r--;)n[r]=arguments[r];e.apply(this,n),i(this,"getThemeDict",(function(e){if(void 0!==t.themeDict&&e.theme===t.prevTheme&&e.language===t.prevLanguage)return t.themeDict;t.prevTheme=e.theme,t.prevLanguage=e.language;var n=e.theme?function(e,t){var n=e.plain,r=Object.create(null),o=e.styles.reduce((function(e,n){var r=n.languages,o=n.style;return r&&!r.includes(t)||n.types.forEach((function(t){var n=c({},e[t],o);e[t]=n})),e}),r);return o.root=n,o.plain=c({},n,{backgroundColor:null}),o}(e.theme,e.language):void 0;return t.themeDict=n})),i(this,"getLineProps",(function(e){var n=e.key,r=e.className,o=e.style,s=c({},y(e,["key","className","style","line"]),{className:"token-line",style:void 0,key:void 0}),a=t.getThemeDict(t.props);return void 0!==a&&(s.style=a.plain),void 0!==o&&(s.style=void 0!==s.style?c({},s.style,o):o),void 0!==n&&(s.key=n),r&&(s.className+=" "+r),s})),i(this,"getStyleForToken",(function(e){var n=e.types,r=e.empty,o=n.length,s=t.getThemeDict(t.props);if(void 0!==s){if(1===o&&"plain"===n[0])return r?{display:"inline-block"}:void 0;if(1===o&&!r)return s[n[0]];var a=r?{display:"inline-block"}:{},i=n.map((function(e){return s[e]}));return Object.assign.apply(Object,[a].concat(i))}})),i(this,"getTokenProps",(function(e){var n=e.key,r=e.className,o=e.style,s=e.token,a=c({},y(e,["key","className","style","token"]),{className:"token "+s.types.join(" "),children:s.content,style:t.getStyleForToken(s),key:void 0});return void 0!==o&&(a.style=void 0!==a.style?c({},a.style,o):o),void 0!==n&&(a.key=n),r&&(a.className+=" "+r),a})),i(this,"tokenize",(function(e,t,n,r){var o={code:t,grammar:n,language:r,tokens:[]};e.hooks.run("before-tokenize",o);var s=o.tokens=e.tokenize(o.code,o.grammar,o.language);return e.hooks.run("after-tokenize",o),s}))}return e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t,t.prototype.render=function(){var e=this.props,t=e.Prism,n=e.language,r=e.code,o=e.children,s=this.getThemeDict(this.props),a=t.languages[n];return o({tokens:function(e){for(var t=[[]],n=[e],r=[0],o=[e.length],s=0,a=0,i=[],c=[i];a>-1;){for(;(s=r[a]++)<o[a];){var y=void 0,d=t[a],f=n[a][s];if("string"==typeof f?(d=a>0?d:["plain"],y=f):(d=p(d,f.type),f.alias&&(d=p(d,f.alias)),y=f.content),"string"==typeof y){var h=y.split(l),g=h.length;i.push({types:d,content:h[0]});for(var m=1;m<g;m++)u(i),c.push(i=[]),i.push({types:d,content:h[m]})}else a++,t.push(d),n.push(y),r.push(0),o.push(y.length)}a--,t.pop(),n.pop(),r.pop(),o.pop()}return u(i),c}(void 0!==a?this.tokenize(t,r,a,n):[r]),className:"prism-code language-"+n,style:void 0!==s?s.root:{},getLineProps:this.getLineProps,getTokenProps:this.getTokenProps})},t}(s.Component);const f=d},195:(e,t,n)=>{"use strict";function r(e,t){let{target:n=document.body}=void 0===t?{}:t;if("string"!=typeof e)throw new TypeError(`Expected parameter \`text\` to be a \`string\`, got \`${typeof e}\`.`);const r=document.createElement("textarea"),o=document.activeElement;r.value=e,r.setAttribute("readonly",""),r.style.contain="strict",r.style.position="absolute",r.style.left="-9999px",r.style.fontSize="12pt";const s=document.getSelection(),a=s.rangeCount>0&&s.getRangeAt(0);n.append(r),r.select(),r.selectionStart=0,r.selectionEnd=e.length;let i=!1;try{i=document.execCommand("copy")}catch{}return r.remove(),a&&(s.removeAllRanges(),s.addRange(a)),o&&o.focus(),i}n.d(t,{Z:()=>r})}}]);