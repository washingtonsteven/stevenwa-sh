import React from "react";
import Link from "gatsby-link";
import Home from "../pages";
import get from "lodash/get";

class TagArchiveTemplate extends React.Component {
  render() {
    const siteTitle = get(this.props, "data.site.siteMetadata.title");
    return (
      <Home
        {...this.props}
        helmetTitle={`tagged:${this.props.pathContext.tag} | ${siteTitle}`}
      />
    );
  }
}

export default TagArchiveTemplate;

export const tagQuery = graphql`
  query TagArchive($tag: String!) {
    site {
      siteMetadata {
        title
        author
        twitter
        github
      }
    }
    allMarkdownRemark(filter: { frontmatter: { tags: { eq: $tag } } }) {
      edges {
        node {
          id
          excerpt
          fileAbsolutePath
          frontmatter {
            path
            title
            date(formatString: "DD MMMM, YYYY")
            featured_image {
              publicURL
            }
            featured
          }
        }
      }
    }
  }
`;
