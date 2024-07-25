"use client";
import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => {
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />;
      })}
    </div>
  );
};
const Feed = () => {
  const [searchText, setsearchText] = useState("");
  const [allPost, setAllPost] = useState([]);

  const handleSearchChange = (e) => {};
  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setAllPost(data);
    } catch (error) {
      console.log("Error at Retreiving post", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList data={allPost} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
