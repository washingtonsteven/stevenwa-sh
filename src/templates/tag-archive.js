import React from "react";
import Home from "../pages/everything";
import get from "lodash/get";
import { graphql } from "gatsby";

class TagArchiveTemplate extends React.Component {
  render() {
    const siteTitle = get(this.props, "data.site.siteMetadata.title");
    return (
      <Home
        {...this.props}
        helmetTitle={`tagged:${this.props.pageContext.tag} | ${siteTitle}`}
      />
    );
  }
}

export default TagArchiveTemplate;

export const tagQuery = graphql`
  query TagArchive($tag: String!) {
    ...siteMeta
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        fileAbsolutePath: { regex: "/content//" }
        frontmatter: { tags: { eq: $tag } }
      }
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
