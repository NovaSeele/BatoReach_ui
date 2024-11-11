import { BetoReach_api } from "api/model_api";
export default function Page2({ onChangePage, data }) {
    console.log(data, 'page2');
    
    const nextPage = () => {
        const ytLink = `https://www.youtube.com/watch?v=${data}`;
        const generatedLink = [];
        BetoReach_api.createShortVideo(ytLink).then((res) => {
            console.log(res);
            generatedLink.push(res);
            //onChangePage(3, { data: generatedLink });
        });
        
    }
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
          <div className="flex flex-col gap-4 mt-8 items-center justify-center">
            <div className="flex flex-col gap-4 border-[1px] border-slate-400 w-full h-[80%] overflow-y-auto rounded-lg px-6 py-5">
                <strong>SOURCE</strong>
                <iframe 
                  className="h-[100%] aspect-video rounded-lg" 
                  allowFullScreen 
                  src={`https://www.youtube.com/embed/${data}`}></iframe>
            </div>
            <div
              onClick={() => nextPage()}
              className="bg-[#F37B8F] text-white font-bold py-2 px-4 rounded cursor-pointer hover:bg-blue-600">
              SUGGEST
            </div>
          </div>
        </div>
      </div>
    )
}