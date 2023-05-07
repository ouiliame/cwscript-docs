import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
// import HomepageFeatures from "@site/src/components/HomepageFeatures";

import styles from "./index.module.css";
import CosmWasmFeatureSection from "../components/CosmWasmFeatureSection";
import LanguageIntroSection from "../components/LanguageIntroSection";
import ToolingSection from "../components/ToolingSection";
import CTASection from "../components/CTASection";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">CWScript</h1>
        <p className="hero__subtitle">
          A language for building dApps with CosmWasm.
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/playground"
          >
            Try online in your browser
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title="CWScript"
      description="A language for building dApps with CosmWasm."
    >
      <HomepageHeader />
      <main>
        <LanguageIntroSection />
        <CosmWasmFeatureSection />
        <ToolingSection />
        <CTASection />
      </main>
    </Layout>
  );
}
