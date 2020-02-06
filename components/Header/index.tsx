import React, { useContext } from 'react'
import { createProjectPacker } from '@teleporthq/teleport-project-packer'
import {
  createReactProjectGenerator,
  ReactTemplate,
} from '@teleporthq/teleport-project-generator-react'
import { createCodesandboxPublisher } from '@teleporthq/teleport-publisher-codesandbox'
import { ProjectUIDL } from '@teleporthq/teleport-types'
import styled, { ThemeContext } from 'styled-components'
import { exportJson } from '../../utils/helpers'
import { Files, BlogMeta, File, Theme } from '../../utils/types'
import { generateProjectUIDL } from '../../utils/uidl-utils'
import { SecondaryButton } from '../../utils/styles'

interface HeaderProps {
  files: Files
  meta: BlogMeta
  activeFile: File
}

const Header = ({ files, meta, activeFile }: HeaderProps) => {
  const theme: Theme = useContext(ThemeContext)
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
      <HeaderWrapper className="header_wrapper">
        <FileName className="open_file_name">{name}</FileName>
        <SecondaryButton {...theme} onClick={exportToSandbox}>
          Sandbox
        </SecondaryButton>
      </HeaderWrapper>
    </>
  )
}

export default Header

const HeaderWrapper = styled.section`
  display: flex;
  justify-content: space-around;
  background-color: #2f3031;
`

const FileName = styled.div`
  color: #fff;
  padding-top: 15px;
  padding-left: 25px;
  height: 35px;
`
