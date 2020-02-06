import React, { useState, useContext } from 'react'
import Modal from 'react-modal'
import styled, { ThemeContext } from 'styled-components'
import { Theme } from '../../utils/types'
import { slugify } from '../../utils/helpers'
import { SecondaryButton, PrimaryButton } from '../../utils/styles'

const customStyle: ReactModal.Styles = {
  overlay: {
    zIndex: 10,
  },
  content: {
    textAlign: 'center',
    color: '#000',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    borderRadius: '4px',
    transform: 'translate(-50%, -50%)',
  },
}

const FileSystem = ({ files, activeFile, setActive, setFiles }) => {
  const theme: Theme = useContext(ThemeContext)
  const [isModalOpen, setModalStatus] = useState(false)
  const [fileName, setFileName] = useState('')

  const handleCreateFile = () => {
    const id = Date.now()
    const newFiles = {
      ...files,
      [id]: {
        id,
        name: fileName,
        slug: slugify(fileName),
        content: '',
      },
    }
    setFiles(newFiles)
    setModalStatus(false)
  }

  return (
    <>
      <FilesWrapper {...theme}>
        <SecondaryButton {...theme} onClick={() => setModalStatus(true)}>
          Add Page
        </SecondaryButton>
        <Modal isOpen={isModalOpen} style={customStyle} ariaHideApp={false}>
          <section>
            <FileNameWrapper
              name="File Name"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              placeholder="Please enter file name"
            />
            <PrimaryButton {...theme} onClick={handleCreateFile}>
              Create
            </PrimaryButton>
          </section>
        </Modal>
        {files &&
          Object.keys(files).length > 0 &&
          Object.values(files).map(({ name, id }, index) => {
            return (
              <FileIcon
                key={`${name}-${index}`}
                onClick={() => setActive(id)}
                style={{
                  color: activeFile.id === id ? '#2f3031' : '#fff',
                  backgroundColor: activeFile.id === id ? '#fff' : '#2f3031',
                }}
              >
                {name}
              </FileIcon>
            )
          })}
      </FilesWrapper>
    </>
  )
}

export default FileSystem

const FilesWrapper = styled.section(
  (props: Theme) => `
  width: 350px;
  background-color: ${props.primaryBackground};
  padding: 0px 15px;
`
)

const FileNameWrapper = styled.input`
  font-size: 14px;
  padding: 5px 15px;
`

const FileIcon = styled.div`
  font-size: 14px;
  text-align: left;
  text-transform: capitalize;
  margin-bottom: 10px;
  padding: 5px 10px;
  border-radius: 4px;
  border: 1px solid #ddd;
  cursor: pointer;
`
