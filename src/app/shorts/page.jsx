"use client";
import Banner from "components/common/banner";
import SideBar from "components/common/sideBar";
import DashboradPage from "components/shorts/dashboardPage";
import SuggestPage from "components/shorts/suggestPage";
import AddMusicPage from "components/shorts/addMusicPage";
import ResultPage from "components/shorts/resultPage";
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
      return <DashboradPage onChangePage={onChangePage} />;
    } else if (currentPage === 2) {
      return <SuggestPage onChangePage={onChangePage} data={data} />;
    } else if (currentPage === 3) {
      return <AddMusicPage onChangePage={onChangePage} data={data} />;
    } else if (currentPage === 4) {
      return <ResultPage onChangePage={onChangePage} data={data} />;
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