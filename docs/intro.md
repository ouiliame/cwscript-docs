---
sidebar_position: 1
---

# Introduction

CWScript is a programming language specifically designed for developing CosmWasm smart contracts. It aims to simplify
the development process by providing a more accessible syntax and improving the developer experience.

### CosmWasm: Potential and Challenges

CosmWasm is a powerful and innovative platform with numerous advantages such as enhanced security compared to EVM, an
elegant message-passing design, and core interchain capabilities. Despite these benefits, CosmWasm's adoption is
hindered by challenges in the Rust-based ecosystem. Newcomers often find the learning curve steep, while the developer
experience is hindered by inadequate documentation, lack of guidance on best practices, poor standardization, and
insufficient models for composability and building large programs. CWScript addresses these challenges by offering a
simplified syntax that clearly communicates the intent of the program.

## Design Philosophy

CWScript is designed to reduce syntactic noise and create a seamless experience for developers. It translates high-level
CWScript code into high-quality idiomatic CosmWasm Rust patterns. The language's design goals center around a
tooling-first approach, meaning that CWScript is built with tooling developers in mind. It exposes the compiler
interface, enabling the development of new tools for deep introspection and manipulation of smart contract logic. The
simplicity of CWScript allows developers to focus on the complexity of their ideas, rather than wrestling with syntax.

## Future Goals

CWScript aims to achieve several future goals, including:

1. Generating optimized Rust output that surpasses human-written code
2. Working seamlessly alongside Rust to maintain compatibility with the existing Rust ecosystem
3. Extending the language through Rust for added functionality

These goals will empower developers to leverage the best of both worlds: the simplicity of CWScript and the robustness
of Rust.
