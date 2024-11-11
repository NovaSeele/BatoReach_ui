"use client";
import Banner from "components/common/banner";
import SideBar from "components/common/sideBar";
import Page1 from "components/shorts/page1";
import Page2 from "components/shorts/page2";
import Page3 from "components/shorts/page3";
import { useState } from "react";

export default function ShortsPage() {
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
    } else if (currentPage === 3) {
      return <Page3 onChangePage={onChangePage} data={data} />;
    }
  }

  return (
    <div className="flex row">
      <SideBar/>
      <div className="flex-[8]">
        <Banner label="Shorts">
        
        </Banner>
        {getPage(currentPage)}
      </div>
    </div>
  );
}