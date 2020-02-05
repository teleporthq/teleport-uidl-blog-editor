import React from 'react'
import AceEditor from 'react-ace'
import 'brace/mode/markdown'
import 'brace/theme/monokai'
import 'brace/ext/searchbox'
import { File } from '../../utils/types'

interface CodeEditrProps {
  activeFile: File
  handleOnChange: (value: string, name: string, id: string) => void
}

const CodeEditor = ({ activeFile, handleOnChange }: CodeEditrProps) => {
  const { id, name, content }: File = activeFile

  return (
    <>
      <AceEditor
        mode="markdown"
        name="File Name"
        theme="monokai"
        fontSize={15}
        wrapEnabled
        highlightActiveLine
        onChange={(value) => handleOnChange(value, name, String(id))}
        style={{
          width: '100%',
          height: 'calc(100% - 50px)',
          zIndex: 1,
          fontFamily: "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
        }}
        value={content || ''}
        tabSize={2}
        showPrintMargin={false}
      />
    </>
  )
}

export default CodeEditor
