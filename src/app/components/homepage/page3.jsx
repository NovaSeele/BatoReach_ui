"use client";
import Banner from "components/common/banner";
import { useState } from "react";
import { useEffect } from "react";

export default function Page3({ data, onChangePage }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Removed localStorage token retrieval and user fetching
  }, []);

  return (
    <div className="flex flex-col h-[95vh]">
      <div className="flex flex-col flex-1 mt-[30px]">
        <div className="flex gap-4 items-center">
          <div
            onClick={() => {
              onChangePage(1, {});
            }}
            className="bg-[#F37B8F] rounded-full size-8 flex items-center justify-center cursor-pointer"
          >
            <img src="/images/white-arrow.svg" alt="" className="size-4" />
          </div>
          <strong>Project / Generate shorts</strong>
        </div>
        <div className="flex-1 flex gap-4 mt-8">
          <iframe
            id="player"
            className="h-[80%] aspect-video rounded-lg"
            src={`https://www.youtube.com/embed/${data.snippet.resourceId.videoId}`}
            title="YouTube video player"
            frameBorder="0"
            allowFullScreen
          ></iframe>
          <div className="flex flex-col gap-4 border-[1px] border-slate-400 w-full h-[80%] overflow-y-auto rounded-lg px-6 py-5">
            <div className="flex flex-col">
              <strong className="text-[16px] font-[700]">Title</strong>
              <span>{data.snippet.title}</span>
            </div>
            <div className="flex flex-col">
              <strong className="text-[16px] font-[700]">Description</strong>
              <span>{data.snippet.title}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
