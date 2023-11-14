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
          <title>TWO MOONS</title>
          <meta
            content="Two Moons is a unique blockchain based RPG gaming experience."
            name="Two Moons"
          />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="TWO MOONS" />
          <meta
            name="twitter:description"
            content="Two Moons is a unique on-chain RPG gaming experience."
          />
          <meta
            name="twitter:image"
            content="http://twomoons.app/images/preview.png"
          />
          <link href="/favicon.ico" rel="icon" />

          <link
            href="https://fonts.googleapis.com/css2?family=Krona+One&family=Poppins:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />

          <meta charSet="UTF-8" />
          <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          {/* <title>[[TWO MOONS]]</title> */}
          <meta
            name="description"
            content="Two Moons is a unique blockchain based gaming experience."
          />

          {/* <!-- Facebook Meta Tags --> */}
          <meta property="og:url" content="" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Unnamed template" />
          <meta
            property="og:description"
            content="Two Moons is a unique blockchain based gaming experience."
          />
          <meta property="og:image" content="" />

          {/* <!-- Twitter Meta Tags --> */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta property="twitter:domain" content="unnamed.com" />
          <meta property="twitter:url" content="" />
          <meta name="twitter:title" content="Unnamed template" />
          <meta
            name="twitter:description"
            content="Two Moons is a unique blockchain based gaming experience."
          />
          <meta name="twitter:image" content="" />

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
