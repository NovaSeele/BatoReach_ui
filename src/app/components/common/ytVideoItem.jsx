// Desc: This file contains the component for the youtube video item
import { CONSTANTS } from "common/constants";

export default function YTVideoItem({ data, onClick }) {
  const thumbnail = data.resourceId.videoId ? `https://img.youtube.com/vi/${data.resourceId.videoId}/0.jpg` : CONSTANTS.noThumbnailImage;
  return (
    <div className="flex flex-col cursor-pointer" onClick={onClick}>
      <img
        src={thumbnail}
        alt="img"
        className="w-full aspect-video rounded-md object-cover"
      />
      <strong className="text-black text-[14px] font-[600] line-clamp-1 mt-[7px]">
        {data.title || "No title"}
      </strong>
      <span className="text-slate-600 font-[400] text-[10px]">
        Date created: {data.publishedAt || "No date"}
      </span>
    </div>
  );
}
