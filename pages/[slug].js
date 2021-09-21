import imageUrlBuilder from "@sanity/image-url";
import Head from "next/head";
import Layout from "../../components/layout";

import React, { useState, useEffect } from "react";

const Post = ({ pageSlug, title, body, image, date, excerpt }) => {
  const [imageUrl, setimageUrl] = useState("");
  const [state, setState] = useState("");
  const [enableLoadComments, setEnableLoadComments] = useState(true);
  const url =
    typeof window !== "undefined" && window.location.href
      ? window.location.href
      : "";

  useEffect(() => {
    const imageBuilder = imageUrlBuilder({
      projectId: "sanity io project id",
      dataset: "production",
    });

    setimageUrl(imageBuilder.image(image));
  }, [image]);

  return (
    <>
      // getting meta tags using custom components
      <Layout
        title={title}
        image={imageUrl}
        slug={pageSlug}
        description={excerpt}
      ></Layout>
      //using the defualt prescribed way from nextjs docs
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta property="og:url" content={url} />

        <meta property="og:description" content={excerpt} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={imageUrl} />
      </Head>
      <div>// html code</div>
    </>
  );
};

export const getServerSideProps = async (pageContext) => {
  const pageSlug = pageContext.query.slug;

  if (!pageSlug) {
    return {
      notFound: true,
    };
  }

  const query = encodeURIComponent(
    `*[ _type == 'post' && slug.current == '${pageSlug}' ]`,
    { pageSlug }
  );
  const url = "url comes here";

  const result = await fetch(url).then((res) => res.json());
  const post = result.result[0];

  if (!post) {
    return {
      notFound: true,
    };
  } else {
    return {
      props: {
        body: post.body,
        title: post.title,
        image: post.mainImage,
        date: post.publishedAt,
        excerpt: post.excerpt,
      },
    };
  }
};

export default Post;
