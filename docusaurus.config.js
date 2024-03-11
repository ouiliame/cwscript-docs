// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
const lightCodeTheme = require("prism-react-renderer/themes/github");
// const darkCodeTheme = require("prism-react-renderer/themes/

const removeSpecialHeadings = require("./src/remark/remove-special-headings");

/** @type {import('prism-react-renderer').PrismTheme} */
const darkCodeTheme = {
  plain: {
    color: "#f4f4f4",
    backgroundColor: "#262626",
  },
  styles: [
    {
      types: ["comment"],
      style: {
        color: "#727272",
        fontStyle: "italic",
      },
    },
    {
      types: ["string", "attr-value"],
      style: {
        color: "#aaff33",
      },
    },
    {
      types: ["escape"],
      style: {
        color: "#08a229",
        fontWeight: "bold",
      },
    },
    {
      types: ["number"],
      style: {
        color: "#75ccff",
      },
    },
    {
      types: ["punctuation"],
      style: {
        color: "#aeaeae",
      },
    },
    {
      types: ["constant"],
      style: {
        color: "#75ccff",
      },
    },
    {
      types: ["keyword"],
      style: {
        color: "#ff7428",
      },
    },
    {
      types: ["operator"],
      style: {
        color: "#e9aa16",
      },
    },
    {
      types: ["fail"],
      style: {
        color: "#ff4128",
        fontWeight: "bold",
      },
    },
    {
      types: ["special-call"],
      style: {
        color: "#ff6128",
        fontWeight: "bold",
      },
    },
    {
      types: ["property"],
      style: {
        color: "#97ccff",
        fontStyle: "italic",
      },
    },
    {
      types: ["builtin", "class-name"],
      style: {
        color: "#ffec76",
      },
    },
    {
      types: ["function"],
      style: {
        color: "#bf88ef",
        fontStyle: "italic",
      },
    },
  ],
};

// /** @type {import('@docusaurus/types').Config} */
const config = async () => ({
  title: "CWScript Documentation",
  tagline: "A simpler language for CosmWasm smart contracts",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://docs.cwscript.com",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/cwscript-docs/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "ouiliame", // Usually your GitHub org/user name.
  projectName: "cwscript-docs", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // remarkPlugins: [await shikiHighlightCws()],
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",

          remarkPlugins: [removeSpecialHeadings],
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: "dark",
        disableSwitch: true,
      },

      // Replace with your project's social card
      image: "img/docusaurus-social-card.jpg",
      navbar: {
        title: "CWScript",
        logo: {
          alt: "CWScript Logo",
          src: "img/logo.png",
        },
        items: [
          {
            type: "docSidebar",
            sidebarId: "docsSidebar",
            position: "left",
            label: "Docs",
          },
          {
            type: "docSidebar",
            sidebarId: "langSidebar",
            position: "left",
            label: "Language Reference",
          },
          {
            type: "docSidebar",
            sidebarId: "examplesSidebar",
            position: "left",
            label: "Code Examples",
          },
          // { to: "/blog", label: "Blog", position: "left" },
          {
            type: "html",
            position: "right",
            value: `<a class="button button--secondary" href="https://cwsdeck.vercel.app" >Tour</a>`,
          },
          {
            type: "html",
            position: "right",
            value: `<a class="button button--primary" href="/playground" >Playground</a>`,
          },
          {
            href: "https://github.com/terran-one/cwscript",
            label: "GitHub",
            position: "right",
          },
        ],
      },

      algolia: {
        // The application ID provided by Algolia
        appId: "YOUR_APP_ID",

        // Public API key: it is safe to commit it
        apiKey: "YOUR_SEARCH_API_KEY",

        indexName: "YOUR_INDEX_NAME",

        // Optional: see doc section below
        contextualSearch: true,

        // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
        externalUrlRegex: "external\\.com|domain\\.com",

        // Optional: Replace parts of the item URLs from Algolia. Useful when using the same search index for multiple deployments using a different baseUrl. You can use regexp or string in the `from` param. For example: localhost:3000 vs myCompany.com/docs
        replaceSearchResultPathname: {
          from: "/docs/", // or as RegExp: /\/docs\//
          to: "/",
        },

        // Optional: Algolia search parameters
        searchParameters: {},

        // Optional: path for search page that enabled by default (`false` to disable it)
        searchPagePath: "search",

        //... other Algolia params
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Tutorial",
                to: "/docs/intro",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Stack Overflow",
                href: "https://stackoverflow.com/questions/tagged/docusaurus",
              },
              {
                label: "Discord",
                href: "https://discordapp.com/invite/docusaurus",
              },
              {
                label: "Twitter",
                href: "https://twitter.com/docusaurus",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "Blog",
                to: "/blog",
              },
              {
                label: "GitHub",
                href: "https://github.com/facebook/docusaurus",
              },
            ],
          },
        ],

        copyright: `Copyright © ${new Date().getFullYear()} TERRAN.ONE LLC.`,
      },

      plugins: [
        async function myPlugin(context, options) {
          return {
            name: "docusaurus-tailwindcss",
            configurePostCss(postcssOptions) {
              // Appends TailwindCSS and AutoPrefixer.
              postcssOptions.plugins.push(require("tailwindcss"));
              postcssOptions.plugins.push(require("autoprefixer"));
              return postcssOptions;
            },
          };
        },
      ],

      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ["cwscript", "antlr4"],
      },
    }),
});

module.exports = config;
