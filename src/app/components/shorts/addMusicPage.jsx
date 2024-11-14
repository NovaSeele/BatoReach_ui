import { useState } from "react";

const musics = [
    { name: "None", value: "none", src: "" },
    {
      name: "Bones",
      value: "bone",
      src: "/audios/shorts/bone.mp3",
    },
    {
      name: "Rickroll",
      value: "rickroll",
      src: "/audios/shorts/rickroll.mp3",
    },
    {
      name: "Limbo",
      value: "limbo",
      src: "/audios/shorts/limbo.mp3",
    },
    {
      name: "The Bottom 2",
      value: "thebottom2",
      src: "/audios/shorts/thebottom2.mp3",
    },
    {
      name: "Everybody",
      value: "everybody",
      src: "/audios/shorts/everybody.mp3",
    },
  ];

export default function AddMusicPage({data, onChangePage}) {
    console.log(data);
    const [url, setUrl] = useState(`https://www.youtube.com/embed/${data.video_id}`);
    const [startTime, setStartTime] = useState(0);
    const [endTime, setEndTime] = useState(10000);
    const [selectedHighlights, setSelectedHighlights] = useState([]);
    const [loading, setLoading] = useState(false);
    const [audio, setAudio] = useState(null);
    
    const seekTo = (start, end) => {
        setStartTime(start);
        setEndTime(end);
        setUrl(`https://www.youtube.com/embed/${data.video_id}?start=${Math.round(start)}&autoplay=1`);
    }

    const checkBox = (e) => {
        if (e.target.checked) {
            setSelectedHighlights([...selectedHighlights, e.target.value]);
        } else {
            setSelectedHighlights(selectedHighlights.filter((highlight) => highlight !== e.target.value));
        }
    }

    const submit = () => {
        console.log('submit', selectedHighlights);
    }
    
    return (
        <div>
            <iframe
                id="add-music-video"
                className='my-[10px] rounded-lg aspect-video mx-auto' 
                width="800" 
                height="600" 
                src={url} 
                title="YouTube video player">
            </iframe>
        <div className="flex cols gap-10 w-[100%] border-t-4 border-t-blue-500 p-4">
            <div className="flex-[3] outline p-2">
                <strong>HIGHLIGHT</strong>
                {data.time_stamps.map((highlight, index) => (
                    <div 
                    key={index} className="flex gap-4 items-center">
                        <input type="checkbox" onChange={checkBox} value={index}/>
                        <div 
                        className="hover:bg-gray-200 hover:underline cursor-pointer p-2 rounded"
                        onClick={() => seekTo(highlight[0][0], highlight[0][1])}>
                            <span>Start: {highlight[0][0]} - End: {highlight[0][1]}</span>
                        </div>
                    </div>
                ))}

                <strong>MUSIC</strong>
                {musics.map((music, index) => (
                    <div key={index} className="flex gap-4 items-center">
                        <input type="radio" name="music" value={music.value}/>
                        <span>{music.name}</span>
                        <audio id={`music-player-${index}`} src={music.src}></audio>
                        <button onClick={() => {
                            if(audio != null) audio.end()
                            const audioEle = document.getElementById(`music-player-${index}`)
                            setAudio(audioEle)
                            audioEle.play()
                        }
                        }>Play</button>
                    </div>
                ))}

                <div
                    onClick={submit}
                    className="bg-[#F37B8F] flex gap-4 text-white font-bold py-2 px-4 rounded cursor-pointer hover:bg-blue-600">
                    <img
                    hidden={!loading}
                    className="size-4"
                    src="https://upload.wikimedia.org/wikipedia/commons/a/ad/YouTube_loading_symbol_3_%28transparent%29.gif"></img>
                    CONFIRM
                </div>
            </div>
            <div className="flex-[7] outline p-2">
                <strong>TRANSCRIPT</strong>
                {data.transcript.map((transcript, index) => (
                    <div key={index} 
                    className={(startTime >= transcript[0][0] && endTime <= transcript[0][1]) ? "flex gap-4 items-center bg-[pink]" : "flex gap-4 items-center"} >
                        <span>{transcript[0][0]} - {transcript[0][1]}: {transcript[1]}</span>
                    </div>
                ))}
            </div>
        </div>
        </div>
    )
}