import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
// import HomepageFeatures from "@site/src/components/HomepageFeatures";

import styles from "./index.module.css";
import {
  CloudArrowUpIcon,
  LockClosedIcon,
  ServerIcon,
} from "@heroicons/react/20/solid";
import CodeBlock from "../theme/CodeBlock";
import CodeBlockString from "../theme/CodeBlock/Content/String";

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

const features = [
  {
    name: "Simple yet Powerful",
    description:
      "Write complex smart contracts in only a fraction of the lines of code compared to Rust.",
    icon: CloudArrowUpIcon,
  },
  {
    name: "Less Boilerplate",
    description:
      "Focus on the important parts of your contracts, and let CWScript handle the rest.",
    icon: LockClosedIcon,
  },
  {
    name: "Comples to Rust",
    description:
      "Your CWScript contracts can integrate existing resources in the CosmWasm ecosystem.",
    icon: ServerIcon,
  },
];

const CWS_EXAMPLE = `
contract SimpleCounter {

  state {
    count: Int,
    owner: Address 
  }

  instantiate(count: Int) {
    $state.count = count
    $state.owner = $info.sender 
  }

  exec #increment(count: Int = 1) {
    $state.count += count
  }

  query #get_count() -> Int {
    $state.count
  }
}
`.trim();

function HomepageFeatures() {
  return (
    <div className="overflow-hidden bg-gray py-24 sm:py-32">
      <div className="mx-auto max-w-7xl md:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:grid-cols-2 lg:items-start">
          <div className="px-6 md:px-0 lg:pr-4 lg:pt-4">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-orange-600">
                A new language
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-100 sm:text-4xl">
                Build with CosmWasm
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-100">
                CWScript is a language for writing smart contracts with
                CosmWasm, designed to make building dApps projects on Cosmos
                blockchains fun and easy.
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-white lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-gray-200">
                      <feature.icon
                        className="absolute left-1 top-1 h-5 w-5 text-orange-600"
                        aria-hidden="true"
                      />
                      {feature.name}
                    </dt>
                    <dd className="inline">
                      <p className="text-base leading-7">
                        {feature.description}
                      </p>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <div className="sm:px-6 lg:px-0">
            <div className="relative isolate overflow-hidden bg-orange-500 px-6 pt-8 sm:mx-auto sm:max-w-2xl sm:rounded-3xl sm:pl-16 sm:pr-0 sm:pt-16 lg:mx-0 lg:max-w-none">
              <div
                className="absolute -inset-y-px -left-3 -z-10 w-full origin-bottom-left skew-x-[-32deg] bg-indigo-100 opacity-20 ring-1 ring-inset ring-white"
                aria-hidden="true"
              />
              <div className="mx-auto max-w-2xl sm:mx-0 sm:max-w-none">
                <div className="px-6 pb-14 pt-6">
                  <CodeBlockString language={"cwscript"} showLineNumbers={true}>
                    {CWS_EXAMPLE}
                  </CodeBlockString>
                </div>
              </div>
              <div
                className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10 sm:rounded-3xl"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
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
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
