import "monaco-editor/esm/vs/basic-languages/typescript/typescript.contribution.js";
import "monaco-editor/esm/vs/language/typescript/monaco.contribution.js";
import ReactDOM from "react-dom/client";
import React, { useState } from "react";
import { MonacoEditorReactComp } from "@typefox/monaco-editor-react/bundle";
import { UserConfig } from "monaco-editor-wrapper";
import { addMonacoStyles } from "monaco-editor-wrapper/styles";
import { buildWorkerDefinition } from "monaco-editor-workers";

buildWorkerDefinition(
  "../node_modules/monaco-editor-workers/dist/workers",
  import.meta.url,
  false
);
addMonacoStyles("monaco-editor-styles");

function getWorker() {
  const workerURL = new URL("cwsls-worker.js", window.location.href);
  return new Worker(workerURL.href, {
    type: "module",
    name: "cwscript-language-server-worker",
  });
}

const rootElem = document.getElementById("monaco-editor-root")!;
const worker = getWorker();
const EditorDemo: React.FC = () => {
  const logMessage = "console.log('hello')";
  const [content, setContent] = useState(logMessage);

  const userConfig: UserConfig = {
    wrapperConfig: {
      serviceConfig: {
        userServices: {
          enableModelService: true,
          configureConfigurationService: {
            defaultWorkspaceUri: "/tmp/",
          },
          enableKeybindingsService: true,
          enableLanguagesService: true,
        },
        debugLogging: true,
      },
      editorAppConfig: {
        $type: "classic",
        languageId: "typescript",
        useDiffEditor: false,
        theme: "vs-dark",
        code: content,
      },
    },
    languageClientConfig: {
      options: {
        $type: "WorkerDirect",
        worker: worker as Worker,
        name: `cwscript-language-server-worker`,
      },
      configurationOptions: {
        workspaceFolder: "/tmp/",
      },
    },
    loggerConfig: {
      enabled: true,
      debugEnabled: true,
    },
  };

  const addConsoleMessage = () => {
    setContent(`${content}\n${logMessage}`);
  };

  const onTextChanged = (text: string, isDirty: boolean) => {
    console.log(`Dirty? ${isDirty} Content: ${text}`);
  };

  return (
    <>
      <button onClick={addConsoleMessage}>Update Code</button>
      <MonacoEditorReactComp
        userConfig={userConfig}
        style={{
          paddingTop: "5px",
          height: "80vh",
        }}
        onTextChanged={onTextChanged}
      />
    </>
  );
};

const comp = <EditorDemo />;
const root = ReactDOM.createRoot(rootElem);
root.render(comp);
