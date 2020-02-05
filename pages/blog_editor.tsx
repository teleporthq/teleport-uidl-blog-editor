import React, { useState, useEffect, useRef, MutableRefObject } from "react";
import dynamic from "next/dynamic";
import { markdownToHTML } from "../utils/helpers";

import FileSystem from "../components/FileSystem";
import projectTemplate from "../utils/project";
import { generateUIDLNodes } from "../utils/uidl-utils";
import firebase from "firebase";
import fb from "../firebase";
import Resizable from "../components/Resizable";
import { exportJson } from "../utils/helpers";

import { createProjectPacker } from "@teleporthq/teleport-project-packer";
import {
  createReactProjectGenerator,
  ReactTemplate
} from "@teleporthq/teleport-project-generator-react";
import { createCodesandboxPublisher } from "@teleporthq/teleport-publisher-codesandbox";
import { ProjectUIDL } from "@teleporthq/teleport-types";

// onClick={() => exportJson(el, uidl)}

const CodeEditor = dynamic(import("../components/CodeEditor"), { ssr: false });

const BlogEditor = () => {
  const downloadUidl: MutableRefObject<HTMLAnchorElement> = useRef(null);
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [files, setFiles] = useState(null);
  const [activeFile, setActiveFile] = useState(null);
  const [projectUIDL, updateProjectUIDL] = useState(projectTemplate);

  const handlePackProject = async () => {
    try {
      const packer = createProjectPacker();
      packer.setTemplate(ReactTemplate);
      packer.setGenerator(createReactProjectGenerator());
      packer.setPublisher(createCodesandboxPublisher());
      const project = await packer.pack(projectUIDL as ProjectUIDL);
      window.open(project.payload, "_blank");
    } catch (error) {
      alert(error.toString());
    }
  };

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
    // console.log(newValue, name, fileId);
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
      <section className="main">
        <Resizable minWidth={250} maxWidth={800}>
          <div className="files">
            <div>
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

            <footer>
              <a
                ref={downloadUidl}
                className="action"
                onClick={() => exportJson(downloadUidl.current, projectUIDL)}
              >
                Download UIDL
              </a>{" "}
              or{" "}
              <a onClick={() => handlePackProject()} className="action">
                Export to Codesandbox
              </a>
              <hr />
              {user ? (
                <span style={{ fontSize: 16 }}>
                  {fb.app.auth().currentUser.displayName} (
                  {fb.app.auth().currentUser.email}){" "}
                  <span className="action" onClick={signOut}>
                    Log out
                  </span>
                </span>
              ) : (
                <span className="action" onClick={logIn}>
                  Log In
                </span>
              )}
            </footer>
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
          justify-content: space-between;
        }

        .action {
          font-size: 16px;
          color: #9fa2a3;
          text-decoration: underline;
          cursor: pointer;
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

        footer {
          margin: 30px;
        }
      `}</style>
    </>
  );
};

export default BlogEditor;
