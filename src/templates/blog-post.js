import React from "react";
import Helmet from "react-helmet";
import Link from "gatsby-link";
import get from "lodash/get";
import styled from "styled-components";
import { LIGHT_SHADE, BOX_SHADOW, LIGHT_ACCENT, DARK_ACCENT } from "../style";
import { postTypeFromPath, postTypeColors } from "../utils/utils";

const StyledBlogPost = styled.div`
  background-color: white;
  margin: 35px 20px;
  border-radius: 0.3rem;
  box-shadow: ${BOX_SHADOW};
  padding-bottom: 20px;

  & > * {
    padding: 0 20px;
  }

  & > h1 {
    background-color: ${props =>
      props.postType
        ? postTypeColors[props.postType] || LIGHT_ACCENT
        : LIGHT_ACCENT};
    color: white;
    padding: 20px;
    border-top-left-radius: 0.3rem;
    border-top-right-radius: 0.3rem;
  }

  blockquote {
    font-style: italic;
    padding-left: 20px;
    border-left: solid 4px #aaa;
  }
`;

const StyledBackLink = styled(Link)`
  padding: 5px 15px;
  border-radius: 0.3rem;
  background-color: white;
  box-shadow: ${BOX_SHADOW};
  margin-left: 20px;
`;

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark;
    const siteTitle = get(this.props, "data.site.siteMetadata.title");

    return (
      <div>
        <StyledBackLink to="/">{`\u2190`} Back</StyledBackLink>
        <StyledBlogPost postType={postTypeFromPath(post.fileAbsolutePath)}>
          <Helmet title={`${post.frontmatter.title} | ${siteTitle}`} />
          <h1>{post.frontmatter.title}</h1>
          <p>{post.frontmatter.date}</p>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </StyledBlogPost>
      </div>
    );
  }
}

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostByPath($postpath: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(frontmatter: { path: { eq: $postpath } }) {
      id
      html
      fileAbsolutePath
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`;
