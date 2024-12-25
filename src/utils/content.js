const GOOGLE_API_Key = "AIzaSyDGIltbGzdw3u-igQS0PnVlhaVfCOnODIY";

export const YOUTUBE_VIDEOS_API = 
  "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&key=" + GOOGLE_API_Key;

export const YOUTUBE_SEARCH_API = "http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=";