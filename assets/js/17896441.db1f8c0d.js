"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[7918],{1310:(e,t,n)=>{n.d(t,{Z:()=>E});var a=n(7462),l=n(7294),o=n(6010),c=n(5281),s=n(2802),r=n(8596),i=n(9960),d=n(5999),m=n(4996);function u(e){return l.createElement("svg",(0,a.Z)({viewBox:"0 0 24 24"},e),l.createElement("path",{d:"M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z",fill:"currentColor"}))}const p={breadcrumbHomeIcon:"breadcrumbHomeIcon_YNFT"};function b(){const e=(0,m.Z)("/");return l.createElement("li",{className:"breadcrumbs__item"},l.createElement(i.Z,{"aria-label":(0,d.I)({id:"theme.docs.breadcrumbs.home",message:"Home page",description:"The ARIA label for the home page in the breadcrumbs"}),className:"breadcrumbs__link",href:e},l.createElement(u,{className:p.breadcrumbHomeIcon})))}const g={breadcrumbsContainer:"breadcrumbsContainer_Z_bl"};function h(e){let{children:t,href:n,isLast:a}=e;const o="breadcrumbs__link";return a?l.createElement("span",{className:o,itemProp:"name"},t):n?l.createElement(i.Z,{className:o,href:n,itemProp:"item"},l.createElement("span",{itemProp:"name"},t)):l.createElement("span",{className:o},t)}function v(e){let{children:t,active:n,index:c,addMicrodata:s}=e;return l.createElement("li",(0,a.Z)({},s&&{itemScope:!0,itemProp:"itemListElement",itemType:"https://schema.org/ListItem"},{className:(0,o.Z)("breadcrumbs__item",{"breadcrumbs__item--active":n})}),t,l.createElement("meta",{itemProp:"position",content:String(c+1)}))}function E(){const e=(0,s.s1)(),t=(0,r.Ns)();return e?l.createElement("nav",{className:(0,o.Z)(c.k.docs.docBreadcrumbs,g.breadcrumbsContainer),"aria-label":(0,d.I)({id:"theme.docs.breadcrumbs.navAriaLabel",message:"Breadcrumbs",description:"The ARIA label for the breadcrumbs"})},l.createElement("ul",{className:"breadcrumbs",itemScope:!0,itemType:"https://schema.org/BreadcrumbList"},t&&l.createElement(b,null),e.map(((t,n)=>{const a=n===e.length-1;return l.createElement(v,{key:n,active:a,index:n,addMicrodata:!!t.href},l.createElement(h,{href:t.href,isLast:a},t.label))})))):null}},5154:(e,t,n)=>{n.r(t),n.d(t,{default:()=>W});var a=n(7294),l=n(833),o=n(902);const c=a.createContext(null);function s(e){let{children:t,content:n}=e;const l=function(e){return(0,a.useMemo)((()=>({metadata:e.metadata,frontMatter:e.frontMatter,assets:e.assets,contentTitle:e.contentTitle,toc:e.toc})),[e])}(n);return a.createElement(c.Provider,{value:l},t)}function r(){const e=(0,a.useContext)(c);if(null===e)throw new o.i6("DocProvider");return e}function i(){const{metadata:e,frontMatter:t,assets:n}=r();return a.createElement(l.d,{title:e.title,description:e.description,keywords:t.keywords,image:n.image??t.image})}var d=n(6010),m=n(7524),u=n(49);function p(){const{metadata:e}=r();return a.createElement(u.Z,{previous:e.previous,next:e.next})}var b=n(3120),g=n(4364),h=n(5281),v=n(5999);function E(e){let{lastUpdatedAt:t,formattedLastUpdatedAt:n}=e;return a.createElement(v.Z,{id:"theme.lastUpdated.atDate",description:"The words used to describe on which date a page has been last updated",values:{date:a.createElement("b",null,a.createElement("time",{dateTime:new Date(1e3*t).toISOString()},n))}}," on {date}")}function f(e){let{lastUpdatedBy:t}=e;return a.createElement(v.Z,{id:"theme.lastUpdated.byUser",description:"The words used to describe by who the page has been last updated",values:{user:a.createElement("b",null,t)}}," by {user}")}function k(e){let{lastUpdatedAt:t,formattedLastUpdatedAt:n,lastUpdatedBy:l}=e;return a.createElement("span",{className:h.k.common.lastUpdated},a.createElement(v.Z,{id:"theme.lastUpdated.lastUpdatedAtBy",description:"The sentence used to display when a page has been last updated, and by who",values:{atDate:t&&n?a.createElement(E,{lastUpdatedAt:t,formattedLastUpdatedAt:n}):"",byUser:l?a.createElement(f,{lastUpdatedBy:l}):""}},"Last updated{atDate}{byUser}"),!1)}var N=n(4881),L=n(1526);const Z={lastUpdated:"lastUpdated_vwxv"};function C(e){return a.createElement("div",{className:(0,d.Z)(h.k.docs.docFooterTagsRow,"row margin-bottom--sm")},a.createElement("div",{className:"col"},a.createElement(L.Z,e)))}function _(e){let{editUrl:t,lastUpdatedAt:n,lastUpdatedBy:l,formattedLastUpdatedAt:o}=e;return a.createElement("div",{className:(0,d.Z)(h.k.docs.docFooterEditMetaRow,"row")},a.createElement("div",{className:"col"},t&&a.createElement(N.Z,{editUrl:t})),a.createElement("div",{className:(0,d.Z)("col",Z.lastUpdated)},(n||l)&&a.createElement(k,{lastUpdatedAt:n,formattedLastUpdatedAt:o,lastUpdatedBy:l})))}function B(){const{metadata:e}=r(),{editUrl:t,lastUpdatedAt:n,formattedLastUpdatedAt:l,lastUpdatedBy:o,tags:c}=e,s=c.length>0,i=!!(t||n||o);return s||i?a.createElement("footer",{className:(0,d.Z)(h.k.docs.docFooter,"docusaurus-mt-lg")},s&&a.createElement(C,{tags:c}),i&&a.createElement(_,{editUrl:t,lastUpdatedAt:n,lastUpdatedBy:o,formattedLastUpdatedAt:l})):null}var y=n(6043),T=n(5054),w=n(7462);const x={tocCollapsibleButton:"tocCollapsibleButton_TO0P",tocCollapsibleButtonExpanded:"tocCollapsibleButtonExpanded_MG3E"};function H(e){let{collapsed:t,...n}=e;return a.createElement("button",(0,w.Z)({type:"button"},n,{className:(0,d.Z)("clean-btn",x.tocCollapsibleButton,!t&&x.tocCollapsibleButtonExpanded,n.className)}),a.createElement(v.Z,{id:"theme.TOCCollapsible.toggleButtonLabel",description:"The label used by the button on the collapsible TOC component"},"On this page"))}const I={tocCollapsible:"tocCollapsible_ETCw",tocCollapsibleContent:"tocCollapsibleContent_vkbj",tocCollapsibleExpanded:"tocCollapsibleExpanded_sAul"};function A(e){let{toc:t,className:n,minHeadingLevel:l,maxHeadingLevel:o}=e;const{collapsed:c,toggleCollapsed:s}=(0,y.u)({initialState:!0});return a.createElement("div",{className:(0,d.Z)(I.tocCollapsible,!c&&I.tocCollapsibleExpanded,n)},a.createElement(H,{collapsed:c,onClick:s}),a.createElement(y.z,{lazy:!0,className:I.tocCollapsibleContent,collapsed:c},a.createElement(T.Z,{toc:t,minHeadingLevel:l,maxHeadingLevel:o})))}const U={tocMobile:"tocMobile_ITEo"};function M(){const{toc:e,frontMatter:t}=r();return a.createElement(A,{toc:e,minHeadingLevel:t.toc_min_heading_level,maxHeadingLevel:t.toc_max_heading_level,className:(0,d.Z)(h.k.docs.docTocMobile,U.tocMobile)})}var j=n(541);function O(){const{toc:e,frontMatter:t}=r();return a.createElement(j.Z,{toc:e,minHeadingLevel:t.toc_min_heading_level,maxHeadingLevel:t.toc_max_heading_level,className:h.k.docs.docTocDesktop})}var S=n(2503),P=n(3140);function V(e){let{children:t}=e;const n=function(){const{metadata:e,frontMatter:t,contentTitle:n}=r();return t.hide_title||void 0!==n?null:e.title}();return a.createElement("div",{className:(0,d.Z)(h.k.docs.docMarkdown,"markdown")},n&&a.createElement("header",null,a.createElement(S.Z,{as:"h1"},n)),a.createElement(P.Z,null,t))}var R=n(1310);const $={docItemContainer:"docItemContainer_Djhp",docItemCol:"docItemCol_VOVn"};function F(e){let{children:t}=e;const n=function(){const{frontMatter:e,toc:t}=r(),n=(0,m.i)(),l=e.hide_table_of_contents,o=!l&&t.length>0;return{hidden:l,mobile:o?a.createElement(M,null):void 0,desktop:!o||"desktop"!==n&&"ssr"!==n?void 0:a.createElement(O,null)}}();return a.createElement("div",{className:"row"},a.createElement("div",{className:(0,d.Z)("col",!n.hidden&&$.docItemCol)},a.createElement(b.Z,null),a.createElement("div",{className:$.docItemContainer},a.createElement("article",null,a.createElement(R.Z,null),a.createElement(g.Z,null),n.mobile,a.createElement(V,null,t),a.createElement(B,null)),a.createElement(p,null))),n.desktop&&a.createElement("div",{className:"col col--3"},n.desktop))}function W(e){const t=`docs-doc-id-${e.content.metadata.unversionedId}`,n=e.content;return a.createElement(s,{content:e.content},a.createElement(l.FG,{className:t},a.createElement(i,null),a.createElement(F,null,a.createElement(n,null))))}},49:(e,t,n)=>{n.d(t,{Z:()=>s});var a=n(7462),l=n(7294),o=n(5999),c=n(2244);function s(e){const{previous:t,next:n}=e;return l.createElement("nav",{className:"pagination-nav docusaurus-mt-lg","aria-label":(0,o.I)({id:"theme.docs.paginator.navAriaLabel",message:"Docs pages navigation",description:"The ARIA label for the docs pagination"})},t&&l.createElement(c.Z,(0,a.Z)({},t,{subLabel:l.createElement(o.Z,{id:"theme.docs.paginator.previous",description:"The label used to navigate to the previous doc"},"Previous")})),n&&l.createElement(c.Z,(0,a.Z)({},n,{subLabel:l.createElement(o.Z,{id:"theme.docs.paginator.next",description:"The label used to navigate to the next doc"},"Next"),isNext:!0})))}},4364:(e,t,n)=>{n.d(t,{Z:()=>r});var a=n(7294),l=n(6010),o=n(5999),c=n(5281),s=n(4477);function r(e){let{className:t}=e;const n=(0,s.E)();return n.badge?a.createElement("span",{className:(0,l.Z)(t,c.k.docs.docVersionBadge,"badge badge--secondary")},a.createElement(o.Z,{id:"theme.docs.versionBadge.label",values:{versionLabel:n.label}},"Version: {versionLabel}")):null}},3120:(e,t,n)=>{n.d(t,{Z:()=>h});var a=n(7294),l=n(6010),o=n(2263),c=n(9960),s=n(5999),r=n(143),i=n(5281),d=n(373),m=n(4477);const u={unreleased:function(e){let{siteTitle:t,versionMetadata:n}=e;return a.createElement(s.Z,{id:"theme.docs.versions.unreleasedVersionLabel",description:"The label used to tell the user that he's browsing an unreleased doc version",values:{siteTitle:t,versionLabel:a.createElement("b",null,n.label)}},"This is unreleased documentation for {siteTitle} {versionLabel} version.")},unmaintained:function(e){let{siteTitle:t,versionMetadata:n}=e;return a.createElement(s.Z,{id:"theme.docs.versions.unmaintainedVersionLabel",description:"The label used to tell the user that he's browsing an unmaintained doc version",values:{siteTitle:t,versionLabel:a.createElement("b",null,n.label)}},"This is documentation for {siteTitle} {versionLabel}, which is no longer actively maintained.")}};function p(e){const t=u[e.versionMetadata.banner];return a.createElement(t,e)}function b(e){let{versionLabel:t,to:n,onClick:l}=e;return a.createElement(s.Z,{id:"theme.docs.versions.latestVersionSuggestionLabel",description:"The label used to tell the user to check the latest version",values:{versionLabel:t,latestVersionLink:a.createElement("b",null,a.createElement(c.Z,{to:n,onClick:l},a.createElement(s.Z,{id:"theme.docs.versions.latestVersionLinkLabel",description:"The label used for the latest version suggestion link label"},"latest version")))}},"For up-to-date documentation, see the {latestVersionLink} ({versionLabel}).")}function g(e){let{className:t,versionMetadata:n}=e;const{siteConfig:{title:c}}=(0,o.Z)(),{pluginId:s}=(0,r.gA)({failfast:!0}),{savePreferredVersionName:m}=(0,d.J)(s),{latestDocSuggestion:u,latestVersionSuggestion:g}=(0,r.Jo)(s),h=u??(v=g).docs.find((e=>e.id===v.mainDocId));var v;return a.createElement("div",{className:(0,l.Z)(t,i.k.docs.docVersionBanner,"alert alert--warning margin-bottom--md"),role:"alert"},a.createElement("div",null,a.createElement(p,{siteTitle:c,versionMetadata:n})),a.createElement("div",{className:"margin-top--md"},a.createElement(b,{versionLabel:g.label,to:h.path,onClick:()=>m(g.name)})))}function h(e){let{className:t}=e;const n=(0,m.E)();return n.banner?a.createElement(g,{className:t,versionMetadata:n}):null}},4881:(e,t,n)=>{n.d(t,{Z:()=>d});var a=n(7294),l=n(5999),o=n(5281),c=n(7462),s=n(6010);const r={iconEdit:"iconEdit_Z9Sw"};function i(e){let{className:t,...n}=e;return a.createElement("svg",(0,c.Z)({fill:"currentColor",height:"20",width:"20",viewBox:"0 0 40 40",className:(0,s.Z)(r.iconEdit,t),"aria-hidden":"true"},n),a.createElement("g",null,a.createElement("path",{d:"m34.5 11.7l-3 3.1-6.3-6.3 3.1-3q0.5-0.5 1.2-0.5t1.1 0.5l3.9 3.9q0.5 0.4 0.5 1.1t-0.5 1.2z m-29.5 17.1l18.4-18.5 6.3 6.3-18.4 18.4h-6.3v-6.2z"})))}function d(e){let{editUrl:t}=e;return a.createElement("a",{href:t,target:"_blank",rel:"noreferrer noopener",className:o.k.common.editThisPage},a.createElement(i,null),a.createElement(l.Z,{id:"theme.common.editThisPage",description:"The link label to edit the current page"},"Edit this page"))}},2244:(e,t,n)=>{n.d(t,{Z:()=>c});var a=n(7294),l=n(6010),o=n(9960);function c(e){const{permalink:t,title:n,subLabel:c,isNext:s}=e;return a.createElement(o.Z,{className:(0,l.Z)("pagination-nav__link",s?"pagination-nav__link--next":"pagination-nav__link--prev"),to:t},c&&a.createElement("div",{className:"pagination-nav__sublabel"},c),a.createElement("div",{className:"pagination-nav__label"},n))}},3008:(e,t,n)=>{n.d(t,{Z:()=>s});var a=n(7294),l=n(6010),o=n(9960);const c={tag:"tag_zVej",tagRegular:"tagRegular_sFm0",tagWithCount:"tagWithCount_h2kH"};function s(e){let{permalink:t,label:n,count:s}=e;return a.createElement(o.Z,{href:t,className:(0,l.Z)(c.tag,s?c.tagWithCount:c.tagRegular)},n,s&&a.createElement("span",null,s))}},1526:(e,t,n)=>{n.d(t,{Z:()=>r});var a=n(7294),l=n(6010),o=n(5999),c=n(3008);const s={tags:"tags_jXut",tag:"tag_QGVx"};function r(e){let{tags:t}=e;return a.createElement(a.Fragment,null,a.createElement("b",null,a.createElement(o.Z,{id:"theme.tags.tagsListLabel",description:"The label alongside a tag list"},"Tags:")),a.createElement("ul",{className:(0,l.Z)(s.tags,"padding--none","margin-left--sm")},t.map((e=>{let{label:t,permalink:n}=e;return a.createElement("li",{key:n,className:s.tag},a.createElement(c.Z,{label:t,permalink:n}))}))))}},3596:(e,t,n)=>{n.d(t,{Z:()=>d});var a=n(7462),l=n(7294),o=n(6010),c=n(6412),s=n(5281),r=n(7016);const i={codeBlockContainer:"codeBlockContainer_APcc"};function d(e){let{as:t,...n}=e;const d=(0,c.p)(),m=(0,r.QC)(d);return l.createElement(t,(0,a.Z)({},n,{style:m,className:(0,o.Z)(n.className,i.codeBlockContainer,s.k.common.codeBlock)}))}},7451:(e,t,n)=>{n.d(t,{Z:()=>y});var a=n(7462),l=n(7294),o=n(6010),c=n(6668),s=n(6412),r=n(7016),i=n(5448),d=n(7594),m=n.n(d);const u=/\{(?<range>[\d,-]+)\}/,p={js:{start:"\\/\\/",end:""},jsBlock:{start:"\\/\\*",end:"\\*\\/"},jsx:{start:"\\{\\s*\\/\\*",end:"\\*\\/\\s*\\}"},bash:{start:"#",end:""},html:{start:"\x3c!--",end:"--\x3e"}};function b(e,t){const n=e.map((e=>{const{start:n,end:a}=p[e];return`(?:${n}\\s*(${t.flatMap((e=>[e.line,e.block?.start,e.block?.end].filter(Boolean))).join("|")})\\s*${a})`})).join("|");return new RegExp(`^\\s*(?:${n})\\s*$`)}function g(e,t){let n=e.replace(/\n$/,"");const{language:a,magicComments:l,metastring:o}=t;if(o&&u.test(o)){const e=o.match(u).groups.range;if(0===l.length)throw new Error(`A highlight range has been given in code block's metastring (\`\`\` ${o}), but no magic comment config is available. Docusaurus applies the first magic comment entry's className for metastring ranges.`);const t=l[0].className,a=m()(e).filter((e=>e>0)).map((e=>[e-1,[t]]));return{lineClassNames:Object.fromEntries(a),code:n}}if(void 0===a)return{lineClassNames:{},code:n};const c=function(e,t){switch(e){case"js":case"javascript":case"ts":case"typescript":return b(["js","jsBlock"],t);case"jsx":case"tsx":return b(["js","jsBlock","jsx"],t);case"html":return b(["js","jsBlock","html"],t);case"python":case"py":case"bash":return b(["bash"],t);case"markdown":case"md":return b(["html","jsx","bash"],t);default:return b(Object.keys(p),t)}}(a,l),s=n.split("\n"),r=Object.fromEntries(l.map((e=>[e.className,{start:0,range:""}]))),i=Object.fromEntries(l.filter((e=>e.line)).map((e=>{let{className:t,line:n}=e;return[n,t]}))),d=Object.fromEntries(l.filter((e=>e.block)).map((e=>{let{className:t,block:n}=e;return[n.start,t]}))),g=Object.fromEntries(l.filter((e=>e.block)).map((e=>{let{className:t,block:n}=e;return[n.end,t]})));for(let m=0;m<s.length;){const e=s[m].match(c);if(!e){m+=1;continue}console.log(e);const t=e.slice(1).find((e=>void 0!==e));i[t]?r[i[t]].range+=`${m},`:d[t]?r[d[t]].start=m:g[t]&&(r[g[t]].range+=`${r[g[t]].start}-${m-1},`),s.splice(m,1)}n=s.join("\n");const h={};return Object.entries(r).forEach((e=>{let[t,{range:n}]=e;m()(n).forEach((e=>{h[e]??=[],h[e].push(t)}))})),{lineClassNames:h,code:n}}var h=n(3746);const v={codeLine:"codeLine_iPqp",codeLineNumber:"codeLineNumber_F4P7",codeLineContent:"codeLineContent_pOih"};function E(e){let{line:t,classNames:n,showLineNumbers:c,getLineProps:s,getTokenProps:r}=e;1===t.length&&"\n"===t[0].content&&(t[0].content="");const i=s({line:t,className:(0,o.Z)(n,c&&v.codeLine)}),d=t.map(((e,t)=>l.createElement("span",(0,a.Z)({key:t},r({token:e,key:t})))));return l.createElement("span",i,c?l.createElement(l.Fragment,null,l.createElement("span",{className:v.codeLineNumber}),l.createElement("span",{className:v.codeLineContent},d)):d,l.createElement("br",null))}var f=n(195),k=n(5999);const N={copyButtonCopied:"copyButtonCopied__QnY",copyButtonIcons:"copyButtonIcons_FhaS",copyButtonIcon:"copyButtonIcon_phi_",copyButtonSuccessIcon:"copyButtonSuccessIcon_FfTR"};function L(e){let{code:t,className:n}=e;const[a,c]=(0,l.useState)(!1),s=(0,l.useRef)(void 0),r=(0,l.useCallback)((()=>{(0,f.Z)(t),c(!0),s.current=window.setTimeout((()=>{c(!1)}),1e3)}),[t]);return(0,l.useEffect)((()=>()=>window.clearTimeout(s.current)),[]),l.createElement("button",{type:"button","aria-label":a?(0,k.I)({id:"theme.CodeBlock.copied",message:"Copied",description:"The copied button label on code blocks"}):(0,k.I)({id:"theme.CodeBlock.copyButtonAriaLabel",message:"Copy code to clipboard",description:"The ARIA label for copy code blocks button"}),title:(0,k.I)({id:"theme.CodeBlock.copy",message:"Copy",description:"The copy button label on code blocks"}),className:(0,o.Z)("clean-btn",n,N.copyButton,a&&N.copyButtonCopied),onClick:r},l.createElement("span",{className:N.copyButtonIcons,"aria-hidden":"true"},l.createElement("svg",{className:N.copyButtonIcon,viewBox:"0 0 24 24"},l.createElement("path",{d:"M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"})),l.createElement("svg",{className:N.copyButtonSuccessIcon,viewBox:"0 0 24 24"},l.createElement("path",{d:"M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"}))))}const Z={wordWrapButtonIcon:"wordWrapButtonIcon_iowe",wordWrapButtonEnabled:"wordWrapButtonEnabled_gY8A"};function C(e){let{className:t,onClick:n,isEnabled:a}=e;const c=(0,k.I)({id:"theme.CodeBlock.wordWrapToggle",message:"Toggle word wrap",description:"The title attribute for toggle word wrapping button of code block lines"});return l.createElement("button",{type:"button",onClick:n,className:(0,o.Z)("clean-btn",t,a&&Z.wordWrapButtonEnabled),"aria-label":c,title:c},l.createElement("svg",{className:Z.wordWrapButtonIcon,viewBox:"0 0 24 24","aria-hidden":"true"},l.createElement("path",{fill:"currentColor",d:"M4 19h6v-2H4v2zM20 5H4v2h16V5zm-3 6H4v2h13.25c1.1 0 2 .9 2 2s-.9 2-2 2H15v-2l-3 3l3 3v-2h2c2.21 0 4-1.79 4-4s-1.79-4-4-4z"})))}var _=n(3596),B=n(9500);function y(e){let{children:t,className:n="",metastring:d,title:m,showLineNumbers:u,language:p}=e;const{prism:{defaultLanguage:b,magicComments:v}}=(0,c.L)(),f=p??(0,r.Vo)(n)??b,k=(0,s.p)(),N=(0,i.F)(),Z=(0,r.bc)(d)||m,{lineClassNames:y,code:T}=g(t,{metastring:d,language:f,magicComments:v}),w=u??(0,r.nt)(d);return l.createElement(_.Z,{as:"div",className:(0,o.Z)(n,f&&!n.includes(`language-${f}`)&&`language-${f}`)},Z&&l.createElement("div",{className:B.Z.codeBlockTitle},Z),l.createElement("div",{className:B.Z.codeBlockContent},l.createElement(h.ZP,(0,a.Z)({},h.lG,{theme:k,code:T,language:f??"text"}),(e=>{let{className:t,tokens:n,getLineProps:a,getTokenProps:c}=e;return l.createElement("pre",{tabIndex:0,ref:N.codeBlockRef,className:(0,o.Z)(t,B.Z.codeBlock,"thin-scrollbar")},l.createElement("code",{className:(0,o.Z)(B.Z.codeBlockLines,w&&B.Z.codeBlockLinesWithNumbering)},n.map(((e,t)=>l.createElement(E,{key:t,line:e,getLineProps:a,getTokenProps:c,classNames:y[t],showLineNumbers:w})))))})),l.createElement("div",{className:B.Z.buttonGroup},(N.isEnabled||N.isCodeScrollable)&&l.createElement(C,{className:B.Z.codeButton,onClick:()=>N.toggle(),isEnabled:N.isEnabled}),l.createElement(L,{className:B.Z.codeButton,code:T}))))}},9070:(e,t,n)=>{n.d(t,{Z:()=>m});var a=n(7462),l=n(7294),o=n(2389),c=n(6010),s=n(3596),r=n(9500);function i(e){let{children:t,className:n}=e;return l.createElement(s.Z,{as:"pre",tabIndex:0,className:(0,c.Z)(r.Z.codeBlockStandalone,"thin-scrollbar",n)},l.createElement("code",{className:r.Z.codeBlockLines},t))}var d=n(7451);function m(e){let{children:t,...n}=e;const c=(0,o.Z)(),s=function(e){return l.Children.toArray(e).some((e=>(0,l.isValidElement)(e)))?e:Array.isArray(e)?e.join(""):e}(t),r="string"==typeof s?d.Z:i;return l.createElement(r,(0,a.Z)({key:String(c)},n),s)}},541:(e,t,n)=>{n.d(t,{Z:()=>d});var a=n(7462),l=n(7294),o=n(6010),c=n(5054);const s={tableOfContents:"tableOfContents_jeP5",docItemContainer:"docItemContainer_hgFs"},r="table-of-contents__link toc-highlight",i="table-of-contents__link--active";function d(e){let{className:t,...n}=e;return l.createElement("div",{className:(0,o.Z)(s.tableOfContents,"thin-scrollbar",t)},l.createElement(c.Z,(0,a.Z)({},n,{linkClassName:r,linkActiveClassName:i})))}},5054:(e,t,n)=>{n.d(t,{Z:()=>b});var a=n(7462),l=n(7294),o=n(6668);function c(e){const t=e.map((e=>({...e,parentIndex:-1,children:[]}))),n=Array(7).fill(-1);t.forEach(((e,t)=>{const a=n.slice(2,e.level);e.parentIndex=Math.max(...a),n[e.level]=t}));const a=[];return t.forEach((e=>{const{parentIndex:n,...l}=e;n>=0?t[n].children.push(l):a.push(l)})),a}function s(e){let{toc:t,minHeadingLevel:n,maxHeadingLevel:a}=e;return t.flatMap((e=>{const t=s({toc:e.children,minHeadingLevel:n,maxHeadingLevel:a});return function(e){return e.level>=n&&e.level<=a}(e)?[{...e,children:t}]:t}))}function r(e){const t=e.getBoundingClientRect();return t.top===t.bottom?r(e.parentNode):t}function i(e,t){let{anchorTopOffset:n}=t;const a=e.find((e=>r(e).top>=n));if(a){return function(e){return e.top>0&&e.bottom<window.innerHeight/2}(r(a))?a:e[e.indexOf(a)-1]??null}return e[e.length-1]??null}function d(){const e=(0,l.useRef)(0),{navbar:{hideOnScroll:t}}=(0,o.L)();return(0,l.useEffect)((()=>{e.current=t?0:document.querySelector(".navbar").clientHeight}),[t]),e}function m(e){const t=(0,l.useRef)(void 0),n=d();(0,l.useEffect)((()=>{if(!e)return()=>{};const{linkClassName:a,linkActiveClassName:l,minHeadingLevel:o,maxHeadingLevel:c}=e;function s(){const e=function(e){return Array.from(document.getElementsByClassName(e))}(a),s=function(e){let{minHeadingLevel:t,maxHeadingLevel:n}=e;const a=[];for(let l=t;l<=n;l+=1)a.push(`h${l}.anchor`);return Array.from(document.querySelectorAll(a.join()))}({minHeadingLevel:o,maxHeadingLevel:c}),r=i(s,{anchorTopOffset:n.current}),d=e.find((e=>r&&r.id===function(e){return decodeURIComponent(e.href.substring(e.href.indexOf("#")+1))}(e)));e.forEach((e=>{!function(e,n){n?(t.current&&t.current!==e&&t.current.classList.remove(l),e.classList.add(l),t.current=e):e.classList.remove(l)}(e,e===d)}))}return document.addEventListener("scroll",s),document.addEventListener("resize",s),s(),()=>{document.removeEventListener("scroll",s),document.removeEventListener("resize",s)}}),[e,n])}function u(e){let{toc:t,className:n,linkClassName:a,isChild:o}=e;return t.length?l.createElement("ul",{className:o?void 0:n},t.map((e=>l.createElement("li",{key:e.id},function(e,t){return console.log(e),e.value.startsWith(":sig:")?l.createElement("a",{href:`#_${e.value.slice(5)}`,className:t??void 0,dangerouslySetInnerHTML:{__html:e.value.slice(5)}}):l.createElement("a",{href:`#${e.id}`,className:t??void 0,dangerouslySetInnerHTML:{__html:e.value}})}(e,a),l.createElement(u,{isChild:!0,toc:e.children,className:n,linkClassName:a}))))):null}const p=l.memo(u);function b(e){let{toc:t,className:n="table-of-contents table-of-contents__left-border",linkClassName:r="table-of-contents__link",linkActiveClassName:i,minHeadingLevel:d,maxHeadingLevel:u,...b}=e;const g=(0,o.L)(),h=d??g.tableOfContents.minHeadingLevel,v=u??g.tableOfContents.maxHeadingLevel,E=function(e){let{toc:t,minHeadingLevel:n,maxHeadingLevel:a}=e;return(0,l.useMemo)((()=>s({toc:c(t),minHeadingLevel:n,maxHeadingLevel:a})),[t,n,a])}({toc:t,minHeadingLevel:h,maxHeadingLevel:v});return m((0,l.useMemo)((()=>{if(r&&i)return{linkClassName:r,linkActiveClassName:i,minHeadingLevel:h,maxHeadingLevel:v}}),[r,i,h,v])),l.createElement(p,(0,a.Z)({toc:E,className:n,linkClassName:r},b))}},9500:(e,t,n)=>{n.d(t,{Z:()=>a});const a={codeBlockContent:"codeBlockContent_m3Ux",codeBlockTitle:"codeBlockTitle_P25_",codeBlock:"codeBlock_qGQc",codeBlockStandalone:"codeBlockStandalone_zC50",codeBlockLines:"codeBlockLines_p187",codeBlockLinesWithNumbering:"codeBlockLinesWithNumbering_OFgW",buttonGroup:"buttonGroup_6DOT"}}}]);