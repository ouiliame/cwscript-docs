import React from "react";

export default function CTASection() {
  return (
    <div className="bg-gray">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:justify-between lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-gray-200 sm:text-4xl">
          Interested in CWScript?
          <br />
          Sign up to join the developer preview.
        </h2>
        <div className="mt-10 flex items-center gap-x-6 lg:mt-0 lg:flex-shrink-0">
          <a
            href="https://fknn5ydci35.typeform.com/cws-dev-preview"
            className="rounded-md bg-orange-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm"
          >
            Request Invitation
          </a>
          <a href="#" className="text-sm font-semibold leading-6 text-gray-200">
            Just notify me when it's ready...
          </a>
        </div>
      </div>
    </div>
  );
}
