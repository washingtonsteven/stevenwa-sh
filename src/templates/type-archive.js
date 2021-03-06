import React from "react";
import Home from "../pages/everything";
import get from "lodash/get";
import { graphql } from "gatsby";

class TypeArchiveTemplate extends React.Component {
  render() {
    const siteTitle = get(this.props, "data.site.siteMetadata.title");
    const type = get(this.props, "pageContext.type");
    const title = (() => {
      if (type === "posts") return "Blog Posts";
      if (type === "projects") return "All Projects";
      return null;
    })();
    return (
      <Home
        {...this.props}
        title={title}
        helmetTitle={`type:${this.props.pageContext.type} | ${siteTitle}`}
      />
    );
  }
}

export default TypeArchiveTemplate;

export const typeQuery = graphql`
  query TypeArchive($typeRegex: String!) {
    ...siteMeta
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fileAbsolutePath: { regex: $typeRegex } }
      limit: 1000
    ) {
      ...postListData
    }
    allImageSharp(filter: { sizes: { originalName: { eq: "face.jpg" } } }) {
      edges {
        node {
          sizes {
            src
            srcSet
            sizes
          }
        }
      }
    }
  }
`;
