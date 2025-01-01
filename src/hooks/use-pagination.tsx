"use client";

import { useState } from "react";

export default function usePagination() {
  const [page, setPage] = useState(1);

  function changePage(pageNumber: number) {
    setPage(pageNumber);
  }
  return {
    page,
    changePage,
  };
}
