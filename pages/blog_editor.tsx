import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
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
            activeFile={getActiveFile()}
            handleOnChange={handleEditorValueChange}
          />
        </section>
        <div>Render the blog design</div>
      </section>
      <style jsx>{`
        .grid_wrapper {
          height: 100%;
          display: grid;
          grid-template-columns: 150px 50% 50%;
        }
      `}</style>
    </>
  );
};

export default BlogEditor;
