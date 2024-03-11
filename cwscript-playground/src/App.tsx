import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { MonacoEditorReactComp } from "@typefox/monaco-editor-react/bundle";
import { UserConfig } from "monaco-editor-wrapper";

import "monaco-editor/esm/vs/basic-languages/typescript/typescript.contribution.js";
import "monaco-editor/esm/vs/language/typescript/monaco.contribution.js";

const userConfig: UserConfig = {
  htmlElement: document.getElementById("monaco-editor-root") as HTMLElement,
  wrapperConfig: {
    editorAppConfig: {
      $type: "classic",
      languageId: "typescript",
      code: `function sayHello(): string {
    return "Hello";
};`,
      useDiffEditor: false,
      theme: "vs-dark",
    },
  },
};

function App() {
  return (
    <MonacoEditorReactComp
      userConfig={userConfig}
      style={{
        paddingTop: "5px",
        height: "80vh",
      }}
    />
  );
}

export default App;
