import React from "react";
import Helmet from "react-helmet";
import get from "lodash/get";
import styled from "styled-components";
import {
  LIGHT_SHADE,
  BOX_SHADOW,
  LIGHT_ACCENT,
  DARKER_ACCENT,
  MOBILE_WIDTH
} from "../style";
import { postTypeFromPath, postTypeColors } from "../utils/utils";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image";

import GithubIcon from "../components/github.svg";

const StyledBlogPost = styled.div`
  background-color: white;
  margin: 0 0 35px;
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
    margin-top: 0;
    position: sticky;
    top: 50px;
    z-index: 2;

    @media (max-width: ${MOBILE_WIDTH}) {
      position: static;
    }
  }

  blockquote {
    font-style: italic;
    padding-left: 20px;
    border-left: solid 4px #aaa;
  }

  a {
    transition: color 0.3s ease-in-out;

    &:hover {
      color: ${DARKER_ACCENT};
    }
  }

  .project-screenshots .screenshot-container {
    max-width: 80%;
    margin: 0 auto;

    & > * {
      margin-bottom: 30px;
      padding: 5px;
      border: solid 1px #333;
    }
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
  transition: background 0.3s ease-in-out, color 0.3s ease-in-out !important;

  &:hover {
    background-color: ${DARKER_ACCENT};
    color: ${LIGHT_SHADE} !important;
  }
`;

const StyledBannerImage = styled.div`
  padding: 0;
  width: 100%;
  height: 350px;
  overflow: hidden;
  margin-top: -28px;
  position: relative;
  pointer-events: none;

  @media (max-width: ${MOBILE_WIDTH}) {
    height: auto;
  }

  & > * {
    margin: 0;
    display: block;
    width: 100%;
    min-height: 350px;
    position: absolute !important;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    @media (max-width: ${MOBILE_WIDTH}) {
      position: static !important;
      transform: none;
      min-height: 0;
    }
  }
`;

const StyledRepoLink = styled.div`
  margin-bottom: 25px;

  a {
    padding: 5px;
    background-color: #333;
    color: ${LIGHT_SHADE};
    text-decoration: none;
    display: inline-block;
    transition: background 0.2s ease-in-out !important;

    &:hover {
      background-color: #555 !important;
      color: ${LIGHT_SHADE} !important;
    }
  }

  svg {
    width: 25px;
    height: 25px;
    vertical-align: middle;
    margin-right: 5px;
  }
`;

class BlogPostTemplate extends React.Component {
  getFeaturedImage() {
    const post = this.props.data.markdownRemark;
    let featured_image = get(
      post,
      "frontmatter.featured_image.childImageSharp.fluid"
    );
    if (!featured_image)
      featured_image = get(post, "frontmatter.featured_image.publicURL");

    return featured_image;
  }
  render() {
    const post = this.props.data.markdownRemark;
    const postType = postTypeFromPath(post.fileAbsolutePath);
    const siteTitle = get(this.props, "data.site.siteMetadata.title");
    const featured_image = this.getFeaturedImage();
    return (
      <div>
        <StyledBlogPost postType={postType}>
          {featured_image && (
            <StyledBannerImage>
              {typeof featured_image === "string" ? (
                <img src={featured_image} alt="banner" />
              ) : (
                <Img fluid={featured_image} alt="banner" />
              )}
            </StyledBannerImage>
          )}
          <Helmet title={`${post.frontmatter.title} | ${siteTitle}`} />
          <h1>{post.frontmatter.title}</h1>
          <p>{post.frontmatter.date}</p>
          {post.frontmatter.tags && (
            <div style={{ marginBottom: "25px" }}>
              {post.frontmatter.tags.map(t => (
                <StyledTag to={`/tagged/${t}`} key={t}>
                  #{t}
                </StyledTag>
              ))}
            </div>
          )}

          {post.frontmatter.repo && (
            <div>
              <StyledRepoLink>
                <a
                  href={post.frontmatter.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {post.frontmatter.repo.toLowerCase().indexOf("github") >=
                  0 ? (
                    <>
                      <GithubIcon /> <span>Github</span>
                    </>
                  ) : (
                    "Repo Link »"
                  )}
                </a>
              </StyledRepoLink>
            </div>
          )}

          <div dangerouslySetInnerHTML={{ __html: post.html }} />

          {post.frontmatter.screenshots && (
            <div className="project-screenshots">
              <h2>Screenshots</h2>
              <div className="screenshot-container">
                {post.frontmatter.screenshots.map((img, i) => (
                  <Img
                    fluid={img.childImageSharp.fluid}
                    key={i}
                    alt={"screenshot"}
                  />
                ))}
              </div>
            </div>
          )}
        </StyledBlogPost>
      </div>
    );
  }
}

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostByPath($post_slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(
      fileAbsolutePath: { regex: "/content//" }
      fields: { post_slug: { eq: $post_slug } }
    ) {
      id
      html
      fileAbsolutePath
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        tags
        published
        repo
        screenshots {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid_tracedSVG
            }
          }
        }
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
