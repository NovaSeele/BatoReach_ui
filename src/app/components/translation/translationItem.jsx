export default function TranslationItem({ data, onClick }) {
  data = data || {};
  return (
    <div className="flex flex-col cursor-pointer" onClick={onClick}>
      <img
        src={data.img || ""}
        alt="img"
        className="w-full aspect-video rounded-md object-cover"
      />
      <strong className="text-black text-[14px] font-[600] line-clamp-1 mt-[7px]">
        {data.title || "No title"}
      </strong>
      <span className="text-slate-600 font-[400] text-[10px]">
        Date created: {data.date_created || "No date"}
      </span>
    </div>
  );
}
