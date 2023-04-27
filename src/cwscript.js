Prism.languages.cwscript = Prism.languages.extend("clike", {
  comment: {
    pattern: /\/\*[\s\S]*?\*\/|\/\/.*/,
    greedy: true,
  },
  constant: [
    {
      pattern: /(\$env|\$info|\$response|\$state|\$)/,
      greedy: true,
    },
    {
      pattern: /\b(true|false)\b/,
      alias: "builtin",
    },
    {
      pattern: /\bnone\b/,
      alias: "builtin",
    },
  ],
  function: [
    {
      pattern: /\b(call|debug|delegate_exec|exec|fail|instantiate|query)\b!/,
      greedy: true,
      alias: "special-call",
    },
    {
      pattern: /\bemit\b/,
      alias: "keyword",
    },
    {
      pattern: /(?:#?)(?:\b[A-Z][a-zA-Z0-9_]*!?)/,
      alias: "class-name",
    },
    {
      pattern: /(?:#?)(?:\b[a-zA-Z_][a-zA-Z0-9_]*!?)(?=\()/,
      greedy: true,
      lookbehind: true,
    },
  ],
  "fn-defn": {
    pattern:
      /\b(?:fn|exec|query|reply\.on_success|reply\.on_error|reply)\b\s*(?:#?[a-zA-Z_][a-zA-Z0-9_]*!?\s*)(?:\()/,
    lookbehind: true,
    greedy: true,
    inside: {
      keyword: /\b(fn|exec|query|reply\.on_success|reply\.on_error|reply)\b\s*/,
      function: /#?[a-zA-Z_][a-zA-Z0-9_]*!?/,
      punctuation: /[()]/,
    },
  },
  keyword: [
    {
      pattern:
        /\b(and|as|catch|const|contract|else|enum|error|event|extends|for|from|if|implements|import|in|interface|is|let|mut|not|or|return|state|struct|try|type)\b/,
    },
  ],
  property: [
    {
      pattern: /@[a-zA-Z_][a-zA-Z0-9_]*(\.[a-zA-Z_][a-zA-Z0-9_]*)*/,
      greedy: true,
    },
  ],
  punctuation: /[{}[\];(),.:]/,
  operator: /[?]{1,2}|[:]{1,2}|==|!=|[-+*\/%|^&=[\]<>]/,
  string: [
    {
      pattern: /'[^']*'/,
      alias: "string",
    },
    {
      pattern: /"[^"]*"/,
      alias: "string",
    },
  ],
  number: /\b\d+(?:\.\d*)?(?:[eE][+-]?\d+)?\b/,
});
