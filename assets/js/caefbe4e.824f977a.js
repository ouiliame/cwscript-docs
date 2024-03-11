"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[7296],{3905:(e,t,n)=>{n.d(t,{Zo:()=>m,kt:()=>f});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},s=Object.keys(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=r.createContext({}),l=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},m=function(e){var t=l(e.components);return r.createElement(c.Provider,{value:t},e.children)},p="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,s=e.originalType,c=e.parentName,m=i(e,["components","mdxType","originalType","parentName"]),p=l(n),d=a,f=p["".concat(c,".").concat(d)]||p[d]||u[d]||s;return n?r.createElement(f,o(o({ref:t},m),{},{components:n})):r.createElement(f,o({ref:t},m))}));function f(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var s=n.length,o=new Array(s);o[0]=d;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i[p]="string"==typeof e?e:a,o[1]=i;for(var l=2;l<s;l++)o[l]=n[l];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},3473:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>o,default:()=>u,frontMatter:()=>s,metadata:()=>i,toc:()=>l});var r=n(7462),a=(n(7294),n(3905));const s={},o="Interfaces",i={unversionedId:"lang/interfaces",id:"lang/interfaces",title:"Interfaces",description:"An interface is a set of required entrypoint messages that a contract must implement.",source:"@site/docs/lang/interfaces.mdx",sourceDirName:"lang",slug:"/lang/interfaces",permalink:"/cwscript-docs/docs/lang/interfaces",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/lang/interfaces.mdx",tags:[],version:"current",frontMatter:{},sidebar:"langSidebar",previous:{title:"Instantiate",permalink:"/cwscript-docs/docs/lang/instantiate"},next:{title:"Module Contracts",permalink:"/cwscript-docs/docs/lang/module-contracts.mdx"}},c={},l=[],m={toc:l},p="wrapper";function u(e){let{components:t,...n}=e;return(0,a.kt)(p,(0,r.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"interfaces"},"Interfaces"),(0,a.kt)("p",null,"An ",(0,a.kt)("strong",{parentName:"p"},"interface")," is a set of required entrypoint messages that a contract must implement."),(0,a.kt)("p",null,"Interfaces allows contracts to be used in any context that expects a contract with a specific set of entrypoints. For instance, a dApp designed to work with different types of token contracts can require tokens to implement the CW20 interface in order to be considered compatible."),(0,a.kt)("p",null,"Contracts can implement multiple interfaces, as long as they implement all required entrypoints for each interface. However, if two interfaces have conflicting signatures for the same entrypoint name, then a contract cannot implement both interfaces."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-cwscript"},'interface CW20 {\n  // Interfaces may define custom types, but the implementing contract is not\n  // obligated to use them.\n  struct Coin {\n    address: String,\n    amount: U128\n  }\n\n  event Transfer(from: Address, to: Address, amount: Int)\n  event Burn(from: Address, amount: Int)\n  event Mint(to: Address, amount: Int)\n  event Send(from: Address, to: Address, amount: Int)\n  event IncreaseAllowance(owner: Address, spender: Address, amount: Int)\n  event DecreaseAllowance(owner: Address, spender: Address, amount: Int)\n  event TransferFrom(from: Address, to: Address, by: Address, amount: Int)\n  event BurnFrom(from: Address, by: Address, amount: Int)\n  event Log(from: Address, to: Address, by: Address, amount: Int)\n\n  // Interfaces may not define any state items, as this would conflict with\n  // the contract\'s own state items.\n\n  // Typically, interfaces will not define any #instantiate entrypoints, as\n  // this often conflicts with the contract\'s own instantiate entrypoint.\n  // However, there are cases where it makes sense to define an #instantiate\n  // structure for an interface, such as when the implementing contract is\n  // expected to be instantiated by a factory contract that expects a specific\n  // structure.\n\n  // Required "exec" entrypoints -- the implementing contract must have all of\n  // these entrypoints, with the exact same signatures matching in message name,\n  // and each parameter\'s order, name, and type.\n  exec #burn(amount: Int)\n  exec #mint(recipient: String)\n  exec #send(contract: String, amount: Int, msg: Binary)\n  exec #increase_allowance(spender: String, amount: Int, expires?: Expiration)\n  exec #decrease_allowance(spender: String, amount: Int, expires?: Expiration)\n  exec #transfer_from(owner: String, recipient: String, amount: Int)\n  exec #burn_from(owner: String, amount: Int)\n  exec #send_from(owner: String, contract: String, amount: Int, msg: Binary)\n\n  // Required "query" entrypoints -- same rules as "exec" entrypoints.\n  query #balance(address: String) -> struct {\n    balance: Int\n  }\n\n  query #token_info() -> struct TokenInfo {\n    name: String,\n    symbol: String,\n    decimals: U8,\n    total_supply: Int,\n  }\n\n  query #minter() -> MinterResponse?\n\n}\n')))}u.isMDXComponent=!0}}]);