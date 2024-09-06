import React from "react";

import { columnType } from "@/_utils/types";
import TableFooter from "@/components/common/table/table-footer";
import TableHead from "@/components/common/table/table-head";

interface BaseTableProps {
  columns: columnType[];
  page: number;
  lastPage: number;
  limit: number;
  summary: number;
  children: React.ReactNode;
  currentEntriesLength: number;
  changePage?: (pageNo: number) => void;
}
const BaseTable = ({
  columns,
  summary,
  page,
  limit,
  children,
  currentEntriesLength,
  lastPage,
  changePage,
}: BaseTableProps) => {
  return (
    <div
      style={{ minHeight: "500px" }}
      className={`w-full rounded-sm overflow-x-auto shadow-default`}
    >
      <div>
        <table className="w-full">
          <TableHead columns={columns} />
          {children}
        </table>
        <TableFooter
          lastPage={lastPage}
          changePage={changePage}
          page={page}
          limit={limit}
          currentEntriesLength={currentEntriesLength}
          summary={summary}
        />
      </div>
    </div>
  );
};

export default BaseTable;
