import React from "react";
import AceEditor from "react-ace";

import "brace/mode/markdown";
import "brace/theme/monokai";
import "brace/ext/searchbox";

const CodeEditor = ({ activeFile, handleOnChange, uidl }) => {
  const { id, name, content } = activeFile;

  // const handlePackProject = async () => {
  //   const packer = createProjectPacker();
  //   packer.setTemplate(ReactTemplate);
  //   packer.setGenerator(createReactProjectGenerator());
  //   packer.setPublisher(createCodesandboxPublisher());
  //   const project = await packer.pack(uidl as ProjectUIDL);
  //   window.open(project.payload, "_blank");
  // };

  return (
    <>
      <section className="header_wrapper">
        <div className="pageTitle">{name}</div>
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
          backgroundColor: "#24272A",
          width: "100%",
          height: "calc(100% - 50px)",
          zIndex: 1,
          color: "#E2E3E3",
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
            background-color: #24272a;
          }
          .pageTitle {
            font-size: 24px;
            color: #e2e3e3;
            margin: 0 30px 20px 30px;
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
