import { BetoReach_api } from "api/model_api";
import { useState } from "react";
export default function SuggestPage({ onChangePage, data }) {
    const [loading, setLoading] = useState(false);
    const nextPage = () => {
      if (loading) return;
      setLoading(true);
      const ytLink = `https://www.youtube.com/watch?v=${data.id}`;
      BetoReach_api.createShortVideo(ytLink)
      .then((res) => {
        setLoading(false);
        if (res) {
          res.video_id = data.id;
          onChangePage(3, res);
        } else {
          window.alert('Server error, please try again later');
        }
      })
    }
    return (
        <div className="flex flex-col">
        <div className="flex flex-col flex-1 mt-[30px]">
          <div className="flex gap-4 items-center mb-[10px]">
            <div
              onClick={() => onChangePage(1, {})}
              className="bg-[#F37B8F] rounded-full size-8 flex items-center justify-center cursor-pointer">
              <img src="/images/white-arrow.svg" alt="" className="size-4" />
            </div>
            <strong>Back</strong>
          </div>
          <div className="flex flex-col gap-4 items-center justify-center">
            <div className="flex flex-col gap-4 border-[1px] border-slate-400 w-full h-[80%] overflow-y-auto rounded-lg px-6 py-5">
                <strong>SOURCE: {data.title}</strong>
                <span>Published Date: <span>
                {new Date(data.publishedAt).toLocaleDateString(
                  "vi-VN"
                )}
              </span></span>
                <iframe 
                  className="h-[100%] aspect-video rounded-lg" 
                  allowFullScreen 
                  src={`https://www.youtube.com/embed/${data.id}`}></iframe>
            </div>
            <div
              onClick={() => nextPage()}
              className="bg-[#F37B8F] flex gap-4 text-white font-bold py-2 px-4 rounded cursor-pointer hover:bg-blue-600">
              <img
              hidden={!loading}
               className="size-4"
               src="https://upload.wikimedia.org/wikipedia/commons/a/ad/YouTube_loading_symbol_3_%28transparent%29.gif"></img>
              SUGGEST
            </div>
          </div>
        </div>
      </div>
    )
}