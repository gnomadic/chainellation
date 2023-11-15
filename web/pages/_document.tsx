import Document, { Html, Head, Main, NextScript } from "next/document";
import { useAccount } from "wagmi";

class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html className="scroll-smooth">
        <Head>
          <meta
            content="Chainellation is a generative art project on the blockchain."
            name="Chainellation"
          />

          <link href="/favicon.ico" rel="icon" />

          <meta charSet="UTF-8" />
          <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta
            name="description"
            content="Chainellation is a generative art project on the blockchain."
          />

          {/* <!-- Facebook Meta Tags --> */}
          <meta property="og:url" content="" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Chainellation" />
          <meta
            property="og:description"
            content="Chainellation is a generative art project on the blockchain."
          />
          <meta
            property="og:image"
            content="http://www.chainellation.com/images/preview.png"
          />

          {/* <!-- Twitter Meta Tags --> */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Chainellation" />
          <meta
            name="twitter:description"
            content="Chainellation is a generative art project on the blockchain."
          />
          <meta
            name="twitter:image"
            content="http://www.chainellation.com/images/preview.png"
          />

          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;700&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Kdam+Thmor+Pro&display=swap"
            rel="stylesheet"
          ></link>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
