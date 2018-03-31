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
  query TagArchive($tag: String!, $showDrafts: Boolean) {
    ...siteMeta
    allMarkdownRemark(
      filter: {
        frontmatter: { tags: { eq: $tag }, published: { ne: $showDrafts } }
      }
    ) {
      ...postListData
    }
  }
`;
