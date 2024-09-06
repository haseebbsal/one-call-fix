interface PageTopSectionProps {
  pageTopSection: {
    title: string;
    text: string;
  };
}

export default function PageTopSection({
  pageTopSection,
}: PageTopSectionProps) {
  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 pt-32 pb-20 lg:flex">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            {pageTopSection.title}
          </h1>
          <p className="mt-4 sm:text-xl/relaxed text-color-6">
            {pageTopSection.text}
          </p>
        </div>
      </div>
    </section>
  );
}
