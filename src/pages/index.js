import React from "react";
import styled from "styled-components";
import BlogList from "../components/BlogList";
import Sidebar from "../components/Sidebar";
import Helmet from "react-helmet";
import { rhythm } from "../utils/typography";

import get from "lodash/get";
import { LIGHT_ACCENT, DARK_SHADE } from "../style";

const StyledHome = styled.div`
  display: grid;
  padding: 0 ${rhythm(1)};
  grid-template-columns: 40% 1fr;
  grid-template-areas: "sidebar main";
  grid-column-gap: ${rhythm(1)};

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    grid-column-gap: 0;
    grid-template-areas:
      "sidebar"
      "main";
  }
`;

const StyledSidebar = styled(Sidebar)`
  grid-area: sidebar;
  align-self: start;
  position: sticky;
  top: ${rhythm(1)};

  @media (max-width: 600px) {
    position: static;
  }
`;

const StyledBlogList = styled(BlogList)`
  grid-area: main;
`;

class Home extends React.Component {
  render() {
    const siteTitle = get(this.props, "data.site.siteMetadata.title");
    const allPosts = get(this, "props.data.allMarkdownRemark.edges");
    const featuredPostArr = get(this, "props.data.featuredPost.edges");
    let featuredPost = null;
    let posts = null;

    if (featuredPostArr && featuredPostArr.length) {
      featuredPost = featuredPostArr[0];
      posts = allPosts.filter(p => p.node.id !== featuredPost.node.id);
    } else {
      posts = [...allPosts];
    }

    return (
      <StyledHome>
        <Helmet title={this.props.helmetTitle || siteTitle} />
        <StyledSidebar className="staticSidebar" />
        <StyledBlogList posts={posts} featuredPost={featuredPost} />
      </StyledHome>
    );
  }
}

export default Home;

export const query = graphql`
  query HomeQuery {
    site {
      siteMetadata {
        title
      }
    }
    featuredPost: allMarkdownRemark(
      limit: 1
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { featured: { eq: true } } }
    ) {
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
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
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
