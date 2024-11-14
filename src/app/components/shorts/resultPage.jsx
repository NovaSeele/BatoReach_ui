export default function ResultPage({data, onChangePage}) {
    
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
                <iframe 
                  className="h-[100%] aspect-video rounded-lg" 
                  allowFullScreen 
                  src={data.url}></iframe>
            </div>
          </div>
        </div>
      </div>
    )

}