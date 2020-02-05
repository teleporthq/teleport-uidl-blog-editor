import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { markdownToHTML } from "../utils/helpers";

import FileSystem from "../components/FileSystem";
import projectTempalte from "../utils/project";
import { generateUIDLNodes } from "../utils/uidl-utils";
import firebase from "firebase";
import fb from "../firebase";
import Resizable from "../components/Resizable";

const CodeEditor = dynamic(import("../components/CodeEditor"), { ssr: false });

const BlogEditor = () => {
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [files, setFiles] = useState(null);
  const [activeFile, setActiveFile] = useState(null);
  const [projectUIDL, updateProjectUIDL] = useState(projectTempalte);

  useEffect(() => {
    // check user status
    fb.app.auth().onAuthStateChanged(user => {
      if (!user) {
        logIn();
        return;
      }

      initUserData();
    });
  }, []);

  useEffect(() => {
    const content = getActiveFile().content;
    if (content) {
      renderMarkdown(content);
    }
  }, [activeFile]);

  const initUserData = async () => {
    // update user info
    setUser({
      email: fb.app.auth().currentUser.email
    });

    // retrieve data
    let files = await fb.getUserFiles();
    if (!files) {
      const id = Date.now();
      files = {
        [id]: {
          id,
          name: "home",
          content: ""
        }
      };
    }

    setFiles(files);
    setActiveFile(Object.keys(files)[0]);
  };

  const getActiveFile = () => (files && activeFile ? files[activeFile] : {});

  const handleEditorValueChange = (newValue: string, name: string, fileId) => {
    console.log(newValue, name, fileId);
    const newFiles = {
      ...files,
      [fileId]: {
        ...files[fileId],
        content: newValue
      }
    };
    setFiles(newFiles);
    fb.updateUserFiles(files);
    const uidl = generateUIDLNodes(newValue, name, projectUIDL);
    updateProjectUIDL(uidl);
    renderMarkdown(newValue);
  };

  const renderMarkdown = (content: string) => {
    const elm = document.getElementById("markdown_render");
    if (elm) {
      elm.innerHTML = String(markdownToHTML(content));
    }
  };

  const logIn = () => {
    fb.app
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(function(user) {
        setUser({
          email: user.user.email
        });
      })
      .catch(function(error) {
        alert("Something went wrong, check your console.");
        console.log(error);
      });
  };

  const signOut = async () => {
    fb.app.auth().signOut();
  };

  return (
    <>
      {/* <header style={{ margin: 10 }}>
        {user ? (
          <span>
            {fb.app.auth().currentUser.displayName} (
            {fb.app.auth().currentUser.email}){" "}
            <button onClick={signOut}>Log out</button>
          </span>
        ) : (
          <button onClick={logIn}>Log In</button>
        )}
      </header> */}
      <section className="main">
        <Resizable minWidth={250} maxWidth={800}>
          <div className="files">
            <div className="menu">
              Blogport
              <span className="icons">
                <img className="arrow" src="refresh.svg"></img>
                <img className="arrow" src="close.svg"></img>
              </span>
            </div>
            <div className="title">
              <img className="arrow" src="arrow-down.svg"></img>Design
              Principles
            </div>
            <FileSystem
              files={files}
              activeFile={getActiveFile()}
              setActive={setActiveFile}
              setFiles={setFiles}
              updateUIDL={updateProjectUIDL}
              uidl={projectUIDL}
            />
          </div>
        </Resizable>
        <Resizable minWidth={400} maxWidth={800}>
          <CodeEditor
            uidl={projectUIDL}
            activeFile={getActiveFile()}
            handleOnChange={handleEditorValueChange}
          />
        </Resizable>
        <div className="render">
          <div className="markdown_render_heading">Markdown</div>
          <div id="markdown_render" className="markdown_renderer"></div>
        </div>
      </section>
      <style jsx>{`
        .main {
          display: flex;
          height: 100%;
        }

        .files {
          flex: 1;
          flex-direction: column;
          display: flex;
          background-color: #2a2e30;
          color: #e2e3e3;
          font-size: 18px;
          font-weight: medium;
        }

        .menu {
          line-height: 76px;
          margin: 0 30px 20px 30px;
          font-size: 24px;
          color: #9fa2a3;
          border-bottom: solid 1px #66696c;
          display: flex;
          justify-content: space-between;
        }

        .menu > span {
          display: flex;
        }

        .title {
          line-height: 32px;
        }

        .arrow {
          padding: 0 9px;
        }
      `}</style>
    </>
  );
};

export default BlogEditor;
