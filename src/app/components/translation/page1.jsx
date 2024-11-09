"use client";

import { useState, useEffect } from "react";
import Banner from "components/common/banner";
import { getCurrentUser, getVideosList } from "api/api";
import TranslationItem from "components/translation/translationItem";
import { redirect } from "next/navigation";

export default function Page1({ onChangePage }) {
  const [user, setUser] = useState(null);
  const [videoList, setVideoList] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getCurrentUser(token)
        .then((data) => {
          setUser(data);
          return data.video_ids; // Extract video_ids
        })
        .then((videoIds) => {
          if (videoIds && videoIds.length > 0) {
            console.log("Sending videoIds:", videoIds); // Debugging line
            return getVideosList(videoIds); // Fetch video list
          }
          return [];
        })
        .then((videos) => {
          setVideoList(videos); // Set video list
        })
        .catch((err) => {
          console.error(err);
        });
    }
    console.log(user);
    console.log(videoList);
  }, []);

  return (
    <div>
      <Banner label="Translated Videos">
        <img src="/images/translation_banner.png" alt="" />
      </Banner>
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

      {videoList?.length > 0 && (
        <div className="mt-[30px] w-full">
          <h3 className="text-base font-[700]">Translated Videos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-[20px]">
            {videoList.map((item, index) => (
              <TranslationItem
                data={{
                  img: item.video_url, // Assuming video_url is the image URL
                  title: item.video_title,
                  date_created: new Date().toLocaleDateString("vi-VN"), // Assuming current date for simplicity
                }}
                onClick={() => {
                  console.log(item);
                  onChangePage(2, {
                    ...item,
                    videoId: item.video_id, // Pass video_id
                    videoUrl: item.video_url, // Pass video_url
                    videoTitle: item.video_title, // Pass video_title
                    videoType: item.video_type, // Pass video_type
                    useCaptions: item.use_captions, // Pass use_captions
                    publishedAt: item.published_at || new Date().toISOString(), // Pass published_at or today's date
                  });
                }}
                key={index}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
