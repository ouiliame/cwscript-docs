"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[8610],{9703:(e,t,n)=>{n.d(t,{Z:()=>s});var a=n(7294),o=n(5999),c=n(2244);function s(e){const{metadata:t}=e,{previousPage:n,nextPage:s}=t;return a.createElement("nav",{className:"pagination-nav","aria-label":(0,o.I)({id:"theme.blog.paginator.navAriaLabel",message:"Blog list page navigation",description:"The ARIA label for the blog pagination"})},n&&a.createElement(c.Z,{permalink:n,title:a.createElement(o.Z,{id:"theme.blog.paginator.newerEntries",description:"The label used to navigate to the newer blog posts page (previous page)"},"Newer Entries")}),s&&a.createElement(c.Z,{permalink:s,title:a.createElement(o.Z,{id:"theme.blog.paginator.olderEntries",description:"The label used to navigate to the older blog posts page (next page)"},"Older Entries"),isNext:!0}))}},9985:(e,t,n)=>{n.d(t,{Z:()=>s});var a=n(7294),o=n(9460),c=n(390);function s(e){let{items:t,component:n=c.Z}=e;return a.createElement(a.Fragment,null,t.map((e=>{let{content:t}=e;return a.createElement(o.n,{key:t.metadata.permalink,content:t},a.createElement(n,null,a.createElement(t,null)))})))}},1714:(e,t,n)=>{n.r(t),n.d(t,{default:()=>E});var a=n(7294),o=n(6010),c=n(5999),s=n(8824),l=n(833),r=n(5281),i=n(9960),m=n(9058),d=n(9703),u=n(197),p=n(9985);function g(e){const t=function(){const{selectMessage:e}=(0,s.c)();return t=>e(t,(0,c.I)({id:"theme.blog.post.plurals",description:'Pluralized label for "{count} posts". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',message:"One post|{count} posts"},{count:t}))}();return(0,c.I)({id:"theme.blog.tagTitle",description:"The title of the page for a blog tag",message:'{nPosts} tagged with "{tagName}"'},{nPosts:t(e.count),tagName:e.label})}function b(e){let{tag:t}=e;const n=g(t);return a.createElement(a.Fragment,null,a.createElement(l.d,{title:n}),a.createElement(u.Z,{tag:"blog_tags_posts"}))}function h(e){let{tag:t,items:n,sidebar:o,listMetadata:s}=e;const l=g(t);return a.createElement(m.Z,{sidebar:o},a.createElement("header",{className:"margin-bottom--xl"},a.createElement("h1",null,l),a.createElement(i.Z,{href:t.allTagsPath},a.createElement(c.Z,{id:"theme.tags.tagsPageLink",description:"The label of the link targeting the tag list page"},"View All Tags"))),a.createElement(p.Z,{items:n}),a.createElement(d.Z,{metadata:s}))}function E(e){return a.createElement(l.FG,{className:(0,o.Z)(r.k.wrapper.blogPages,r.k.page.blogTagPostListPage)},a.createElement(b,e),a.createElement(h,e))}},3596:(e,t,n)=>{n.d(t,{Z:()=>m});var a=n(7462),o=n(7294),c=n(6010),s=n(6412),l=n(5281),r=n(7016);const i={codeBlockContainer:"codeBlockContainer_APcc"};function m(e){let{as:t,...n}=e;const m=(0,s.p)(),d=(0,r.QC)(m);return o.createElement(t,(0,a.Z)({},n,{style:d,className:(0,c.Z)(n.className,i.codeBlockContainer,l.k.common.codeBlock)}))}},7451:(e,t,n)=>{n.d(t,{Z:()=>L});var a=n(7462),o=n(7294),c=n(6010),s=n(6668),l=n(6412),r=n(7016),i=n(5448),m=n(7594),d=n.n(m);const u=/\{(?<range>[\d,-]+)\}/,p={js:{start:"\\/\\/",end:""},jsBlock:{start:"\\/\\*",end:"\\*\\/"},jsx:{start:"\\{\\s*\\/\\*",end:"\\*\\/\\s*\\}"},bash:{start:"#",end:""},html:{start:"\x3c!--",end:"--\x3e"}};function g(e,t){const n=e.map((e=>{const{start:n,end:a}=p[e];return`(?:${n}\\s*(${t.flatMap((e=>[e.line,e.block?.start,e.block?.end].filter(Boolean))).join("|")})\\s*${a})`})).join("|");return new RegExp(`^\\s*(?:${n})\\s*$`)}function b(e,t){let n=e.replace(/\n$/,"");const{language:a,magicComments:o,metastring:c}=t;if(c&&u.test(c)){const e=c.match(u).groups.range;if(0===o.length)throw new Error(`A highlight range has been given in code block's metastring (\`\`\` ${c}), but no magic comment config is available. Docusaurus applies the first magic comment entry's className for metastring ranges.`);const t=o[0].className,a=d()(e).filter((e=>e>0)).map((e=>[e-1,[t]]));return{lineClassNames:Object.fromEntries(a),code:n}}if(void 0===a)return{lineClassNames:{},code:n};const s=function(e,t){switch(e){case"js":case"javascript":case"ts":case"typescript":return g(["js","jsBlock"],t);case"jsx":case"tsx":return g(["js","jsBlock","jsx"],t);case"html":return g(["js","jsBlock","html"],t);case"python":case"py":case"bash":return g(["bash"],t);case"markdown":case"md":return g(["html","jsx","bash"],t);default:return g(Object.keys(p),t)}}(a,o),l=n.split("\n"),r=Object.fromEntries(o.map((e=>[e.className,{start:0,range:""}]))),i=Object.fromEntries(o.filter((e=>e.line)).map((e=>{let{className:t,line:n}=e;return[n,t]}))),m=Object.fromEntries(o.filter((e=>e.block)).map((e=>{let{className:t,block:n}=e;return[n.start,t]}))),b=Object.fromEntries(o.filter((e=>e.block)).map((e=>{let{className:t,block:n}=e;return[n.end,t]})));for(let d=0;d<l.length;){const e=l[d].match(s);if(!e){d+=1;continue}console.log(e);const t=e.slice(1).find((e=>void 0!==e));i[t]?r[i[t]].range+=`${d},`:m[t]?r[m[t]].start=d:b[t]&&(r[b[t]].range+=`${r[b[t]].start}-${d-1},`),l.splice(d,1)}n=l.join("\n");const h={};return Object.entries(r).forEach((e=>{let[t,{range:n}]=e;d()(n).forEach((e=>{h[e]??=[],h[e].push(t)}))})),{lineClassNames:h,code:n}}var h=n(3746);const E={codeLine:"codeLine_iPqp",codeLineNumber:"codeLineNumber_F4P7",codeLineContent:"codeLineContent_pOih"};function k(e){let{line:t,classNames:n,showLineNumbers:s,getLineProps:l,getTokenProps:r}=e;1===t.length&&"\n"===t[0].content&&(t[0].content="");const i=l({line:t,className:(0,c.Z)(n,s&&E.codeLine)}),m=t.map(((e,t)=>o.createElement("span",(0,a.Z)({key:t},r({token:e,key:t})))));return o.createElement("span",i,s?o.createElement(o.Fragment,null,o.createElement("span",{className:E.codeLineNumber}),o.createElement("span",{className:E.codeLineContent},m)):m,o.createElement("br",null))}var f=n(195),B=n(5999);const N={copyButtonCopied:"copyButtonCopied__QnY",copyButtonIcons:"copyButtonIcons_FhaS",copyButtonIcon:"copyButtonIcon_phi_",copyButtonSuccessIcon:"copyButtonSuccessIcon_FfTR"};function Z(e){let{code:t,className:n}=e;const[a,s]=(0,o.useState)(!1),l=(0,o.useRef)(void 0),r=(0,o.useCallback)((()=>{(0,f.Z)(t),s(!0),l.current=window.setTimeout((()=>{s(!1)}),1e3)}),[t]);return(0,o.useEffect)((()=>()=>window.clearTimeout(l.current)),[]),o.createElement("button",{type:"button","aria-label":a?(0,B.I)({id:"theme.CodeBlock.copied",message:"Copied",description:"The copied button label on code blocks"}):(0,B.I)({id:"theme.CodeBlock.copyButtonAriaLabel",message:"Copy code to clipboard",description:"The ARIA label for copy code blocks button"}),title:(0,B.I)({id:"theme.CodeBlock.copy",message:"Copy",description:"The copy button label on code blocks"}),className:(0,c.Z)("clean-btn",n,N.copyButton,a&&N.copyButtonCopied),onClick:r},o.createElement("span",{className:N.copyButtonIcons,"aria-hidden":"true"},o.createElement("svg",{className:N.copyButtonIcon,viewBox:"0 0 24 24"},o.createElement("path",{d:"M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"})),o.createElement("svg",{className:N.copyButtonSuccessIcon,viewBox:"0 0 24 24"},o.createElement("path",{d:"M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"}))))}const v={wordWrapButtonIcon:"wordWrapButtonIcon_iowe",wordWrapButtonEnabled:"wordWrapButtonEnabled_gY8A"};function w(e){let{className:t,onClick:n,isEnabled:a}=e;const s=(0,B.I)({id:"theme.CodeBlock.wordWrapToggle",message:"Toggle word wrap",description:"The title attribute for toggle word wrapping button of code block lines"});return o.createElement("button",{type:"button",onClick:n,className:(0,c.Z)("clean-btn",t,a&&v.wordWrapButtonEnabled),"aria-label":s,title:s},o.createElement("svg",{className:v.wordWrapButtonIcon,viewBox:"0 0 24 24","aria-hidden":"true"},o.createElement("path",{fill:"currentColor",d:"M4 19h6v-2H4v2zM20 5H4v2h16V5zm-3 6H4v2h13.25c1.1 0 2 .9 2 2s-.9 2-2 2H15v-2l-3 3l3 3v-2h2c2.21 0 4-1.79 4-4s-1.79-4-4-4z"})))}var y=n(3596),C=n(9500);function L(e){let{children:t,className:n="",metastring:m,title:d,showLineNumbers:u,language:p}=e;const{prism:{defaultLanguage:g,magicComments:E}}=(0,s.L)(),f=p??(0,r.Vo)(n)??g,B=(0,l.p)(),N=(0,i.F)(),v=(0,r.bc)(m)||d,{lineClassNames:L,code:_}=b(t,{metastring:m,language:f,magicComments:E}),j=u??(0,r.nt)(m);return o.createElement(y.Z,{as:"div",className:(0,c.Z)(n,f&&!n.includes(`language-${f}`)&&`language-${f}`)},v&&o.createElement("div",{className:C.Z.codeBlockTitle},v),o.createElement("div",{className:C.Z.codeBlockContent},o.createElement(h.ZP,(0,a.Z)({},h.lG,{theme:B,code:_,language:f??"text"}),(e=>{let{className:t,tokens:n,getLineProps:a,getTokenProps:s}=e;return o.createElement("pre",{tabIndex:0,ref:N.codeBlockRef,className:(0,c.Z)(t,C.Z.codeBlock,"thin-scrollbar")},o.createElement("code",{className:(0,c.Z)(C.Z.codeBlockLines,j&&C.Z.codeBlockLinesWithNumbering)},n.map(((e,t)=>o.createElement(k,{key:t,line:e,getLineProps:a,getTokenProps:s,classNames:L[t],showLineNumbers:j})))))})),o.createElement("div",{className:C.Z.buttonGroup},(N.isEnabled||N.isCodeScrollable)&&o.createElement(w,{className:C.Z.codeButton,onClick:()=>N.toggle(),isEnabled:N.isEnabled}),o.createElement(Z,{className:C.Z.codeButton,code:_}))))}},9070:(e,t,n)=>{n.d(t,{Z:()=>d});var a=n(7462),o=n(7294),c=n(2389),s=n(6010),l=n(3596),r=n(9500);function i(e){let{children:t,className:n}=e;return o.createElement(l.Z,{as:"pre",tabIndex:0,className:(0,s.Z)(r.Z.codeBlockStandalone,"thin-scrollbar",n)},o.createElement("code",{className:r.Z.codeBlockLines},t))}var m=n(7451);function d(e){let{children:t,...n}=e;const s=(0,c.Z)(),l=function(e){return o.Children.toArray(e).some((e=>(0,o.isValidElement)(e)))?e:Array.isArray(e)?e.join(""):e}(t),r="string"==typeof l?m.Z:i;return o.createElement(r,(0,a.Z)({key:String(s)},n),l)}},9500:(e,t,n)=>{n.d(t,{Z:()=>a});const a={codeBlockContent:"codeBlockContent_m3Ux",codeBlockTitle:"codeBlockTitle_P25_",codeBlock:"codeBlock_qGQc",codeBlockStandalone:"codeBlockStandalone_zC50",codeBlockLines:"codeBlockLines_p187",codeBlockLinesWithNumbering:"codeBlockLinesWithNumbering_OFgW",buttonGroup:"buttonGroup_6DOT"}}}]);