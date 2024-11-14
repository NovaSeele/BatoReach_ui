import React, { useState } from "react";

export default function DurationBar({ setDuration }) {
  const [hover, setHover] = useState(0);
  const [durationValue, setDurationValue] = useState(0);
  return (
    <div className="mt-[15px] relative w-[95%]">
      <hr id="duration_bar" className=" border-black" />
      {[0, 10, 20, 32, 45, 60].map((item, index) => (
        <div
          onMouseEnter={() => setHover(item)}
          className="relative cursor-pointer"
          key={index}
          onMouseLeave={() => setHover(durationValue)}
          onClick={() => {
            setDurationValue(item);
            setDuration(item);
          }}
        >
          <div
            key={index}
            className={`absolute -translate-y-1/2 rounded-full size-4 ${
              item <= hover ? "bg-[#F37B8F]" : "bg-slate-400"
            }`}
            style={{ left: `${(item / 60) * 100}%` }}
          ></div>
          <div
            className={`absolute ${item > 0 ? "left-[-50%]" : "left-0"}`}
            style={{ left: `${(item / 60) * 100}%`, top: "20px" }}
          >
            {item}s
          </div>
        </div>
      ))}
    </div>
  );
}
