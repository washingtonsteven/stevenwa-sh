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
  query TypeArchive($typeRegex: String!) {
    ...siteMeta
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: $typeRegex } }
      limit: 1000
    ) {
      ...postListData
    }
  }
`;
