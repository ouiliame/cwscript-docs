"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[2318],{3905:(e,r,t)=>{t.d(r,{Zo:()=>p,kt:()=>m});var n=t(7294);function o(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function a(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function i(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?a(Object(t),!0).forEach((function(r){o(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function l(e,r){if(null==e)return{};var t,n,o=function(e,r){if(null==e)return{};var t,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)t=a[n],r.indexOf(t)>=0||(o[t]=e[t]);return o}(e,r);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)t=a[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var s=n.createContext({}),c=function(e){var r=n.useContext(s),t=r;return e&&(t="function"==typeof e?e(r):i(i({},r),e)),t},p=function(e){var r=c(e.components);return n.createElement(s.Provider,{value:r},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var r=e.children;return n.createElement(n.Fragment,{},r)}},f=n.forwardRef((function(e,r){var t=e.components,o=e.mdxType,a=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),u=c(t),f=o,m=u["".concat(s,".").concat(f)]||u[f]||d[f]||a;return t?n.createElement(m,i(i({ref:r},p),{},{components:t})):n.createElement(m,i({ref:r},p))}));function m(e,r){var t=arguments,o=r&&r.mdxType;if("string"==typeof e||o){var a=t.length,i=new Array(a);i[0]=f;var l={};for(var s in r)hasOwnProperty.call(r,s)&&(l[s]=r[s]);l.originalType=e,l[u]="string"==typeof e?e:o,i[1]=l;for(var c=2;c<a;c++)i[c]=t[c];return n.createElement.apply(null,i)}return n.createElement.apply(null,t)}f.displayName="MDXCreateElement"},623:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>s,contentTitle:()=>i,default:()=>d,frontMatter:()=>a,metadata:()=>l,toc:()=>c});var n=t(7462),o=(t(7294),t(3905));const a={},i="Errors",l={unversionedId:"lang/errors",id:"lang/errors",title:"Errors",description:"In CWScript, errors are a special type of value used to indicate that something went wrong.",source:"@site/docs/lang/errors.mdx",sourceDirName:"lang",slug:"/lang/errors",permalink:"/cwscript-docs/docs/lang/errors",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/lang/errors.mdx",tags:[],version:"current",frontMatter:{},sidebar:"langSidebar",previous:{title:"Contracts",permalink:"/cwscript-docs/docs/lang/contracts"},next:{title:"Events",permalink:"/cwscript-docs/docs/lang/events"}},s={},c=[{value:"Defining Errors",id:"defining-errors",level:2},{value:"The <code>fail!</code> Keyword",id:"the-fail-keyword",level:2},{value:"Try / Catch / Else",id:"try--catch--else",level:2},{value:"The <code>??</code> Operator",id:"the--operator",level:3}],p={toc:c},u="wrapper";function d(e){let{components:r,...t}=e;return(0,o.kt)(u,(0,n.Z)({},p,t,{components:r,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"errors"},"Errors"),(0,o.kt)("p",null,"In CWScript, ",(0,o.kt)("strong",{parentName:"p"},"errors")," are a special type of value used to indicate that something went wrong. "),(0,o.kt)("p",null,"Unlike Rust, CWScript does not use the ",(0,o.kt)("inlineCode",{parentName:"p"},"Result")," monad to capture errors to be processed later, and instead requires you to deal with errors when they occur, or fail immediately."),(0,o.kt)("h2",{id:"defining-errors"},"Defining Errors"),(0,o.kt)("p",null,"You can define custom errors using the ",(0,o.kt)("inlineCode",{parentName:"p"},"error")," keyword."),(0,o.kt)("p",null,"Errors may contain fields, which are specified using the ",(0,o.kt)("strong",{parentName:"p"},"functional syntax")," for structs."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-cwscript"},"error SomethingWentWrong(message: String)\nerror Unauthorized(user: Address, action: String)\n")),(0,o.kt)("h2",{id:"the-fail-keyword"},"The ",(0,o.kt)("inlineCode",{parentName:"h2"},"fail!")," Keyword"),(0,o.kt)("p",null,"The ",(0,o.kt)("inlineCode",{parentName:"p"},"fail!")," keyword is used to terminate execution of the current function or message handler."),(0,o.kt)("p",null,"You can only use ",(0,o.kt)("inlineCode",{parentName:"p"},"fail!")," inside a fallible function or a contract entrypoint."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-cwscript"},'fn do_some_stuff!() {\n  fail! SomethingWentWrong("Oops!")\n}\n')),(0,o.kt)("h2",{id:"try--catch--else"},"Try / Catch / Else"),(0,o.kt)("p",null,"You can use the ",(0,o.kt)("inlineCode",{parentName:"p"},"try")," keyword to catch errors thrown by a function or message handler."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-cwscript"},"try {\n  do_some_stuff!()\n} catch e: SomethingWentWrong {\n  // Handle the error\n} else {\n  // Handles all other errors\n}\n")),(0,o.kt)("h3",{id:"the--operator"},"The ",(0,o.kt)("inlineCode",{parentName:"h3"},"??")," Operator"),(0,o.kt)("p",null,"The ",(0,o.kt)("inlineCode",{parentName:"p"},"??")," operator is a shorthand for ",(0,o.kt)("inlineCode",{parentName:"p"},"try")," / ",(0,o.kt)("inlineCode",{parentName:"p"},"else"),"."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-cwscript"},"let a = do_some_stuff!() ?? 5\n\n// Equivalent to:\nlet a = try {\n  do_some_stuff!()\n} else {\n  5\n}\n")))}d.isMDXComponent=!0}}]);