import React from "react";

import {
  CubeTransparentIcon,
  LockClosedIcon,
  RocketLaunchIcon,
} from "@heroicons/react/20/solid";

const features = [
  {
    name: "Security Model",
    description:
      "CosmWasm enforces a unique actor-based security model that makes certain security flaws commonly found in Ethereum impossible.",
    href: "#",
    icon: LockClosedIcon,
  },
  {
    name: "Gas Efficiency",
    description:
      "Contracts can perform more interesting operations since gas for non-storage operations is much less expensive than on EVM.",
    href: "#",
    icon: RocketLaunchIcon,
  },
  {
    name: "Interchain Capabilities",
    description:
      "CosmWasm contracts can interact with other blockchains using IBC messages and queries, embracing the interchain philosophy.",
    href: "#",
    icon: CubeTransparentIcon,
  },
];

export default function CosmWasmFeatureSection() {
  return (
    <div className="bg-gray py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-orange-500">
            Next-gen smart contracts
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Unleash the power of CosmWasm
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            CWScript is powered by CosmWasm, an open-source engine and framework
            for WebAssembly smart contracts, available on major Cosmos
            blockchains.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-bold leading-7 text-white mb-3">
                  <feature.icon
                    className="h-5 w-5 flex-none text-orange-500"
                    aria-hidden="true"
                  />
                  {feature.name}
                </dt>
                {/* <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-300"> */}
                <p className="flex-auto leading-7">{feature.description}</p>
                <p className="mt-6">
                  <a
                    href={feature.href}
                    className="text-sm font-semibold leading-6 text-orange-500"
                  >
                    Learn more <span aria-hidden="true">→</span>
                  </a>
                </p>
                {/* </dd> */}
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
