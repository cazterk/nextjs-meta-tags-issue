import React from "react";

import SEO from "./SEO";
const Layout = ({ children, title, description, image, slug, article }) => {
  return (
    <React.Fragment>
      <SEO
        title={title}
        description={description}
        image={image}
        slug={slug}
        article={article}
      />

      <main>{children}</main>
    </React.Fragment>
  );
};
export default Layout;
