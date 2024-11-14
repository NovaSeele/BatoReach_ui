"use client";

import { useState, useEffect } from "react";
import { getShortInfo } from "../../api/api";

export default function ResultPage({ data, onChangePage }) {
  const [shortInfo, setShortInfo] = useState([]);

  useEffect(() => {
    const fetchShortInfo = async () => {
      try {
        console.log("Fetching short info for data:", data);
        const infoPromises = data.map(url => getShortInfo(url));
        const infoResults = await Promise.all(infoPromises);
        console.log("Fetched short info:", infoResults);
        setShortInfo(infoResults);
      } catch (error) {
        console.error("Error fetching short info:", error);
      }
    };

    if (data && data.length > 0) {
      fetchShortInfo();
    } else {
      console.log("No data provided to fetch short info.");
    }
  }, [data]);
  
    return (
      <div className="flex flex-col h-[95vh]">
        <div className="flex flex-col flex-1 mt-[30px]">
          <div className="flex gap-4 items-center">
            <div
              onClick={() => onChangePage(1, {})}
              className="bg-[#F37B8F] rounded-full size-8 flex items-center justify-center cursor-pointer"
            >
              <img src="/images/white-arrow.svg" alt="" className="size-4" />
            </div>
            <strong>Back</strong>
          </div>
          <div className="flex-1 flex gap-4 mt-8">
            {shortInfo.map((info, index) => (
              <div key={index} className="flex gap-4">
                <iframe
                  id={`player-${index}`}
                  // className="aspect-[9/16] rounded-md object-cover"
                  className="h-[70%] aspect-video rounded-lg"
                  src={info.url}
                  title={`Video player ${index}`}
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
                <div className="flex flex-col gap-4 border-[1px] border-slate-400 w-full h-[80%] overflow-y-auto rounded-lg px-6 py-5">
                  <div className="flex flex-col">
                    <strong className="text-[16px] font-[700]">Title</strong>
                    <span>{info.short_title}</span>
                  </div>
                  <div className="flex flex-col">
                    <strong className="text-[16px] font-[700]">
                      Description
                    </strong>
                    <span>{info.short_description}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );

}