import axios from "axios"

const base_url = "https://b38a-116-97-117-125.ngrok-free.app"

export const BetoReach_api = {
    translate: async (video_info) => {
        console.log('translate api called');
        
        try {
            const response = await axios.get(`${base_url}/translate`, {
                params: {
                    url: `https://www.youtube.com/watch?v=${video_info.videoId}`,
                    language: video_info.language,
                    video_type: video_info.video_type,
                    use_captions: video_info.use_captions ? "True" : "False",
                    voice_name: video_info.voice_name,
                    video_id: video_info.videoId || "",
                },
                headers: {
                    "ngrok-skip-browser-warning": "69420",
                },
            });
            console.log('translate api res', response);
            
            return response.data.cloud_path;
        } catch (error) {
            console.error("Error in translation request:", error);
            throw error;
        }
    },
    getTranscript: async (video_info) => {
        axios.get(`${base_url}/transcript`, {
            params: video_info
        })
    },
    createShortVideo: async (url) => {
        console.log('start', url);
        
        try {
            const res = await axios.get(`${base_url}/short_suggestion?url=${url}`, {
                headers: {
                    "ngrok-skip-browser-warning": "69420"
                }
            })
            console.log('short video', res);
            
            return res.data
        } catch (error) {
            console.log(error);
        }
    },
    cutShort: async (video_info) => {
        console.log('cut short', video_info);
        const jsonStr = JSON.stringify(video_info)

        const formData = new FormData()
        formData.append('data', jsonStr)

        try {
            const res = await axios.post(`${base_url}/cut_shorts`, formData, {
                headers: {
                    "ngrok-skip-browser-warning": "69420"
                }
            }
            );
            console.log('cut short', res);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    }
}