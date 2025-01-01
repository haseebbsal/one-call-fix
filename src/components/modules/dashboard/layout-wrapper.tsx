import React from "react";

interface LayoutWrapper {
  sectionOneTitle: string;
  sectionOneChildren: React.ReactNode;
  sectionTwoTitle?: string;
  sectionTwoChildren?: React.ReactNode;
  sectionOneClassname?: string;
  sectionTwoClassname?: string;
  sectionOneHeading?: string;
}

const LayoutWrapper = ({
  sectionOneTitle,
  sectionOneChildren,
  sectionTwoTitle,
  sectionTwoChildren,
  sectionOneClassname = "",
  sectionTwoClassname = "",
  sectionOneHeading,
}: LayoutWrapper) => {
  return (
    <div className="px-5 py-10">
      <div className={`flex flex-col lg:flex-row gap-5 ${sectionOneClassname}`}>
        <div className="w-full flex-[2] text-color-17">
          <h2 className="text-xl font-semibold mb-4 text-color-17">
            {sectionOneTitle}
          </h2>
          <section className="my-8 py-10 px-4 sm:px-10 rounded-md border bg-color-16 text-left text-gray-600">
            {sectionOneHeading && (
              <h2 className="text-xl font-semibold mb-8 text-color-17">
                {sectionOneHeading}
              </h2>
            )}
            {sectionOneChildren}
          </section>
        </div>

        {(sectionTwoTitle || sectionTwoChildren) && (
          <div className={`w-full flex-1 ${sectionTwoClassname}`}>
            <h2
              className={`text-xl font-semibold text-color-17 mb-4 ${!sectionTwoTitle ? "opacity-0 pointer-events-none" : ""}`}
            >
              {sectionTwoTitle || "text"}
            </h2>
            {sectionTwoChildren && (
              <section className="p-5 my-8 bg-white border border-gray-200 rounded-lg sm:p-8 dark:bg-color-16">
                {sectionTwoChildren}
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LayoutWrapper;
