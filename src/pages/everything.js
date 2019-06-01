import React from "react";
import styled from "styled-components";
import BlogList from "../components/BlogList";
import Helmet from "react-helmet";
import { rhythm } from "../utils/typography";
import { graphql } from "gatsby";

import get from "lodash/get";
import { MOBILE_WIDTH } from "../style";
import BlogListHeader from "../components/BlogListHeader";

const StyledHome = styled.div`
  display: grid;
  padding: 0 ${rhythm(1)};
  grid-template-columns: 1fr;
  grid-column-gap: ${rhythm(1)};

  @media (max-width: ${MOBILE_WIDTH}) {
    grid-template-columns: 1fr;
    grid-column-gap: 0;
    grid-template-areas: "main";
  }
`;

const StyledBlogList = styled(BlogList)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: ${rhythm(1)};

  @media (max-width: ${MOBILE_WIDTH}) {
    grid-template-columns: 1fr;
    grid-column-gap: 0;
  }
`;

class AllPosts extends React.Component {
  render() {
    const siteTitle = get(this.props, "data.site.siteMetadata.title");
    const allPosts = get(this, "props.data.allMarkdownRemark.edges");

    return (
      <StyledHome>
        <Helmet title={this.props.helmetTitle || siteTitle} />
        <BlogListHeader title={this.props.title || "Blog Posts & Projects"} disableEverything={this.props["*"] === 'everything'} />
        <StyledBlogList posts={allPosts} featuredPost={null} />
      </StyledHome>
    );
  }
}

export default AllPosts;

export const query = graphql`
  query AllListingQuery {
    ...siteMeta
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fileAbsolutePath: { regex: "/content//" } }
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
