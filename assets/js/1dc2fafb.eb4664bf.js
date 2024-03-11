"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[4630],{3905:(e,t,n)=>{n.d(t,{Zo:()=>l,kt:()=>f});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},c=Object.keys(e);for(r=0;r<c.length;r++)n=c[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(r=0;r<c.length;r++)n=c[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var i=r.createContext({}),p=function(e){var t=r.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},l=function(e){var t=p(e.components);return r.createElement(i.Provider,{value:t},e.children)},u="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,c=e.originalType,i=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),u=p(n),d=o,f=u["".concat(i,".").concat(d)]||u[d]||m[d]||c;return n?r.createElement(f,a(a({ref:t},l),{},{components:n})):r.createElement(f,a({ref:t},l))}));function f(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var c=n.length,a=new Array(c);a[0]=d;var s={};for(var i in t)hasOwnProperty.call(t,i)&&(s[i]=t[i]);s.originalType=e,s[u]="string"==typeof e?e:o,a[1]=s;for(var p=2;p<c;p++)a[p]=n[p];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},6260:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>i,contentTitle:()=>a,default:()=>m,frontMatter:()=>c,metadata:()=>s,toc:()=>p});var r=n(7462),o=(n(7294),n(3905));const c={},a="Projects",s={unversionedId:"projects",id:"projects",title:"Projects",description:"CWScript projects organize related source files, tests, deployment scripts, dependencies and tool settings, etc.",source:"@site/docs/projects.mdx",sourceDirName:".",slug:"/projects",permalink:"/cwscript-docs/docs/projects",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/projects.mdx",tags:[],version:"current",frontMatter:{}},i={},p=[{value:"Creating a Project",id:"creating-a-project",level:2},{value:"Directory Structure",id:"directory-structure",level:2},{value:"<code>cwsproject.toml</code>",id:"cwsprojecttoml",level:2}],l={toc:p},u="wrapper";function m(e){let{components:t,...n}=e;return(0,o.kt)(u,(0,r.Z)({},l,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"projects"},"Projects"),(0,o.kt)("p",null,"CWScript ",(0,o.kt)("strong",{parentName:"p"},"projects")," organize related source files, tests, deployment scripts, dependencies and tool settings, etc.\ninto a workspace unit. It is recommended to create a separate project for each application or library."),(0,o.kt)("h2",{id:"creating-a-project"},"Creating a Project"),(0,o.kt)("p",null,"You can create a new project using the ",(0,o.kt)("inlineCode",{parentName:"p"},"cwsc new")," command:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"$ cwsc new <project-name>\n")),(0,o.kt)("h2",{id:"directory-structure"},"Directory Structure"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"<project-name>/\n\u251c\u2500\u2500 .gitignore\n\u251c\u2500\u2500 .cwspackages/\n\u251c\u2500\u2500 README.md\n\u251c\u2500\u2500 cwsproject.toml\n\u251c\u2500\u2500 cwsproject-lock.toml\n\u251c\u2500\u2500 src/\n\u2502   \u251c\u2500\u2500 Contract1.cws\n\u2502   \u2514\u2500\u2500 Contract2.cws\n\u251c\u2500\u2500 tests/\n\u2502   \u251c\u2500\u2500 unit_test.test.cws\n\u2502   \u251c\u2500\u2500 integration/\n\u2502   \u2502   \u2514\u2500\u2500 integration_test.test.cws\n\u2502   \u2514\u2500\u2500 testdata/\n\u2502       \u2514\u2500\u2500 textfixtures.json\n\u251c\u2500\u2500 gen/\n\u2502   \u251c\u2500\u2500 rust/\n\u2502   \u2502   \u2514\u2500\u2500 project-name/\n\u2502   \u2502       \u251c\u2500\u2500 Cargo.toml\n\u2502   \u2502       \u251c\u2500\u2500 contract1/\n\u2502   \u2502       \u2502   \u2514\u2500\u2500 Cargo.toml\n\u2502   \u2502       \u2514\u2500\u2500 contract2/\n\u2502   \u2502           \u2514\u2500\u2500 Cargo.toml\n\u2502   \u251c\u2500\u2500 wasm/\n\u2502   \u2502   \u251c\u2500\u2500 contract1.wasm\n\u2502   \u2502   \u2514\u2500\u2500 contract2.wasm\n\u2502   \u2514\u2500\u2500 cwdoc/\n\u2502       \u251c\u2500\u2500 md/\n\u2502       \u2502   \u251c\u2500\u2500 Contract1.md\n\u2502       \u2502   \u2514\u2500\u2500 Contract2.md\n\u2502       \u2514\u2500\u2500 html/\n\u2502           \u2514\u2500\u2500 ...generated HTML site\n\u2514\u2500\u2500 scripts/\n    \u2514\u2500\u2500 deploy.ts\n")),(0,o.kt)("h2",{id:"cwsprojecttoml"},(0,o.kt)("inlineCode",{parentName:"h2"},"cwsproject.toml")),(0,o.kt)("p",null,"The ",(0,o.kt)("inlineCode",{parentName:"p"},"cwsproject.toml")," file is the main manifest file for a project. It contains information about the project\nas well as various configuration options for the CWScript compiler and other tools."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-toml"},'[project]\nname = "project-name"\nversion = "0.1.0"\nauthors = ["Your Name"]\ndescription = "A short description of the project"\nlicense = "MIT"\n\n[dependencies]\n# ...\n\n[build]\n# ...\n\n[tool.cwsc]\nversion = "nightly"\nplugins = ["cwsc-plugin-foo", "cwsc-plugin-bar"]\nwarnings = "all"\ndebug = true\ncodegen = "rust"\n\n[tool.cwslint]\n# ...\n\n[tool.cwsdoc]\n# ...\n')))}m.isMDXComponent=!0}}]);