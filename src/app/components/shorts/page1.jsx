import { useState } from 'react';

export default function Page1({ onChangePage }) {
    const [youtubeVideos, setYoutubeVideos] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState('');
    const [translatedVideo, setTranslatedVideo] = useState([]);
    const [youtubeLink, setYoutubeLink] = useState('');

    const nextPage = () => {
        onChangePage(2, {});
    }
    return (
        <div className='m-[20px]'>
            <div className='mb-[10px]'>
                <input 
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500" 
                    placeholder="Paste youtube link here" 
                    type="text" value={youtubeLink} onChange={(e) => setYoutubeLink(e.target.value)} />
            </div>
            {(youtubeLink !== '') && 
                <div>
                    <iframe
                        className='mb-[10px]' 
                        width="560" 
                        height="315" 
                        src={`https://www.youtube.com/embed/${youtubeLink.split('v=')[1]}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">OK</button>
                </div>}
            <div>
                <h3 className="text-base font-[700]">Videos From My Channel</h3>
            </div>
            <div>
                <h3 className="text-base font-[700]">My Translated Video</h3>
            </div>
        </div>
    )
}