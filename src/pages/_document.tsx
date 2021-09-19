/* eslint-disable @next/next/no-title-in-document-head */
import Document, { Html, Head, NextScript, Main } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="pt-br">
        <Head>
          <meta charSet="utf-8" />
          <meta name="theme-color" content="#fff" />
          <meta
            name="description"
            content="Uma dashboard para acompanhar seus alunos!"
          />
          <meta
            name="keywords"
            content="Uma dashboard para acompanhar seus alunos!"
          />
          <meta property="og:title" content="students.dash" />
          <meta property="og:type" content="website" />
          <meta
            property="og:url"
            content="https://students-dash.netlify.app/"
          />
          <meta
            property="og:description"
            content="Uma dashboard para acompanhar seus alunos!"
          />
          <meta name="robots" content="index, follow" />
          <meta property="og:locale" content="pt-BR" />
          <meta property="og:site_name" content="students.dash" />
          <meta
            property="og:url"
            content="https://students-dash.netlify.app/"
          />
          <meta property="twitter:title" content="students.dash" />
          <meta
            property="twitter:description"
            content="Uma dashboard para acompanhar seus alunos!"
          />
          <meta
            property="twitter:site"
            content="https://students-dash.netlify.app/"
          />
          <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
