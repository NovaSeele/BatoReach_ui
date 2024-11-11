// item frame for translated video
import { CONSTANTS } from "common/constants";

export default function TranslationItem({ data, onClick }) {
  const thumbnail = data.video_id? `https://img.youtube.com/vi/${data.video_id}/0.jpg` : CONSTANTS.noThumbnailImage;
  return (
    <div className="flex flex-col cursor-pointer" onClick={onClick}>
      <img
        src={thumbnail}
        alt="img"
        className="w-full aspect-video rounded-md object-cover"
      />
      <strong className="text-black text-[14px] font-[600] line-clamp-1 mt-[7px]">
        {data.video_title || "No title"}
      </strong>
      <span className="text-slate-600 font-[400] text-[10px]">
        Voice: {data.video_voice || "No voice"} <br />
        Language: {data.video_language || "No language"} <br />
        Date created: {data.date_created || "No date"}
      </span>
    </div>
  );
}
