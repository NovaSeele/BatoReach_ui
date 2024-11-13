import { useState, useEffect } from 'react';
import { getShortsList } from 'api/api'; // Assuming you have a similar API function
import ShortsItem from './Page1Components/shortsItem';
import { useSession } from 'next-auth/react';

export default function Page1({ onChangePage }) {

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
            console.log(shorts, "shorts");
          })
          .catch((err) => {
            window.alert("Failed to fetch user data", err);
          });
      }
    };

    useEffect(() => {
      getUserShortsData();
    }, []);

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
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                    ></iframe>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">OK</button>
                </div>
            }
            <div>
                <h3 className="text-base font-[700]">Shorts From My Channel</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-12 mt-[20px]">
                    {shortsList.map((item, index) => (
                        <ShortsItem
                            data={item}
                            onClick={() => onChangePage(2, item)}
                            key={index}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}