import { CONSTANTS } from "common/constants";

export default function ShortsItem({ data, onClick }) {
  const thumbnail = data.video_id ? `https://img.youtube.com/vi/${data.video_id}/0.jpg` : CONSTANTS.noThumbnailImage;
  return (
    <div className="flex flex-col cursor-pointer" onClick={onClick}>
      <img
        src={thumbnail}
        alt="img"
        className="w-full aspect-[9/16] rounded-md object-cover"
      />
      <strong className="text-black text-[14px] font-[600] line-clamp-1 mt-[7px]">
        {data.music_name || "No music"}
      </strong>
      <span className="text-slate-600 font-[400] text-[10px]">
        Duration: {data.shorts_duration || "No duration"}
      </span>
    </div>
  );
}
