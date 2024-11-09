"use client";

import Page1 from "components/homepage/page1";
import Page2 from "components/homepage/page2";
import Page3 from "components/homepage/page3";
import { useState } from "react";

import { useState } from "react";

export default function MyProject() {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState({});
  const onChangePage = (page, data) => {
    setCurrentPage(page);
    setData(data);
  };
  function getPage(currentPage) {
    if (currentPage === 1) {
      return <Page1 onChangePage={onChangePage} />;
    } else if (currentPage === 2) {
      return <Page2 onChangePage={onChangePage} data={data} />;
    } else {
      return <Page3 onChangePage={onChangePage} data={data} />;
    }
  }
  return getPage(currentPage);
}
