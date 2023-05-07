import React from "react";

const features = [
  {
    name: "CWSpec",
    description:
      "A NatSpec-like specification format for documenting expected behavior of CosmWasm smart contracts. Understood by various standard tools such as CWSDoc and CWSTest.",
  },
  {
    name: "CWSimulate",
    description:
      "A local simulation framework for testing smart contracts that can be used online, which can be used to simulate complex interactions between multiple contracts across different networks.",
  },
  {
    name: "CWSDoc",
    description:
      "Automated documentation generator for CWScript projects. Supports a variety of output formats, including HTML, PDF, and Markdown.",
  },
  {
    name: "CWSTest",
    description:
      "Testing framework for CWScript projects. Supports unit testing, integration testing, and simulation testing.",
  },
  {
    name: "CWScript Language Server",
    description:
      "A language server protocol implementation for CWScript. Provides code completion, diagnostics, and advanced language analysis for integration with IDEs such as VS Code and IntelliJ.",
  },
  {
    name: "CWStudio",
    description:
      "A full-featured IDE for CWScript, available as a VS Code extension. Provides CWScript language support alongside helpful tools for building, testing, and deploying CWScript projects.",
  },
];

export default function ToolingSection() {
  return (
    <div className="bg-gray py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-base font-semibold leading-7 text-orange-500">
            Developer tools and extensions
          </h2>
          <h2 className="text-3xl font-bold tracking-tight text-gray-200 sm:text-4xl">
            Supercharge your workflow
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-200">
            Tap into CWScript's open ecosystem of <i>contract-aware</i>{" "}
            developer tools to make building, testing, and deploying your
            contracts even easier.
          </p>
        </div>
        <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 text-base leading-7 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.name}>
              <dt className="font-semibold text-gray-200">{feature.name}</dt>
              <p>{feature.description}</p>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
