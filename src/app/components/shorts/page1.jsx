import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { getVideosList } from 'api/api';
import { CONSTANTS } from 'common/constants';
import YTVideoItem from 'components/common/ytVideoItem';
import TranslationItem from 'components/common/translationItem';

export default function Page1({ onChangePage }) {
    const { data: session, status, update } = useSession();
    const user = session?.user;

    const [youtubeVideos, setYoutubeVideos] = useState([]);
    const [translatedVideo, setTranslatedVideo] = useState([]);
    const [youtubeLink, setYoutubeLink] = useState('');

    useEffect(() => {
        if (user) {
            for (const playlistId of user.play_list_id) {
              fetch(`${CONSTANTS.yt_api}${playlistId}&maxResults=25`, {
                method: "GET",
              })
                .then((response) => response.json())
                .then((result) => {
                  setYoutubeVideos(...youtubeVideos, result.items);
                });
            }

            const videoIds = user.video_ids;
            getVideosList(videoIds)
            .then((videos) => {
                setTranslatedVideo(videos); // Set video list
            })
            .catch((err) => {
                window.alert("Failed to fetch user data", err);
            });
        }

    }, []);

    const selectVideoLink = () => {
        onChangePage(2, youtubeLink.split('v=')[1]);
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
                    <button onClick={selectVideoLink} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">OK</button>
                </div>}
            <div>
                <h3 className="text-base font-[700]">Videos From My Channel</h3>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-[20px]'>
                    {youtubeVideos.map((item, index) => (
                    <YTVideoItem
                    data={item.snippet}
                    onClick={() => onChangePage(2, item.snippet.resourceId.videoId)}
                    key={index}
                    />
                    ))}
                </div>
            </div>
            <div>
                <br></br><h3 className="text-base font-[700]">My Translated Video (TESTING)</h3>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-[20px]'>
                    {translatedVideo.map((item, index) => (
                    <TranslationItem
                    data={item}
                    onClick={() => onChangePage(2, item.video_id)}
                    key={index}
                    />
                    ))}
                </div>
            </div>
        </div>
    )
}