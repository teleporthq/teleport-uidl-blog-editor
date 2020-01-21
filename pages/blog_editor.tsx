import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import marked from "marked";

import FileSystem from "../components/FileSystem";
import projectTempalte from "../utils/project";
import { generateUIDLNodes } from "../utils/uidl-utils";

const CodeEditor = dynamic(import("../components/CodeEditor"), { ssr: false });

const BlogEditor = () => {
  const [files, setFiles] = useState(null);
  const [activeFile, setActiveFile] = useState(null);
  const [projectUIDL, updateProjectUIDL] = useState(projectTempalte);

  useEffect(() => {
    const id = Date.now();
    const files = {
      [id]: {
        id: id,
        name: "Home",
        content: ""
      }
    };
    setFiles(files);
    setActiveFile(id);
  }, []);

  const getActiveFile = () => (files ? files[activeFile] : {});

  const handleEditorValueChange = (newValue: string, name: string, fileId) => {
    const newFiles = {
      ...files,
      [fileId]: {
        ...files[fileId],
        content: newValue
      }
    };
    setFiles(newFiles);
    const uidl = generateUIDLNodes(newValue, name, projectUIDL);
    updateProjectUIDL(uidl);
    const elm = document.getElementById("markdown_render");
    if (elm) {
      elm.innerHTML = marked(newValue);
    }
  };

  return (
    <>
      <section className="grid_wrapper">
        <FileSystem
          files={files}
          activeFile={getActiveFile()}
          setActive={setActiveFile}
          setFiles={setFiles}
          updateUIDL={updateProjectUIDL}
          uidl={projectUIDL}
        />
        <section>
          <CodeEditor
            uidl={projectUIDL}
            activeFile={getActiveFile()}
            handleOnChange={handleEditorValueChange}
          />
        </section>
        <section>
          <div className="markdown_render_heading">
            Markdown is rendered here
          </div>
          <div id="markdown_render" className="markdown_renderer"></div>
        </section>
      </section>
      <style jsx>{`
        .grid_wrapper {
          height: 100%;
          display: grid;
          grid-template-columns: 150px 50% 38%;
        }

        .markdown_renderer {
          padding: 5px;
        }

        .markdown_render_heading {
          margin: 10px;
          padding-bottom: 5px;
          text-align: left;
          font-size: 20px;
          border-bottom: 1px dotted #000;
        }
      `}</style>
    </>
  );
};

export default BlogEditor;
