import React, { useState } from "react";
import { Pagination } from "antd";

function CustomPagination({ total, defaultPageSize }) {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    console.log("Current Page:", page);
  };

  return (
    <div className="pagination-container">
      <Pagination
        current={currentPage}
        onChange={handlePageChange}
        total={total}
        pageSize={defaultPageSize}
        onShowSizeChange={(current, size) => console.log("Page size:", size)}
        showTotal={(total, range) => `${range[0]}-${range[1]} из ${total} элементов`}
      />
    </div>
  );
}

export default CustomPagination;
