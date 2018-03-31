import React from "react";
import Helmet from "react-helmet";
import Link from "gatsby-link";
import get from "lodash/get";
import styled from "styled-components";
import {
  LIGHT_SHADE,
  BOX_SHADOW,
  LIGHT_ACCENT,
  DARK_ACCENT,
  MAIN_COLOR
} from "../style";
import { postTypeFromPath, postTypeColors } from "../utils/utils";

const StyledBlogPost = styled.div`
  background-color: white;
  margin: 35px 20px;
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
  }

  blockquote {
    font-style: italic;
    padding-left: 20px;
    border-left: solid 4px #aaa;
  }
`;

const StyledBackLink = styled(Link)`
  padding: 5px 15px;
  background-color: white;
  box-shadow: ${BOX_SHADOW};
  margin-left: 20px;
`;

const StyledTag = styled(Link)`
  padding: 3px 8px;
  background-color: ${LIGHT_SHADE};
  color: ${LIGHT_ACCENT};
  margin: 0 10px 5px 0;
  border-radius: 0.2rem;
  border:solid 1px ${LIGHT_ACCENT};
  white-space:nowrap;
  display:inline-block;

  &:hover {
    background-color: ${LIGHT_ACCENT}
    color: ${LIGHT_SHADE};
  }
`;

const Warning = styled.h4`
  color: white;
  background-color: red;
  padding: 3px 5px;
`;

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark;
    const postType = postTypeFromPath(post.fileAbsolutePath);
    const siteTitle = get(this.props, "data.site.siteMetadata.title");

    return (
      <div>
        <StyledBackLink to="/">{`\u2190`} Back</StyledBackLink>
        <StyledBlogPost postType={postType}>
          <Helmet title={`${post.frontmatter.title} | ${siteTitle}`} />
          <h1>{post.frontmatter.title}</h1>
          <p>{post.frontmatter.date}</p>
          {!post.frontmatter.published && (
            <Warning>This post is not yet published</Warning>
          )}
          {post.frontmatter.tags && (
            <div style={{ marginBottom: "25px" }}>
              {post.frontmatter.tags.map(t => (
                <StyledTag to={`/tagged/${t}`} key={t}>
                  #{t}
                </StyledTag>
              ))}
            </div>
          )}

          {post.frontmatter.featured_image && (
            <div className="featured-image" style={{ padding: 0 }}>
              <img src={post.frontmatter.featured_image.publicURL} />
            </div>
          )}
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
        tags
        published
        featured_image {
          publicURL
        }
      }
    }
  }
`;
