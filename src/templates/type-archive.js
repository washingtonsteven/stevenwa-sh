import React from "react";
import Link from "gatsby-link";
import Home from "../pages";
import get from "lodash/get";

class TypeArchiveTemplate extends React.Component {
  render() {
    const siteTitle = get(this.props, "data.site.siteMetadata.title");
    return (
      <Home
        {...this.props}
        helmetTitle={`type:${this.props.pathContext.type} | ${siteTitle}`}
      />
    );
  }
}

export default TypeArchiveTemplate;

export const typeQuery = graphql`
  query TypeArchive($typeRegex: String!, $showDrafts: Boolean) {
    ...siteMeta
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        fileAbsolutePath: { regex: $typeRegex }
        frontmatter: { published: { ne: $showDrafts } }
      }
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
