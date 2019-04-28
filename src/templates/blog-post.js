import React from "react";
import Helmet from "react-helmet";
import get from "lodash/get";
import styled from "styled-components";
import { LIGHT_SHADE, BOX_SHADOW, LIGHT_ACCENT } from "../style";
import { postTypeFromPath, postTypeColors } from "../utils/utils";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image";

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

const StyledTag = styled(Link)`
  padding: 3px 8px;
  background-color: ${LIGHT_ACCENT};
  color: white;
  margin: 0 10px 5px 0;
  border-radius: 0.1rem;
  border: solid 1px ${LIGHT_ACCENT};
  white-space: nowrap;
  display: inline-block;

  &:hover {
    background-color: ${LIGHT_ACCENT};
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
    let featured_image = get(
      post,
      "frontmatter.featured_image.childImageSharp.fluid"
    );
    if (!featured_image)
      featured_image = get(post, "frontmatter.featured_image.publicURL");

    return (
      <div>
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
              {typeof featured_image === "string" ? (
                <img src={featured_image} alt={post.frontmatter.title} />
              ) : (
                <Img fluid={featured_image} alt={post.frontmatter.title} />
              )}
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
    markdownRemark(
      fileAbsolutePath: { regex: "/content//" }
      frontmatter: { path: { eq: $postpath } }
    ) {
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
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid_tracedSVG
            }
          }
        }
      }
    }
  }
`;
