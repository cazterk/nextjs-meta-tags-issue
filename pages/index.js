import Head from "next/head";

import imageUrlBuilder from "@sanity/image-url";
import React from "react";

export default function Home({}) {
  return (
    <>
      <Head>
        <title>terklog | home</title>
        <meta
          name="description"
          content="   here to deliver top-notch hot takes on technology, software, and
          everything in between, the terklog aims to be on the path to
          continuous delivery and improvement"
        />
      </Head>

      <div>this is the index page</div>
    </>
  );
}
