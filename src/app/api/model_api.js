import axios from "axios"

const base_url = "https://b38a-116-97-117-125.ngrok-free.app"

export const BetoReach_api = {
    translate: async (video_info) => {
        axios.get(`${base_url}/translate`, {
            params: video_info
        })
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
    }
}