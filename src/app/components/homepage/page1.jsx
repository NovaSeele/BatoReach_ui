import TranslationItem from "components/common/translationItem";
import YTVideoItem from "components/common/ytVideoItem";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { CONSTANTS } from "common/constants";

export default function Page1({ onChangePage }) {
  const [translatedVideo, setTranslatedVideo] = useState([]);
  const [youtubeVideos, setYoutubeVideos] = useState([]);
  const { data: session, status, update } = useSession();
  const user = session?.user;

  // fetch youtube channel videos
  useEffect(() => {
    if (user) {
      for (const playlistId of user.play_list_id) {
        fetch(`${CONSTANTS.yt_api}${playlistId}&maxResults=25`, {
          method: "GET",
        })
          .then((response) => response.json())
          .then((result) => {
            setYoutubeVideos(...youtubeVideos, result.items);
          });
      } 
    }
  }, []);

  const onOpenFile = () => {
    console.log("open file");
    document.querySelector("#upload").click();
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    const formdata = new FormData();
    formdata.append("file", file);
    formdata.append("api_key", "764383437531566");
    formdata.append("upload_preset", "sicsqfql");
    let res = undefined;
    fetch("https://api.cloudinary.com/v1_1/dyimxwdfv/video/upload", {
      method: "POST",
      body: formdata,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        res = result;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    fetch("http://127.0.0.1:8000/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(res),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

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
      {youtubeVideos?.length > 0 && (
        <div className="mt-[30px] w-full">
          <h3 className="text-base font-[700]">My Youtube Videos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-[20px]">
            {youtubeVideos.map((item, index) => (
              <YTVideoItem
                data={item.snippet}
                onClick={() => onChangePage(2, item)}
                key={index}
              />
            ))}
          </div>
        </div>
      )}
      {translatedVideo.length > 0 && (
        <div className="mt-[30px] w-full">
          <h3 className="text-base font-[700]">Translated Videos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-[20px]">
            <div className="cursor-pointer" onClick={onOpenFile}>
              <div className="w-full aspect-video rounded-md bg-slate-300 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                >
                  <path
                    d="M18.333 21.6666H8.33301V18.3333H18.333V8.33325H21.6663V18.3333H31.6663V21.6666H21.6663V31.6666H18.333V21.6666Z"
                    fill="black"
                    fillOpacity="0.6"
                  />
                </svg>
              </div>
              <div className="flex justify-between mt-[10px]">
                <h4 className="text-base font-[700]">Translate video</h4>
              </div>
            </div>
            {translatedVideo.map((item, index) => (
              <TranslationItem data={item} key={index} />
            ))}
          </div>
        </div>
      )}
      <input
        type="file"
        name="upload"
        id="upload"
        className="hidden"
        onChange={handleUpload}
      />
    </div>
  );
}
