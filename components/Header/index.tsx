import React from 'react'
import { createProjectPacker } from '@teleporthq/teleport-project-packer'
import {
  createReactProjectGenerator,
  ReactTemplate,
} from '@teleporthq/teleport-project-generator-react'
import { createCodesandboxPublisher } from '@teleporthq/teleport-publisher-codesandbox'
import { ProjectUIDL } from '@teleporthq/teleport-types'
import { exportJson } from '../../utils/helpers'
import { Files, BlogMeta, File } from '../../utils/types'
import { generateProjectUIDL } from '../../utils/uidl-utils'

interface HeaderProps {
  files: Files
  meta: BlogMeta
  activeFile: File
}

const Header = ({ files, meta, activeFile }: HeaderProps) => {
  const { name } = activeFile || { name: `` }
  const downloadProjectUIDL = () => {
    const elm = document.getElementById('download_uidl')
    const projectUIDL = generateProjectUIDL(files, meta)
    exportJson(elm, projectUIDL)
  }

  const exportToSandbox = async () => {
    try {
      const projectUIDL = generateProjectUIDL(files, meta)
      const packer = createProjectPacker()
      packer.setTemplate(ReactTemplate)
      packer.setGenerator(createReactProjectGenerator())
      packer.setPublisher(createCodesandboxPublisher())
      const project = await packer.pack(projectUIDL as ProjectUIDL)
      window.open(project.payload, '_blank')
    } catch (e) {
      console.error('Failed in Building Blog')
      throw new Error(e)
    }
  }

  return (
    <>
      <section className="header_wrapper">
        <div className="open_file_name">{name}</div>
        <a id="download_uidl" className="secondary_button" onClick={downloadProjectUIDL}>
          Download UIDL
        </a>
        <button className="secondary_button" onClick={exportToSandbox}>
          Sandbox
        </button>
      </section>
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
  )
}

export default Header
