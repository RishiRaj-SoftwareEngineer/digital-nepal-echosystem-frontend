type PaginationProps = {
  currentPage: number;
  totalPages: number;
};

export function Pagination({
  currentPage,
  totalPages,
}: PaginationProps) {
  return (
    <div className="flex gap-2">
      <button>Previous</button>

      <span>
        Page {currentPage} of {totalPages}
      </span>

      <button>Next</button>

      <select>
        <option>10</option>
        <option>20</option>
        <option>50</option>
      </select>
    </div>
  );
}