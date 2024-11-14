import TranslationItem from "components/common/translationItem";
import YTVideoItem from "components/common/ytVideoItem";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { CONSTANTS } from "common/constants";

export default function Page1({ onChangePage }) {
  const [youtubeLink, setYoutubeLink] = useState('');
  const [youtubeVideos, setYoutubeVideos] = useState([]);
  const { data: session, status, update } = useSession();
  const user = session?.user;

  const fetchYoutubePlaylist = async () => {
    if (user) {
      for (const playlistId of user.play_list_id) {
        const response = await fetch(`${CONSTANTS.yt_playlist_api}${playlistId}&maxResults=30`, {method: "GET"})
        const result = await response.json()  
        setYoutubeVideos((prev) => [...prev, ...result.items]);
      } 
    }
  }

  useEffect(() => {
    fetchYoutubePlaylist();
  }, []);

  const selectVideoLink = async () => {
    const video = await fetch(`${CONSTANTS.yt_video_api}${youtubeLink.split('v=')[1]}`, {method: "GET"})
    const result = await video.json()
    if(result.items.length > 0) {
      result.items[0].snippet.resourceId = {videoId: youtubeLink.split('v=')[1]} 
      onChangePage(2, result.items[0])
    } else {
      alert('Invalid video link')
    }    
  }


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

      <div className="my-[10px]">
        <input
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
          placeholder="Paste youtube link here"
          type="text"
          value={youtubeLink}
          onChange={(e) => setYoutubeLink(e.target.value)}
        />
      </div>
      {youtubeLink !== "" && (
        <div>
          <iframe
            className="mb-[10px]"
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${youtubeLink.split("v=")[1]}`}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
          <button
            onClick={selectVideoLink}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            OK
          </button>
        </div>
      )}

      {youtubeVideos?.length > 0 && (
        <div className="mt-[30px] w-full">
          <h3 className="text-base font-[700]">My Youtube Videos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-[20px]">
            {youtubeVideos.map((item, index) => (
              <YTVideoItem
                data={item.snippet}
                onClick={() => {
                  onChangePage(2, {
                    ...item,
                    type: "Youtube link",
                    use_captions: false,
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
