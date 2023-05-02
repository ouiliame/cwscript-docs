const visit = require("unist-util-visit");
const remove = require("unist-util-remove");

const plugin = (options) => {
  const transformer = async (ast) => {
    remove(ast, (node) => {
      if (node.type === "heading") {
        if (node.children) {
          if (node.children[0].value.startsWith(":sig:")) {
            return true;
          }
        }
      }
      return false;
    });

    // visit(ast, "heading", (node, el) => {
    //   if (node.children) {
    //     if (node.children[0].value.startsWith(":sig:")) {
    //       node.children[0].value = node.children[0].value.slice(5);
    //     }
    //   }
    // });
  };
  return transformer;
};

module.exports = plugin;
