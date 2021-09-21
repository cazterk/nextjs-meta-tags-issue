import "../styles/_global.scss";
import React from "react";
import Head from "next/head";
import Script from "next/script";
import { useState, useEffect } from "react";

import useDarkMode from "use-dark-mode";
import styled, { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../components/theme";
import Div from "../components/darkMode";

import SEO from "../components/seo";

require("typeface-nunito");

function MyApp({ Component, pageProps }) {
  const [isMounted, setIsMounted] = useState(false);
  const darkMode = useDarkMode(true);
  const theme = darkMode.value ? darkTheme : lightTheme;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      </Head>
      <Script
        strategy="lazyOnload"
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />
      <Script strategy="lazyOnload">
        {" "}
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
                `}
      </Script>
      <React.Fragment>
        <ThemeProvider theme={theme}>
          <Div> {isMounted && <Component {...pageProps} />}</Div>
        </ThemeProvider>
      </React.Fragment>
    </>
  );
}

export default MyApp;
