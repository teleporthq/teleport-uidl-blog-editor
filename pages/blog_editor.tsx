import { ProjectUIDL } from '@teleporthq/teleport-types'
import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import firebase from 'firebase'

import Header from '../components/Header'
import FileSystem from '../components/FileSystem'
import { File, Files, BlogMeta } from '../utils/types'
import { generateProjectUIDLTemplate } from '../utils/project'
import preview from '../utils/bundler'
import fb from '../firebase'

const CodeEditor = dynamic(import('../components/CodeEditor'), { ssr: false })

const BlogEditor = () => {
  const [user, setUser] = useState<{ email: string } | null>(null)
  const [files, setFiles] = useState<Files>(null)
  const [activeFile, setActiveFile] = useState<string>(null)
  const [projectMeta, setProjectMeta] = useState<BlogMeta>({
    blogName: 'teleport-blog',
    blogDescription: ' A easy to use and pre-defined blogging setup',
  })
  // useEffect(() => {
  //   // check user status
  //   fb.app.auth().onAuthStateChanged(user => {
  //     if (!user) {
  //       logIn();
  //       return;
  //     }

  //     initUserData();
  //   });
  // }, []);

  useEffect(() => {
    const id = Date.now()
    const updatedFiles: Files = {
      [id]: {
        id,
        name: 'Home',
        slug: 'home',
        home: true,
        content: `# home`,
      },
    }
    setFiles(updatedFiles)
    setActiveFile(String(id))
    preview(`# home`)
  }, [])

  useEffect(() => {
    const file: File = getActiveFile()
    if (file) {
      preview(file.content)
    }
  }, [activeFile])

  const initUserData = async () => {
    // update user info
    setUser({
      email: fb.app.auth().currentUser.email,
    })

    // retrieve data
    let updatedFiles: Files = await fb.getUserFiles()
    if (!files) {
      const id = Date.now()
      updatedFiles = {
        [id]: {
          id,
          name: 'home',
          slug: 'home',
          content: '',
        },
      }
    }
    setFiles(files)
    setActiveFile(Object.keys(files)[0])
  }

  const getActiveFile = () => (files && activeFile ? files[activeFile] : null)

  const handleEditorValueChange = (value: string, pageName: string, fileId: string) => {
    const newFiles = {
      ...files,
      [fileId]: {
        ...files[fileId],
        name: pageName,
        content: value,
      },
    }
    preview(value)
    setFiles(newFiles)
    // fb.updateUserFiles(files);
  }

  const logIn = () => {
    fb.app
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((firebaseUser: any) => {
        setUser({
          email: firebaseUser.user.email,
        })
      })
      .catch((error) => {
        alert('Something went wrong, check your console.')
        console.error(error)
      })
  }

  const signOut = async () => {
    fb.app.auth().signOut()
  }

  return (
    <>
      <header style={{ margin: 10 }}>
        {user ? (
          <span>
            {fb.app.auth().currentUser.displayName} ({fb.app.auth().currentUser.email}){' '}
            <button onClick={signOut}>Log out</button>
          </span>
        ) : (
          <button onClick={logIn}>Log In</button>
        )}
      </header>
      <section className="grid_wrapper">
        <FileSystem
          files={files}
          activeFile={getActiveFile()}
          setActive={setActiveFile}
          setFiles={setFiles}
        />
        <section>
          <Header files={files} meta={projectMeta} activeFile={getActiveFile()} />
          <CodeEditor
            activeFile={getActiveFile()}
            handleOnChange={handleEditorValueChange}
          />
        </section>
        <section>
          <div className="markdown_render_heading">Preview</div>
          <div id="output" className="markdown_renderer"></div>
        </section>
      </section>
      <style jsx>{`
        .grid_wrapper {
          height: 100%;
          display: grid;
          grid-template-columns: 150px 50% 38%;
        }

        .markdown_renderer {
          font-family: 'Roboto', sans-serif;
          color: #2c3e50;
          -webkit-font-smoothing: antialiased;
          font-size: 16px;
          padding: 5px;
        }

        .markdown_render_heading {
          margin: 10px;
          padding-bottom: 5px;
          text-align: left;
          font-size: 20px;
          border-bottom: 1px dotted #000;
        }
      `}</style>
    </>
  )
}

export default BlogEditor
