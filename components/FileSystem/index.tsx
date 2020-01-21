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
        <img src="./teleport-logo-dark.svg" className="logo" />
        <button
          className="secondary_button"
          onClick={() => setModalStatus(true)}
        >
          + Create File
        </button>
        <hr />
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
                className="file_icon"
                key={`${name}-${index}`}
                onClick={() => setActive(id)}
                style={{
                  color: activeFile.id === id ? "#2f3031" : "#fff",
                  backgroundColor: activeFile.id === id ? "#fff" : "#2f3031"
                }}
              >
                {name}
              </div>
            );
          })}
      </section>

      <style jsx>{`
        .filename_wrapper {
          font-size: 14px;
          padding: 5px 15px;
        }

        .secondary_button {
          cursor: pointer;
          border: 1px solid #fff;
          line-height: 1.5;
          width: 100%;
          margin: 10px 0px;
          font-size: 14px;
          color: #fff;
          background-color: #2f3031;
          border-radius: 4px;
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
        }

        .file_icon {
          font-size: 14px;
          text-align: left;
          text-transform: capitalize;
          margin-bottom: 10px;
          padding: 5px 10px;
          border-radius: 4px;
          border: 1px solid #ddd;
          cursor: pointer;
        }

        .files_wrapper {
          color: #fff;
          background-color: #2f3031;
          padding: 0px 15px;
          border-right: 0.1px solid #ddd;
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
