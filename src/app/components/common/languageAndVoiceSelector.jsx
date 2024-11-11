
  
const availableLanguage = [
    { language: "Vietnamese", languageCode: "vi" },
    { language: "English", languageCode: "en" },
    { language: "Spanish", languageCode: "es" },
    { language: "French", languageCode: "fr" },
    { language: "German", languageCode: "de" },
    { language: "Italian", languageCode: "it" },
    { language: "Portuguese", languageCode: "pt" },
    { language: "Polish", languageCode: "pl" },
    { language: "Turkish", languageCode: "tr" },
    { language: "Russian", languageCode: "ru" },
    { language: "Dutch", languageCode: "nl" },
    { language: "Czech", languageCode: "cs" },
    { language: "Arabic", languageCode: "ar" },
    { language: "Chinese", languageCode: "zh-cn" },
    { language: "Japanese", languageCode: "ja" },
    { language: "Hungarian", languageCode: "hu" },
    { language: "Korean", languageCode: "ko" },
    { language: "Hindi", languageCode: "hi" },
];
  
export function LanguagesSelection({ languages, confirm }) {
    return (
      <div className="absolute bottom-0 translate-y-1/2 left-full flex flex-col mt-2 h-[130px] bg-white shadow-lg overflow-y-scroll hover:*:bg-[#F37B8F26] hover:*:text-red-600 *:cursor-pointer">
        {languages.map((language) => (
        <span
            className=" text-black rounded-md px-2 py-1 text-[12px] "
            key={language.languageCode}
            onClick={confirm.bind(null, language)}>
            {language.language}
        </span>
        ))}
      </div>
    );
  }
  
export function popupConfirmUpload({ data, setRequiredConfirm, onAgree }) {
    return (
      <div className="w-full p-2 absolute top-full left-0 mt-2 flex flex-col items-center bg-white shadow-lg z-10">
        <strong className="text-black">
          Translate video to{" "}
          <span className="text-red-600">{data.language?.language}</span> with{" "}
          <span className="text-red-600">{data.voice || "Selected Voice"}</span>{" "}
          voice
        </strong>
        <div className="flex gap-2 mt-2">
          <button
            className="bg-[#F37B8F] text-white rounded-md px-2 py-1 text-[12px]"
            onClick={onAgree}>
            Yes
          </button>
          <button
            onClick={() => {
              setRequiredConfirm(false);
            }}
            className="bg-[#D9D9D9] text-black rounded-md px-2 py-1 text-[12px]">
            No
          </button>
        </div>
      </div>
    );
  }