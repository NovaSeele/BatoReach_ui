import Banner from "components/common/banner";
import { useState, useEffect } from "react";
import { create_video, getVideos, getCurrentUser } from "api/api";

const characters = [
  { value: "none", name: "Default" },
  { value: "Arisu", name: "アリス", src: "/audios/arisu.mp3" },
  { value: "Obama", name: "Obama", src: "/audios/obama.mp3" },
  { value: "Trump", name: "Trump", src: "/audios/trump.mp3" },
  { value: "Thang Ngot", name: "Thắng (Ngọt)", src: "/audios/thang.mp3" },
  { value: "Yoda", name: "Yoda", src: "/audios/yoda.mp3" },
  { value: "Yukkuri", name: "Yukkuri", src: "/audios/yukkuri.mp3" },
];

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

function LanguagesSelection({ languages, confirm }) {
  return (
    <div className="absolute bottom-0 translate-y-1/2 left-full flex flex-col mt-2 h-[130px] bg-white shadow-lg overflow-y-scroll hover:*:bg-[#F37B8F26] hover:*:text-red-600 *:cursor-pointer">
      {languages.map((language) => (
        <span
          className=" text-black rounded-md px-2 py-1 text-[12px] "
          key={language.languageCode}
          onClick={confirm.bind(null, language)}
        >
          {language.language}
        </span>
      ))}
    </div>
  );
}

function popupConfirmUpload({ data, setRequiredConfirm, onAgree }) {
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
          onClick={onAgree}
        >
          Yes
        </button>
        <button
          onClick={() => {
            setRequiredConfirm(false);
          }}
          className="bg-[#D9D9D9] text-black rounded-md px-2 py-1 text-[12px]"
        >
          No
        </button>
      </div>
    </div>
  );
}

export default function Page2({ onChangePage, data }) {
  // data có type, và toàn bộ snippet
  const [open, setOpen] = useState(false);
  const [currLanguage, setCurrLanguage] = useState("en");
  const [charVoice, setCharVoice] = useState(characters[0]);
  const [loadAudio, setLoadAudio] = useState(false);
  const [loadVideo, setLoadVideo] = useState(false);
  const [requiredConfirm, setRequiredConfirm] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  const [languages, setLanguages] = useState([
    { language: "English", languageCode: "en" },
  ]);

  const [availableTranslations, setAvailableTranslations] = useState([]);
  const [availableLanguages, setAvailableLanguages] = useState([
    { language: "English", languageCode: "en" },
  ]);
  const [availableVoices, setAvailableVoices] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [videoData, setVideoData] = useState(data);
  const [filteredTranslations, setFilteredTranslations] = useState([]);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchAvailableTranslations = async () => {
      try {
        const videoId = data.videoId;
        const translations = await getVideos(videoId);
        setAvailableTranslations(translations);

        // Extract unique languages and voices
        const uniqueLanguages = [
          ...new Set(translations.map((t) => t.video_language)),
        ];
        const uniqueVoices = [
          ...new Set(translations.map((t) => t.video_voice)),
        ];

        // Create arrays of available languages and voices
        const newLanguages = uniqueLanguages.map((lang) => ({
          language: lang,
          languageCode:
            availableLanguage.find((l) => l.language === lang)?.languageCode ||
            lang.toLowerCase(),
        }));
        const voices = uniqueVoices.map((voice) => ({
          value: voice,
          name: voice,
        }));

        // Update available languages without duplication
        setAvailableLanguages((prevLanguages) => {
          const updatedLanguages = [...prevLanguages];
          newLanguages.forEach((lang) => {
            if (!updatedLanguages.some((l) => l.language === lang.language)) {
              updatedLanguages.push(lang);
            }
          });
          return updatedLanguages;
        });

        setAvailableVoices(voices);

        // Update languages state without duplication
        setLanguages((prevLanguages) => {
          const updatedLanguages = [...prevLanguages];
          newLanguages.forEach((lang) => {
            if (!updatedLanguages.some((l) => l.language === lang.language)) {
              updatedLanguages.push(lang);
            }
          });
          return updatedLanguages;
        });
      } catch (error) {
        console.error("Error fetching available translations:", error);
      }
    };

    fetchAvailableTranslations();
  }, [data.videoId]);

  useEffect(() => {
    // Filter translations based on selected voice, excluding English
    const filtered = availableTranslations.filter(
      (translation) =>
        translation.video_voice === charVoice.value &&
        translation.video_language !== "English"
    );
    setFilteredTranslations(filtered);
  }, [charVoice, availableTranslations]);

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

  const fetchUpdatedData = async () => {
    try {
      const videoId = videoData.videoId;
      const translations = await getVideos(videoId);
      setAvailableTranslations(translations);

      // Extract unique languages and voices
      const uniqueLanguages = [
        ...new Set(translations.map((t) => t.video_language)),
      ];
      const uniqueVoices = [...new Set(translations.map((t) => t.video_voice))];

      // Create arrays of available languages and voices
      const languages = uniqueLanguages.map((lang) => ({
        language: lang,
        languageCode:
          availableLanguage.find((l) => l.language === lang)?.languageCode ||
          lang.toLowerCase(),
      }));
      const voices = uniqueVoices.map((voice) => ({
        value: voice,
        name: voice,
      }));

      setAvailableLanguages(languages);
      setAvailableVoices(voices);

      // Update languages state without duplication
      setLanguages((prevLanguages) => {
        const updatedLanguages = [...prevLanguages];
        languages.forEach((lang) => {
          if (
            !updatedLanguages.some(
              (l) => l.languageCode === lang.languageCode
            )
          ) {
            updatedLanguages.push(lang);
          }
        });
        return updatedLanguages;
      });
    } catch (error) {
      console.error("Error fetching updated data:", error);
    }
  };

  const addLanguage = async (language, voice) => {
    console.log(language, voice);
    setOpen(false);
    setRequiredConfirm(false);
    setIsLoading(true);
    {
      /* http://127.0.0.1:8000/translate
      http://localhost:8888/test/video */
    }
    try {
      const response = await fetch(`
      http://127.0.0.1:8000/translate?url=${`https://www.youtube.com/watch?v=${data.videoId}`}&language=${
        language.language
      }&video_type=${data.videoType}&use_captions=${
        data.useCaptions ? "True" : "False"
      }&voice_name=${voice.value}&video_id=${data.videoId || ""}`);

      const res = await response.json();

      const videoData = {
        video_id: data.videoId,
        video_title: data.videoTitle,
        video_voice: voice.value,
        video_language: language.language,
        video_type: data.videoType,
        video_url: res,
      };

      const createdVideo = await create_video(videoData, user.username); // Pass username here

      if (createdVideo) {
        await fetchUpdatedData();
        setIsLoading(false);
        setCurrLanguage(language.languageCode);
        document.getElementById("player").src = res;
        alert("Video created successfully!");
        setLanguages((prevLanguages) => {
          if (
            !prevLanguages.some(
              (lang) => lang.languageCode === language.languageCode
            )
          ) {
            return [...prevLanguages, language];
          }
          return prevLanguages;
        });
      } else {
        setIsLoading(false);
        alert("Failed to create video. Please try again.");
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error adding language:", error);
      alert("An error occurred while adding the language. Please try again.");
    }
  };

  return (
    <div className="flex flex-col h-[95vh]">
      <Banner label="My Projects">
        <img src="/images/translation_banner.png" alt="" />
      </Banner>
      <div className="flex flex-col flex-1 mt-[30px]">
        <div className="flex gap-4 items-center">
          <div
            className="bg-[#F37B8F] rounded-full size-8 flex items-center justify-center cursor-pointer"
            onClick={onChangePage.bind(null, 1, {})}
          >
            <img src="/images/white-arrow.svg" alt="" className="size-4" />
          </div>
          <strong>Project / Edit</strong>
        </div>
        <div className="flex-1 flex gap-4 mt-8">
          <iframe
            id="player"
            className="h-[80%] aspect-video rounded-lg"
            src={`https://www.youtube.com/embed/${data.videoId}`}
            title="YouTube video player"
            frameBorder="0"
            allowFullScreen
          ></iframe>
          <div className="flex flex-col gap-4 border-[1px] border-slate-400 w-full h-[80%] overflow-y-auto rounded-lg px-6 py-5">
            <button
              onClick={() => {
                onChangePage(3, data);
              }}
              className="w-full rounded-sm text-[#f00] text-[14px] font-[700] py-2 text-center bg-[#F37B8F26]"
            >
              Create short
            </button>
            <div className="flex flex-col">
              <strong className="text-[16px] font-[700]">Title</strong>
              <span>{data.videoTitle}</span>
            </div>
            <div className="flex flex-col">
              <strong className="text-[16px] font-[700]">Date</strong>
              <span>
                {new Date(data.publishedAt).toLocaleDateString("vi-VN")}
              </span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <strong className="text-[16px] font-[700]">Voices</strong>
                {!loadAudio && charVoice.value !== "none" ? (
                  <button
                    className="bg-slate-100 size-6 rounded-md p-1"
                    onClick={() => {
                      const audio = document.getElementById("audio_player");
                      audio.play();
                    }}
                  >
                    <img src="/images/hear.svg" alt="" className="size-4" />
                  </button>
                ) : (
                  <img
                    src="/images/wavesound.gif"
                    className={`size-4 ${
                      charVoice.value === "none" && "hidden"
                    }`}
                  />
                )}
                <audio
                  className="hidden"
                  id="audio_player"
                  src={charVoice.src}
                  onPlay={() => {
                    setLoadAudio(true);
                  }}
                  onEnded={() => {
                    setLoadAudio(false);
                  }}
                />
              </div>
              <select
                className="outline-none mt-2 w-full p-2 border rounded"
                name=""
                id="char"
                value={charVoice.value}
                onChange={(e) => {
                  const selectedVoice = [
                    ...characters,
                    ...availableVoices,
                  ].find((voice) => voice.value === e.target.value);
                  setCharVoice({
                    value: selectedVoice.value,
                    src: selectedVoice.src,
                    name: selectedVoice.name,
                  });
                  setLoadAudio(false);
                }}
              >
                {characters
                  .filter(
                    (character) =>
                      !availableVoices.some(
                        (voice) => voice.value === character.value
                      )
                  )
                  .map((character) => (
                    <option key={character.value} value={character.value}>
                      {character.name}
                    </option>
                  ))}
                {availableVoices.map((voice) => (
                  <option
                    key={voice.value}
                    value={voice.value}
                    className="bg-green-200 text-green-800 font-[600]"
                  >
                    {voice.name} (available)
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <strong className="text-[16px] font-[700]">Languages</strong>
              <div className="flex gap-2 flex-wrap mt-2">
                {languages
                  .filter(
                    (language) =>
                      !filteredTranslations.some(
                        (translation) =>
                          translation.video_language === language.language
                      )
                  )
                  .map((language) => (
                    <span
                      className={`${
                        language.languageCode === currLanguage
                          ? "bg-[#F37B8F26] text-red-600 font-[600]"
                          : "bg-[#D9D9D9] text-black"
                      } rounded-md px-2 py-1 text-[12px] cursor-pointer`}
                      key={language.languageCode}
                      onClick={() => {
                        setCurrLanguage(language.languageCode);
                        setSelectedLanguage(language);
                      }}
                    >
                      {language.language}
                    </span>
                  ))}
                {availableLanguages
                  .filter(
                    (lang) =>
                      !languages.some(
                        (l) => l.languageCode === lang.languageCode
                      ) &&
                      !filteredTranslations.some(
                        (translation) =>
                          translation.video_language === lang.language
                      )
                  )
                  .map((lang, index) => (
                    <span
                      key={`available-${index}`}
                      className="bg-[#F37B8F26] text-red-600 rounded-md px-2 py-1 text-[12px] cursor-pointer"
                      onClick={() => {
                        setCurrLanguage(lang.languageCode);
                        setSelectedLanguage(lang);
                        setLanguages((prevLanguages) => [
                          ...prevLanguages,
                          lang,
                        ]);
                      }}
                    >
                      {lang.language}
                    </span>
                  ))}
                <span
                  onClick={() => setOpen(!open)}
                  className="cursor-pointer relative bg-[#F37B8F] text-white rounded-md px-[10px] flex items-center text-[12px]"
                >
                  +
                  {open && (
                    <LanguagesSelection
                      languages={availableLanguage.filter(
                        (language) =>
                          !languages.find(
                            (l) => l.languageCode === language.languageCode
                          ) &&
                          !filteredTranslations.some(
                            (translation) =>
                              translation.video_language === language.language
                          )
                      )}
                      confirm={(language) => {
                        setSelectedLanguage(language);
                        setLanguages([...languages, language]);
                        setCurrLanguage(language.languageCode);
                        setOpen(false);
                      }}
                    />
                  )}
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <strong className="text-[16px] font-[700]">
                Available Translations for {charVoice.name}
              </strong>
              <div className="flex gap-2 flex-wrap mt-2">
                {filteredTranslations.map((translation, index) => (
                  <span
                    key={index}
                    className="bg-[#F37B8F26] text-red-600 rounded-md px-2 py-1 text-[12px] cursor-pointer"
                    onClick={() => {
                      setCurrLanguage(
                        availableLanguages.find(
                          (l) => l.language === translation.video_language
                        ).languageCode
                      );
                      setCharVoice({
                        value: translation.video_voice,
                        name: translation.video_voice,
                      });
                      document.getElementById("player").src =
                        translation.video_url;
                    }}
                  >
                    {translation.video_language}
                  </span>
                ))}
              </div>
              <span className="relative">
                <button
                  onClick={() => setRequiredConfirm((prevState) => !prevState)}
                  className="mt-6 w-full rounded-sm text-white text-[14px] font-[700] py-2 text-center bg-[#F37B8F]"
                >
                  Create translation
                </button>
                {requiredConfirm &&
                  popupConfirmUpload({
                    data: {
                      language: selectedLanguage,
                      voice: charVoice.name,
                    },
                    setRequiredConfirm: () => {
                      setRequiredConfirm(false);
                    },
                    onAgree: () => {
                      if (selectedLanguage && charVoice) {
                        addLanguage(selectedLanguage, charVoice);
                      } else {
                        alert(
                          "Please select both a language and a voice before creating a translation."
                        );
                      }
                    },
                  })}
              </span>
            </div>
          </div>
        </div>
      </div>
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded-lg flex flex-col items-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#F37B8F]"></div>
            <p className="mt-3 text-[#F37B8F] font-semibold">
              Loading...
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
