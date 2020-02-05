import React, { useState } from "react";
import Modal from "react-modal";
import { addRouteToUIDL } from "../../utils/uidl-utils";

const customStyle: ReactModal.Styles = {
  overlay: {
    zIndex: 10
  },
  content: {
    textAlign: "center",
    color: "#000",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    borderRadius: "4px",
    transform: "translate(-50%, -50%)"
  }
};

const FileSystem = ({
  files,
  activeFile,
  setActive,
  setFiles,
  updateUIDL,
  uidl
}) => {
  const [isModalOpen, setModalStatus] = useState(false);
  const [fileName, setFileName] = useState("");
  const [hoverIndex, setHoverIndex] = useState(-1);

  const handleCreateFile = () => {
    const id = Date.now();
    const newFiles = {
      ...files,
      [id]: {
        id,
        name: fileName,
        content: ""
      }
    };
    setFiles(newFiles);
    setModalStatus(false);
    updateUIDL(addRouteToUIDL(fileName, uidl));
  };

  return (
    <>
      <section className="files_wrapper">
        {/* <img src="./teleport-logo-dark.svg" className="logo" /> */}
        {/*  */}
        <Modal isOpen={isModalOpen} style={customStyle} ariaHideApp={false}>
          <section>
            <input
              name="File Name"
              value={fileName}
              onChange={e => setFileName(e.target.value)}
              className="filename_wrapper"
              placeholder="Please enter file name"
            />
            <button className="primary_button" onClick={handleCreateFile}>
              Create
            </button>
          </section>
        </Modal>
        {files &&
          Object.keys(files).length > 0 &&
          Object.values(files).map(({ name, id }, index) => {
            return (
              <div
                className={`file${activeFile.id === id ? " active" : ""}`}
                key={`${name}-${index}`}
                onClick={() => setActive(id)}
                onMouseOver={() => setHoverIndex(id)}
              >
                {name}
                {id !== hoverIndex || <img src="3points.svg" />}
              </div>
            );
          })}
        <button
          className="secondary_button"
          onClick={() => setModalStatus(true)}
        >
          + Add Page
        </button>
      </section>
      <style jsx>{`
        .file {
          color: #e2e3e3;
          padding-left: 40px;
          line-height: 32px;
          user-select: none;
          display: flex;
          justify-content: space-between;
        }

        .file > img {
          padding: 0 10px;
        }

        .active {
          background-color: #66696c;
        }

        .file:not(.active):hover {
          background-color: #66696c;
        }

        .logo {
          width: 125px;
          height: auto;
          margin: 15px 0px;
        }
      `}</style>
    </>
  );
};

export default FileSystem;
