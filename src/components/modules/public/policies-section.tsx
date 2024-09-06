import React from "react";

interface PolicyDescription {
  title: string;
  desc: string[];
}

interface PoliciesSectionProps {
  policies: PolicyDescription[];
}

export default function PoliciesSection({ policies }: PoliciesSectionProps) {
  return (
    <div className="mx-auto mb-16 py-16 w-3/4 px-8 sm:w-2/3 sm:px-12 md:px-16 lg:px-20 xl:px-0 border border-solid border-color-8 rounded-md">
      <div className="mx-auto max-w-[48rem]">
        {policies.map((policy, index) => (
          <React.Fragment key={index}>
            <h2 className="text-lg font-extrabold mb-4 mt-5">{policy.title}</h2>
            {policy.desc.map((paragraph, i) => (
              <p key={i} className="mb-5 text-color-6">
                {paragraph}
              </p>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
