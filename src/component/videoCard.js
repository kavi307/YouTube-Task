import React from "react";

const VideoCard = ({ info = {} }) => {
    

    const { snippet = {}, statistics = {} } = info;
    const { channelTitle, title, thumbnails = {} } = snippet;

    return (
        <div className="p-2 m-2 w-72 h-80 shadow-lg">
            <img alt="thumbnail" className="rounded-lg" src={thumbnails.medium?.url || "default-thumbnail.jpg"} />
            <ul>
                <li className="font-bold py-2">{title || "No title available"}</li>
                <li>{channelTitle || "No channel available"}</li>
                <li>Views {statistics.viewCount || 0} </li>
                
            </ul>
        </div>
    );
};

export default VideoCard;
