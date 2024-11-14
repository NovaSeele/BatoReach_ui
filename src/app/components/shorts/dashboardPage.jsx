import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { getShortsList } from 'api/api'; // Assuming you have a similar API function
import ShortsItem from './component/shortsItem';
import { CONSTANTS } from 'common/constants';

export default function DashboardPage({ onChangePage }) {
    const [youtubeLink, setYoutubeLink] = useState("");
    const [shortsList, setShortsList] = useState([]);
    const { data: session, status, update } = useSession();
    const user = session?.user;
    
    const getUserShortsData = () => {
      if (user) {    
        const shortIds = user.short_ids;
        getShortsList(shortIds)
          .then((shorts) => {
            setShortsList(shorts); // Set shorts list
          })
          .catch((err) => {
            window.alert("Failed to fetch user data", err);
          });
      }
    };

    useEffect(() => {
      getUserShortsData();
    }, []);

    const nextPage = async () => {
        const response = await fetch(CONSTANTS.yt_video_api + youtubeLink.split('v=')[1], { method: 'GET' }); 
        const video = await response.json(); 
        const videoData = video.items[0];
        if (videoData) {
            videoData.snippet.id = youtubeLink.split('v=')[1]
            onChangePage(2, videoData.snippet);
        } else {
            window.alert('Invalid youtube link');
        }
    };

    return (
        <div className='m-[20px]'>
            <div className='mb-[10px]'>
                <input 
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500" 
                    placeholder="Paste youtube link here" 
                    type="text" 
                    value={youtubeLink} 
                    onChange={(e) => setYoutubeLink(e.target.value)} 
                />
            </div>
            {(youtubeLink !== '') && 
                <div>
                    <iframe
                        className='mb-[10px]' 
                        width="560" 
                        height="315" 
                        src={`https://www.youtube.com/embed/${youtubeLink.split('v=')[1]}`} 
                        title="YouTube video player" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                    ></iframe>
                    <button onClick={nextPage} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">OK</button>
                </div>
            }
            <div>
                <h3 className="text-base font-[700]">Shorts From My Channel</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-12 mt-[20px]">
                    {shortsList.map((item, index) => (
                        <ShortsItem
                            data={item}
                            onClick={() => {
                                const url = [item.url]
                                onChangePage(4, url)
                            }}
                            key={index}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}