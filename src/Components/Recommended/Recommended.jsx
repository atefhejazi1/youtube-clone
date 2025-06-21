import React, { useState, useEffect } from "react";
import "./Recommended.css";
import { API_KEY, value_converter } from "../../data";
import { Link } from "react-router";

function Recommended({ categoryId }) {
  const [apiData, setApiData] = useState([]);

  const fetchData = async () => {
    try {
      // const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&type=video&videoCategoryId=${categoryId}&regionCode=US&key=${API_KEY}`;
      const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&videoCategoryId=${categoryId}&key=${API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.items) {
        setApiData(data.items);
      } else {
        console.error("No items returned:", data);
      }
    } catch (error) {
      console.error("Error fetching related videos:", error);
    }
  };

  useEffect(() => {
    console.log("categoryId:", categoryId);
    if (categoryId) {
      fetchData();
    }
  }, [categoryId]);

  return (
    <div className="recommended">
      {apiData.map((item , index) => (
        <Link  to={`/video/${item.snippet.categoryId}/${item.id}`} className="side-video-list" key={index}>
          <img src={item.snippet.thumbnails.medium.url} alt="" />
          <div className="vid-info">
            <h4>{item? item.snippet.title : ""}</h4>
            <p>{item? item.snippet.channelTitle: ""}</p>
            <p>{item? value_converter(item.statistics.viewCount): ""}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Recommended;
