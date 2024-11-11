import axios from "axios"

const base_url = "https://662f-123-30-177-118.ngrok-free.app"

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
    createShortVideo: async (video_info) => {
        axios.post(`${base_url}/short_video`, video_info)
    }
}