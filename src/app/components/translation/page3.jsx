// Display translated video
"use client";
import { useState } from "react";
import DurationBar from "components/shorts/durationBar";
import { getCurrentUser, create_shorts } from "api/api";
import { useEffect } from "react";

export default function Page3({ data, onChangePage }) {
  const [duration, setDuration] = useState(10);
  const [music, setMusic] = useState(musics[0]);
  const [loadAudio, setLoadAudio] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState({});
  const [user, setUser] = useState(null);
  const [shortsData, setShortsData] = useState({
    short_title: "hello",
    cloud_path: undefined,
    short_description: "Tất cả là tại đậu xanh",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getCurrentUser(token)
        .then((data) => {
          setUser(data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);

  {
    /* http://127.0.0.1:8000/shorts http://localhost:8888/test */
  }
  const generateShorts = async () => {
    setIsLoading(true);
    const res = await fetch(` 
      http://127.0.0.1:8000/shorts?url=${`https://www.youtube.com/watch?v=${data.snippet.resourceId.videoId}`}&video_type=${
      data.type
    }&video_id=${data.videoId}&music_name=${
      music.value
    }&short_duration=${duration}`);
    const result = await res.json();
    setShortsData(result);

    const shortsData = {
      url: result.cloud_path,
      video_type: data.type,
      video_id: data.videoId,
      music_name: music.name,
      shorts_duration: duration,
    };

    const createdShorts = await create_shorts(shortsData, user.username);

    console.log(shortsData);

    if (createdShorts) {
      setIsLoading(false);
      alert("Shorts created successfully!");
    } else {
      alert("Failed to create shorts. Please try again.");
    }
    document.getElementById("player").src = result;
  };

  return (
    <div className="flex flex-col h-[95vh]">
      <div className="flex flex-col flex-1 mt-[30px]">
        <div className="flex gap-4 items-center">
          <div
            onClick={() => onChangePage(1, {})}
            className="bg-[#F37B8F] rounded-full size-8 flex items-center justify-center cursor-pointer">
            <img src="/images/white-arrow.svg" alt="" className="size-4" />
          </div>
          <strong>Back</strong>
        </div>
        <div className="flex-1 flex gap-4 mt-8">
          <div className="flex flex-col gap-4 border-[1px] border-slate-400 w-full h-[80%] overflow-y-auto rounded-lg px-6 py-5">
            <div className="flex flex-col">
              <strong className="text-[16px] font-[700]">Title</strong>
              <span>{data.video_title}</span>
              <strong className="text-[16px] font-[700]">Date</strong>
              <span>
                {new Date(data?.create_date).toLocaleDateString("vi-VN")}
              </span>
            </div>
            <div className="flex flex-row justify-between">
              <div className="flex flex-col">
                <iframe className="h-[100%] aspect-video rounded-lg" allowFullScreen src={data.video_url}></iframe>
                <strong>TRANSLATED</strong>
                <span className="text-[16px] font-[700]">Voice: {data.video_voice}</span>
                <span className="text-[16px] font-[700]">Languge: {data.video_language}</span>
              </div>
              
              <div className="flex flex-col">
                <iframe 
                className="h-[100%] aspect-video rounded-lg" 
                allowFullScreen 
                src={`https://www.youtube.com/embed/${data.video_id}`}></iframe>
                <strong>ORIGINAL</strong>
                <span className="text-[16px] font-[700]">Voice: Original</span>
                <span className="text-[16px] font-[700]">Languge: Original</span>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
