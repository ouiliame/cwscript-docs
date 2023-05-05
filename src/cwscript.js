Prism.languages.cwscript = Prism.languages.extend("clike", {
  comment: {
    pattern: /\/\*[\s\S]*?\*\/|\/\/.*/,
    greedy: true,
  },
  constant: [
    {
      pattern: /(\$env|\$info|\$response|\$state|\$data|\$events|\$error|\$)/,
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
  fail: {
    pattern: /\b(?:fail|debug)\b!/,
  },
  "special-call": {
    pattern:
      /\b(?:assert|delegate_exec|exec|instantiate|query)\b!|\bemit\b|\bdefer\b/,
    greedy: true,
  },
  function: [
    {
      pattern: /(?:#?)(?:\b[a-zA-Z_][a-zA-Z0-9_]*!?)(?=\()/,
      greedy: true,
    },
  ],
  "fn-defn": {
    pattern:
      /\b(?:fn|exec|query|reply\.on_success|reply\.on_error|reply)\b\s*(?:#?[a-zA-Z_][a-zA-Z0-9_]*!?\s*)(?:<\s*[A-Z][a-zA-Z0-9_]*(?:\s*,\s*[A-Z][a-zA-Z0-9_]*)*\s*>)?(?:\()/,
    greedy: true,
    inside: {
      generics: {
        pattern: /<\s*[A-Z][a-zA-Z0-9_]*(?:\s*,\s*[A-Z][a-zA-Z0-9_]*)*\s*>/,
        inside: {
          punctuation: /[<>]/,
          "class-name": /[A-Z][a-zA-Z0-9_]*/,
        },
      },
      keyword: /\b(fn|exec|query|reply\.on_success|reply\.on_error|reply)\b\s*/,
      function: /#?[a-zA-Z_][a-zA-Z0-9_]*!?\s*/,
      punctuation: /[()]/,
    },
  },
  keyword: {
    pattern:
      /\b(?:instantiate|fn|exec|query|reply\.on_success|reply\.on_error|reply|and|as|catch|const|else|enum|error|event|extends|for|from|if|implements|import|in|interface|is|let|mut|not|or|return|state|struct|try|type)(?!!)\b/,
  },

  property: [
    {
      pattern: /@[a-zA-Z_][a-zA-Z0-9_]*(\.[a-zA-Z_][a-zA-Z0-9_]*)*/,
      greedy: true,
    },
  ],
  punctuation: /[{}[\];(),.:]/,
  operator: /[?]{1,2}|[:]{1,2}|==|!=|[-+*\/%|^&=[\]<>]/,

  "class-name": [
    {
      pattern: /\bcontract\b(?=\s+[A-Z][a-zA-Z_0-9]*)/,
      inside: { keyword: /\bcontract\b/ },
    },
    {
      pattern: /(?:#?)(?:\b[A-Z][a-zA-Z0-9_]*!?)/,
    },
  ],

  string: [
    {
      pattern: /'[^']*'/,
    },
    {
      pattern: /"(?:\\.|\{[^{}]*}|(?!\{)[^\\"])*"/,
      inside: {
        escape: /\\(?:[abfnrtv\\"'{])/,
        interpolation: {
          pattern: /\{[^{}]*}/,
          inside: {
            punctuation: /^\{|}$/,
            expression: {
              pattern: /[\s\S]+/,
              inside: null, // see below
            },
          },
        },
      },
    },
  ],
  number: /\b\d+(?:\.\d*)?(?:[eE][+-]?\d+)?\b/,
});

Prism.languages.cwscript["string"][1].inside["interpolation"].inside[
  "expression"
].inside = Prism.languages.cwscript;
