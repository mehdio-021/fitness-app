import axios from "axios";

export const BASE_URL = "https://exercisedb.p.rapidapi.com";
export const YOUTUBE_BASE_URL = "https://youtube-search-and-download.p.rapidapi.com"

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": import.meta.env.VITE_APP_RAPID_API_KEY,
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
  },
};
const youtubeOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': import.meta.env.VITE_APP_YOUTUBE_RAPID_API_KEY,
    'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com'
  }
};


export const fetchData = async (endPoint) => {
  const url = `${BASE_URL}/${endPoint}`;
  return await axios.get(url, options);
};

export const fetchVideoData =  async (endPoint) =>{
  const url = `${YOUTUBE_BASE_URL}/${endPoint}`;
  return await axios.get(url,youtubeOptions)  
}
