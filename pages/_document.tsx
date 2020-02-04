import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            href="https://fonts.googleapis.com/css?family=Lato&display=swap"
            rel="stylesheet"
          />
          <script
            src="https://unpkg.com/react@16.8.0/umd/react.production.min.js"
            type="text/javascript"
          />
          <script
            src="https://unpkg.com/react-dom@16.8.0/umd/react-dom.production.min.js"
            type="text/javascript"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
export default MyDocument
