Prism.languages.cwscript = Prism.languages.extend('clike', {
    // Line comment starts with //
    'comment': {
        pattern: /(^|[^\\])\/\/.*/,
        lookbehind: true,
    },
    // Block comment starts with /* and ends with */
    'block-comment': {
        pattern: /\/\*[\s\S]*?\*\//,
        greedy: true,
    },

    'class-name': {
        pattern: /(\b(?:contract)\s+)(?!\d)[\w$]+/,
        lookbehind: true
    },

    // Keywords - Control
    'keyword': /\b(?:and|as|catch|const|contract|else|enum|error|event|exec|extends|fn|for|from|if|implements|import|in|instantiate|interface|is|let|mut|none|not|or|query|reply|return|state|struct|try|type)\b/,

    'operator': /\b(?:and|or|not|in|is|as|let|mut|const|fn|enum|struct|interface|impl|for|from|if|else|return|try|catch|throw|reply|exec|instantiate|import|export|contract|state|event|error|type|none)\b/,

    // Keywords - Special Operations
    'special-operation': /\b(?:call!|debug!|delegate_exec!|emit|exec!|fail!|instantiate!|query!)\b/,
    // Keywords - Contextual
    'contextual': /\$(?:env|info|response|state|Bank|Distribution|Staking|Wasm)\b/,
    // Keywords - Builtin Types
    'builtin': /\b(?:Address|Bool|I16|I28|I32|I64|I8|Int|None|String|U128|U16|U32|U64|U8|Uint|false|true)\b/,
});
