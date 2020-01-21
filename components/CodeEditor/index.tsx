import React from "react";
import AceEditor from "react-ace";
import { exportJson } from "../../utils/helpers";

import "brace/mode/markdown";
import "brace/theme/monokai";
import "brace/ext/searchbox";

const CodeEditor = ({ activeFile, handleOnChange, uidl }) => {
  const { id, name, content } = activeFile;
  const el = document.getElementById("download_uidl");

  return (
    <>
      <section className="header_wrapper">
        <div className="open_file_name">{name}</div>
        <a
          id="download_uidl"
          className="secondary_button"
          onClick={() => exportJson(el, uidl)}
        >
          Download UIDL
        </a>
        <button className="secondary_button">Download Project</button>
      </section>
      <AceEditor
        mode="markdown"
        name="File Name"
        theme="monokai"
        fontSize={15}
        wrapEnabled
        highlightActiveLine
        onChange={value => handleOnChange(value, name, id)}
        style={{
          width: "100%",
          height: "calc(100% - 50px)",
          zIndex: 1,
          fontFamily:
            "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace"
        }}
        value={content || ""}
        tabSize={2}
        showPrintMargin={false}
      />
      <style jsx>
        {`
          .header_wrapper {
            display: flex;
            justify-content: space-around;
            background-color: #2f3031;
          }

          .open_file_name {
            color: #fff;
            padding-top: 15px;
            padding-left: 25px;
            height: 35px;
          }
        `}
      </style>
    </>
  );
};

export default CodeEditor;
