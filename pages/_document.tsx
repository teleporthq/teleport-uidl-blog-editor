import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet()
    const page = renderPage((App) => (props) => sheet.collectStyles(<App {...props} />))
    const styleTags = sheet.getStyleElement()
    return { ...page, styleTags }
  }

  render() {
    return (
      <Html lang="en">
        <Head>{this.props.styleTags}</Head>
        <body>
          <Main />
          <NextScript />
          <script
            defer
            src="https://unpkg.com/react@16.8.0/umd/react.production.min.js"
            type="text/javascript"
          />
          <script
            defer
            src="https://unpkg.com/react-dom@16.8.0/umd/react-dom.production.min.js"
            type="text/javascript"
          />
        </body>
      </Html>
    )
  }
}
export default MyDocument
