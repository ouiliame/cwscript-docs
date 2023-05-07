import React from "react";
import {
  BoltIcon,
  CodeBracketIcon,
  ServerIcon,
} from "@heroicons/react/20/solid";
import CodeBlockString from "@site/src/theme/CodeBlock/Content/String";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRust } from "@fortawesome/free-solid-svg-icons";
import IconRust from "./icon-rust.svg";

const features = [
  {
    name: "Simple yet Expressive",
    description:
      "Write smart contracts in fewer lines of code, and in a fraction of the time compared to Rust.",
    icon: BoltIcon,
  },
  {
    name: "Zero Boilerplate",
    description:
      "Focus on the business logic of your contract, and let CWScript handle the tedious, less-relevant bits.",
    icon: CodeBracketIcon,
  },
  {
    name: "Compiles to Rust",
    description:
      "Write contracts in CWScript while still leveraging resources in the CosmWasm ecosystem.",
    icon: (props) => <IconRust {...props} fill="currentColor" />,
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

export default function LanguageIntroSection() {
  return (
    <>
      <div className="overflow-hidden bg-gray py-12 sm:py-32">
        <div className="mx-auto max-w-7xl md:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:grid-cols-2 lg:items-start">
            <div className="px-6 md:px-0 lg:pr-4 lg:pt-4">
              <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-lg">
                <h2 className="text-base font-semibold leading-7 text-orange-500">
                  Designed for developers
                </h2>
                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-100 sm:text-4xl">
                  A <i>smarter</i> contract language
                </p>
                <p className="mt-6 text-lg leading-8 text-gray-100">
                  CWScript makes building dApps on CosmWasm-enabled blockchains
                  simple, fast, and fun.
                </p>
                <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-white lg:max-w-none">
                  {features.map((feature) => (
                    <div key={feature.name} className="relative pl-9">
                      <dt className="inline font-semibold text-gray-200">
                        <feature.icon
                          className="absolute left-1 top-1 h-5 w-5 text-orange-500"
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
                    <CodeBlockString
                      language={"cwscript"}
                      showLineNumbers={true}
                    >
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
    </>
  );
}
