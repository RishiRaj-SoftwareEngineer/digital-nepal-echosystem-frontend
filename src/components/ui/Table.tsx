type Column = {
  key: string;
  label: string;
};

type TableProps = {
  columns: Column[];
  data: Record<string, any>[];
};

export function Table({ columns, data }: TableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key} className="p-2 border">
                {column.label}
              </th>
            ))}
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="hover:bg-gray-100">
              {columns.map((column) => (
                <td key={column.key} className="p-2 border">
                  {row[column.key]}
                </td>
              ))}
              <td className="p-2 border">...</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}