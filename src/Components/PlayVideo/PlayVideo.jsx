import React, { useEffect, useState } from "react";

import "./PlayVideo.css";

import like from "../../assets/like.png";
import dislike from "../../assets/dislike.png";
import share from "../../assets/share.png";
import save from "../../assets/save.png";
import { API_KEY, value_converter } from "../../data";
import moment from "moment";
import { useParams } from "react-router";

function PlayVideo() {

  const {videoId} = useParams()

  const [data, setData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [commentData, setCommentData] = useState(null);

  const fetchData = async () => {
    try {
      const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
      const response = await fetch(videoList_url);
      const data = await response.json();

      setData(data.items[0]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchChanelData = async () => {
    try {
      const chanelData_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${data.snippet.channelId}&key=${API_KEY}`;
      const response = await fetch(chanelData_url);
      const channel = await response.json();

      const comment_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_KEY}`;
      const responseComment = await fetch(comment_url);
      const comments = await responseComment.json();

      setChannelData(channel.items[0]);
      setCommentData(comments.items);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [videoId]);

  useEffect(() => {
    fetchChanelData();
  }, [data]);

  return (
    <div className="play-video">
      {/* <video src={video1} controls autoPlay muted></video> */}

      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>

      <h3>{data ? data.snippet.title : "Title Here"}</h3>
      <div className="play-video-info">
        <p>
          {data ? value_converter(data.statistics.viewCount) : "0"} Views &bull;
          {data ? moment(data.snippet.publishedAt).fromNow() : "1 day ago"}
        </p>
        <div>
          <span>
            <img src={like} alt="" />{" "}
            {data ? value_converter(data.statistics.likeCount) : "Title Here"}
          </span>
          <span>
            <img src={dislike} alt="" />
          </span>
          <span>
            <img src={share} alt="" /> Share
          </span>
          <span>
            <img src={save} alt="" /> Save
          </span>
        </div>
      </div>

      <hr />

      <div className="publisher">
        <img
          src={channelData ? channelData.snippet.thumbnails.default.url : ""}
          alt=""
        />
        <div>
          <p>{data ? data.snippet.channelTitle : ""}</p>
          <span>
            {channelData
              ? value_converter(channelData.statistics.subscriberCount)
              : ""}
          </span>
        </div>
        <button>Subscribe</button>
      </div>
      <div className="video-description">
        <p>
          {data ? data.snippet.description.slice(0, 255) : "Video Description"}
        </p>

        <hr />
        <h4>
          {data ? value_converter(data.statistics.commentCount) : ""} Comments
        </h4>

        {commentData &&
          commentData.map((comment, index) => {
            return (
              <div key={index} className="comment">
                <img src={comment.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
                <div>
                  <h3>
                    {comment.snippet.topLevelComment.snippet.authorDisplayName} <span>1 day ago</span>
                  </h3>
                  <p>
                   {comment.snippet.topLevelComment.snippet.textDisplay}
                  </p>
                  <div className="comment-action">
                    <img src={like} alt="" />
                    <span>  {value_converter(comment.snippet.topLevelComment.snippet.likeCount)}</span>
                    <img src={dislike} alt="" />
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default PlayVideo;
