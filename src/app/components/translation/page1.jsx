"use client";

import { useState, useEffect } from "react";
import { getCurrentUser, getVideosList } from "api/api";
import TranslationItem from "components/translation/Page1Components/translationItem";
import { useSession } from "next-auth/react";

export default function Page1({ onChangePage }) {
  const [videoList, setVideoList] = useState([]);
  const { data: session, status, update } = useSession();
  const user = session?.user;
  const getUserVideoData = () => {
    if (user) {
      const videoIds = user.video_ids;
      getVideosList(videoIds)
      .then((videos) => {
        setVideoList(videos); // Set video list
      })
      .catch((err) => {
        window.alert("Failed to fetch user data", err);
      });
    }
  }

  useEffect(() => {
    getUserVideoData();
  }, []);

  return (
    <div>
      <div className="flex justify-between mt-[30px]">
        <div className="flex items-center px-4 border-[1px] border-[#777e9066] rounded-md overflow-hidden w-[340px]">
          <img src="/images/search-icon-2.svg" alt="" className="size-6" />
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Find your works"
            className="mr-auto py-2 pl-[14px] border-none outline-none placeholder:text-[14px] placeholder:font-[700] placeholder:text-[#00000066]"
          />
        </div>
        <div className="flex items-center gap-3 w-[200px] border-[#777e9066] border-[1px] rounded-md py-[10px] px-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M6.66634 10.8334V4.85425L4.52051 7.00008L3.33301 5.83341L7.49967 1.66675L11.6663 5.83341L10.4788 7.00008L8.33301 4.85425V10.8334H6.66634ZM12.4997 18.3334L8.33301 14.1667L9.52051 13.0001L11.6663 15.1459V9.16675H13.333V15.1459L15.4788 13.0001L16.6663 14.1667L12.4997 18.3334Z"
              fill="black"
            />
          </svg>
          <span className="text-base font-[700]">Sort by date</span>
          <img
            src="/images/icon-arrow-dropdown.svg"
            alt=""
            className="-translate-y-[1px] ml-auto"
          />
        </div>
      </div>

      <div className="mt-[30px] w-full">
        <h3 className="text-base font-[700]">Translated Videos</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-[20px]">
          {videoList.map((item, index) => (
              <TranslationItem
                data={item}
                onClick={() => onChangePage(2, item)}
                key={index}
              />
            ))}
          </div>
        </div>
    </div>
  );
}
