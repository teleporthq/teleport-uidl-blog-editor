import React from 'react'
import { ThemeProvider } from 'styled-components'
import BlogEditor from './blog_editor'
import { Dark } from '../utils/themes'

const Home = () => {
  return (
    <>
      <ThemeProvider theme={Dark}>
        <BlogEditor />
      </ThemeProvider>
      <style jsx global>
        {`
          html,
          body {
            width: 100%;
            height: 100%;
            margin: 0px;
            font-family: 'Helvetica Neue';
          }

          #__next {
            height: 100%;
            width: 100%;
          }
        `}
      </style>
    </>
  )
}

export default Home
