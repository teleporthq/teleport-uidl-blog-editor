import React from "react";
import AceEditor from "react-ace";

import "brace/mode/markdown";
import "brace/theme/monokai";
import "brace/ext/searchbox";

const CodeEditor = ({ activeFile, handleOnChange }) => {
  const { id, name, content } = activeFile;

  return (
    <>
      <div className="open_file_name">{name}</div>
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
          .open_file_name {
            color: #fff;
            padding-top: 15px;
            padding-left: 25px;
            height: 35px;
            background-color: #2f3031;
          }
        `}
      </style>
    </>
  );
};

export default CodeEditor;
