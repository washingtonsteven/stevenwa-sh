import React from "react";
import styled from "styled-components";
import BlogList from "../components/BlogList";
import Sidebar from "../components/Sidebar";
import { rhythm } from "../utils/typography";

import get from "lodash/get";
import { LIGHT_ACCENT, DARK_SHADE } from "../style";

const StyledHome = styled.div`
  display: grid;
  padding: 0 ${rhythm(1)};
  grid-template-columns: 33% 1fr;
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
`;

const StyledBlogList = styled(BlogList)`
  grid-area: main;
`;

class Home extends React.Component {
  componentDidMount() {
    this.props.updatePageColor && this.props.updatePageColor(LIGHT_ACCENT);
    this.props.updateBackgroundColor &&
      this.props.updateBackgroundColor(DARK_SHADE);
  }
  render() {
    const posts = get(this, "props.data.allMarkdownRemark.edges");

    return (
      <StyledHome>
        <StyledSidebar className="staticSidebar" />
        <StyledBlogList posts={posts} />
        <pre>{JSON.stringify(this.props.data, null, 1)}</pre>
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
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fileAbsolutePath
          frontmatter {
            path
            title
            date(formatString: "DD MMMM, YYYY")
            featured_image {
              publicURL
            }
          }
        }
      }
    }
  }
`;
