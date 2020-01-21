import React from "react";
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
          }
          #__next {
            height: 100%;
            width: 100%;
          }
        `}
      </style>
    </>
  );
};

export default Home;
