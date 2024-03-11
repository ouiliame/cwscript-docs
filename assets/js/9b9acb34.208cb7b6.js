"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[5497],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>f});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},c=Object.keys(e);for(r=0;r<c.length;r++)n=c[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(r=0;r<c.length;r++)n=c[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=r.createContext({}),d=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},p=function(e){var t=d(e.components);return r.createElement(s.Provider,{value:t},e.children)},m="mdxType",l={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},u=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,c=e.originalType,s=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),m=d(n),u=a,f=m["".concat(s,".").concat(u)]||m[u]||l[u]||c;return n?r.createElement(f,o(o({ref:t},p),{},{components:n})):r.createElement(f,o({ref:t},p))}));function f(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var c=n.length,o=new Array(c);o[0]=u;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i[m]="string"==typeof e?e:a,o[1]=i;for(var d=2;d<c;d++)o[d]=n[d];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}u.displayName="MDXCreateElement"},5395:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>o,default:()=>l,frontMatter:()=>c,metadata:()=>i,toc:()=>d});var r=n(7462),a=(n(7294),n(3905));const c={},o="Atomic Order",i={unversionedId:"examples/Injective/AtomicOrderExample",id:"examples/Injective/AtomicOrderExample",title:"Atomic Order",description:"",source:"@site/docs/examples/Injective/AtomicOrderExample.mdx",sourceDirName:"examples/Injective",slug:"/examples/Injective/AtomicOrderExample",permalink:"/cwscript-docs/docs/examples/Injective/AtomicOrderExample",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/examples/Injective/AtomicOrderExample.mdx",tags:[],version:"current",frontMatter:{},sidebar:"examplesSidebar",previous:{title:"CW20",permalink:"/cwscript-docs/docs/examples/CW20"},next:{title:"Factory",permalink:"/cwscript-docs/docs/examples/Terraswap/TerraswapFactory"}},s={},d=[],p={toc:d},m="wrapper";function l(e){let{components:t,...n}=e;return(0,a.kt)(m,(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"atomic-order"},"Atomic Order"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-cwscript",metastring:"showLineNumbers",showLineNumbers:!0},'import { SubaccountId, MarketId } from "injective/types"\nimport { FPDecimal } from "injective/math"\nimport { CW2 } from "standards/cw2"\n\nconst CONTRACT_NAME = "crates.io:atomic-order-example"\nconst CONTRACT_VERSION = "0.0.1"\n\ncontract AtomicOrderExample extends CW2 {\n\n  state {\n    config: struct ContractConfigState {\n      market_id: MarketId,\n      owner: Address,\n      contract_subaccount_id: SubaccountId,\n      base_denom: String,\n      quote_denom: String\n    }\n    swap_operation_state: struct SwapCacheState {\n      sender_address: String,\n      deposited_amount: Coin\n    }\n  }\n\n  #instantiate(\n    market_id: MarketId\n  ) {\n\n    let market = try {\n      query! Exchange.#market(market_id)\n    } else fail! "Market with id: {market_id} not found"\n\n    let config = ContractConfigState {\n      market_id,\n      base_denom: market.base_denom,\n      quote_denom: market.quote_denom,\n      owner: $info.sender,\n      contract_subaccount_id: SubaccountId($env.contract.address, 0),\n    }\n\n    CW2.set_contract_version!($, CONTRACT_NAME, CONTRACT_VERSION)\n\n    // we\'ve changed it to "config"\n    $state.config = config\n    emit event(method="instantiate", owner=$info.sender) // anonymous event\n  }\n\n  reply.success handle_atomic_order() {\n    let dec_scale_factor = FPDecimal(1000000000000000000)\n    let order_response = Exchange.#create_spot_market_order::parse_response!($data)\n\n    let trade_data = order_response.results ?? fail! "No trade data in order response"\n    let quantity = FPDecimal!(trade_data.quantity)\n    let price = FPDecimal!(trade_data.price)\n    let fee = FPDecimal!(trade_data.fee)\n\n    let { config, cache } = $state\n    let contract_address = $env.contract.address\n    let subaccount_id = config.contract_subaccount_id\n    let cache = $state.cache\n    let purchased_coins = coin(quantity, config.base_denom)\n    let pair = quantity * price + fee\n    let leftover = cache.deposited_amount.amount - paid\n\n\n    exec! Exchange.#withdraw(contract_address, subaccount_id, purchased_coins)\n    exec! Exchange.#withdraw(contract_address, subaccount_id, leftover_coins)\n    exec! Bank.#send(cache.sender_address, [purchased_coins, leftover_coins])\n  }\n\n  exec #swap_spot(quantity: FPDecimal, price: FPDecimal) {\n    let { config } = $state\n    let contract = $env.contract.address\n    let subaccount_id = config.contract_subaccount_id\n    let min_deposit = price quantity\n\n    if $info.funds.is_empty() {\n      fail! "No funds deposited!"\n    }\n\n    let message_deposit = FPDecimal!($info.funds[0].amount)\n\n    if message_deposit < min_deposit {\n      fail! "Deposit: {message_deposit} below min_deposit: {min_deposit}"\n    }\n\n    let order = SpotOrder(\n      price, quantity, OrderType.#BuyAtomic, config.market_id, subaccount_id, contract\n    )\n\n    let coins = $info.funds[0]\n\n    $state.swap_operation_state = SwapCacheState($info.sender, coins)\n\n    exec! Exchange.#deposit(contract, subaccount_id, coins)\n\n    @reply.success(handle_atomic_order)\n    exec! Exchange.create_spot_market_order(contract, order)\n  }\n\n}\n')))}l.isMDXComponent=!0}}]);