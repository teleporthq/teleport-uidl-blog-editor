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
        </Head>
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
