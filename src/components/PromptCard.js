"use client";
import React from "react";

const PromptCard = ({ post, handleTagClick }) => {
  console.log("post", post);
  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div>Image</div>
        <div>Username</div>
        <div>EMail</div>
      </div>
    </div>
  );
};

export default PromptCard;
