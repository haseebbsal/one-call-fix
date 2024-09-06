import { columnType } from "@/_utils/types";

interface tableHeaderProps {
  columns: columnType[];
}
const TableHead = ({ columns }: tableHeaderProps) => {
  return (
    <thead>
      <tr className={`border-b border-color-19`}>
        {columns.map((e, index) => (
          <th key={index} className={`text-left p-2.5 xl:p-5`}>
            <h5 className="text-color-13 truncate font-bold text-xs lg:text-sm">
              {e.title}
            </h5>
          </th>
        ))}
      </tr>
    </thead>
  );
};
export default TableHead;
