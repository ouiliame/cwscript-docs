import React, { useState } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";

import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { classname } from "@uiw/codemirror-extensions-classname";

import styles from "./index.module.css";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro"
          >
            Docusaurus Tutorial - 5min ⏱️
          </Link>
        </div>
      </div>
    </header>
  );
}

const classnameExt = classname({
  add: (lineNumber) => {
    if (lineNumber === 1) {
      return "first-line";
    }
    if (lineNumber === 5) {
      return "line-color";
    }
  },
});

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const [code, setCode] = useState<string>("");
  const options = {
    mode: "jsx",
    theme: "material",
    lineNumbers: true,
    autoCloseBrackets: true,
    matchBrackets: true,
    styleActiveLine: true,
  };
  return (
    <Layout
      title="CWScript Playground"
      description="Try CWScript in your browser."
    >
      <main className={styles.playground}>
        <CodeMirror
          value="console.log('hello world!');"
          height="200px"
          extensions={[classnameExt, javascript({ jsx: true })]}
        />
      </main>
    </Layout>
  );
}
