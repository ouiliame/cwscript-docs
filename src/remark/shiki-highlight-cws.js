// remark-shiki.js
const shiki = require("shiki");
const visit = require("unist-util-visit");

async function getShikiHighlighter() {
  return await shiki.getHighlighter({
    themes: ["cwscript-dark", "github-light"],
    paths: {
      themes: `${__dirname}/themes/`,
    },
  });
}

async function createShikiRemarkPlugin(options = {}) {
  const highlighter = await getShikiHighlighter();
  await highlighter.loadLanguage({
    id: "cwscript",
    scopeName: "source.cwscript",
    path: `${__dirname}/languages/cwscript.tmLanguage.json`,
  });

  return function shikiRemarkPlugin() {
    return (tree) => {
      visit(tree, "code", (node) => {
        const language = node.lang || "text";
        const code = node.value;

        try {
          const highlightedCode = highlighter.codeToHtml(code, language);
          node.type = "html";
          node.value = `<pre class="shiki language-${language}"><code>${highlightedCode}</code></pre>`;
        } catch (e) {
          console.error(
            `Failed to highlight code block with Shiki: ${e.message}`
          );
        }
      });
    };
  };
}

module.exports = createShikiRemarkPlugin;
