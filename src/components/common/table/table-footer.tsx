// import ChevronLeftIcon from "@/assets/icons/chevron-left.svg?react";
// import ChevronRightIcon from "@/assets/icons/chevron-right.svg?react";

interface tableFooterProps {
  page: number;
  limit: number;
  lastPage: number;
  summary: number;
  currentEntriesLength: number;
  changePage?: (pageNo: number) => void;
}

const TableFooter = ({
  page,
  limit,
  currentEntriesLength,
  lastPage,
  summary,
  changePage,
}: tableFooterProps) => {
  if (summary <= 0)
    return (
      <div className="w-full flex items-center justify-center py-5">
        <h5 className="text-color-4 text-lg lg:text-xl font-medium">
          No Data Found.
        </h5>
      </div>
    );
  return (
    <div className="mt-5 mb-7 flex flex-col sm:flex-row items-center justify-between text-gray-4 p-2">
      {!!changePage && (
        <div className="flex items-center justify-center gap-2">
          {/* <button
                        type="button"
                        disabled={page <= 1}
                        onClick={() => changePage(page - 1)}
                        className="w-12 h-12 rounded-full border-2 border-color-9 flex items-center justify-center disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <ChevronLeftIcon />
                    </button> */}

          {/*{Array.from({ length: 3 }, (_, i) => i + page).map((el) => (*/}
          {/*  <button*/}
          {/*    type="button"*/}
          {/*    key={el}*/}
          {/*    className="w-12 h-12 rounded-full font-medium text-color-6 border-2 border-color-9 flex items-center justify-center transition-all duration-500 hover:bg-color-2 hover:border-color-2 hover:text-white "*/}
          {/*  >*/}
          {/*    {el}*/}
          {/*  </button>*/}
          {/*))}*/}

          {/* <button
                        type="button"
                        disabled={page >= lastPage}
                        onClick={() => changePage(page + 1)}
                        className="w-12 h-12 rounded-full border-2 border-color-9 flex items-center justify-center disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <ChevronRightIcon />
                    </button> */}
        </div>
      )}
      {/* <p className={"text-color-3 text-xs lg:text-md"}>
                {`Showing ${limit * page - (limit - 1)} to ${currentEntriesLength} of ${summary} entries`}
            </p> */}
    </div>
  );
};
export default TableFooter;
