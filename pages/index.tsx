import React, { useEffect } from "react";
import BlogEditor from "./blog_editor";

const Home = () => {
  return (
    <>
      <BlogEditor />
      <style jsx global>
        {`
          html,
          body {
            width: 100%;
            height: 100%;
            margin: 0px;
            font-family: "Lato", sans-serif;
          }

          #__next {
            height: 100%;
            width: 100%;
          }

          .secondary_button {
            cursor: pointer;
            border: 1px solid #fff;
            line-height: 1.5;
            width: auto;
            margin: 10px 0px;
            padding: 5px 15px;
            font-size: 14px;
            color: #fff;
            background-color: #2f3031;
            border-radius: 4px;
            text-decoration: none;
          }

          .primary_button {
            cursor: pointer;
            border: 1px solid #2f3031;
            line-height: 1.5;
            width: auto;
            padding: 5px 15px;
            margin: 10px 0px;
            font-size: 14px;
            color: #fff;
            background-color: #2f3031;
            text-decoration: none;
          }
        `}
      </style>
    </>
  );
};

export default Home;
