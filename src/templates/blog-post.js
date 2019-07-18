import React from "react";
import Helmet from "react-helmet";
import get from "lodash/get";
import styled from "styled-components";
import {
  LIGHT_SHADE,
  BOX_SHADOW,
  LIGHT_ACCENT,
  DARKER_ACCENT,
  MOBILE_WIDTH,
  BOX_SHADOW_HOVER,
  TEXT_MAX_WIDTH,
  PARAGRAPH_MARGIN
} from "../style";
import { rhythm } from "../utils/typography";
import { postTypeFromPath, postTypeColors } from "../utils/utils";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image";

import GithubIcon from "../components/github.svg";

const StyledBlogPost = styled.div`
  background-color: white;
  margin: 0 ${rhythm(1)} 35px;
  box-shadow: ${BOX_SHADOW};
  padding-bottom: 20px;

  & > * {
    padding: 0 ${rhythm(1)};
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

  & > div {
    max-width: ${TEXT_MAX_WIDTH};
    margin: 0 auto;
  }

  p {
    margin: ${PARAGRAPH_MARGIN};
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

const StyledPostLinks = styled.div`
  display: grid;
  padding: 0 ${rhythm(1)};
  width: 100%;
  grid-template-columns: 1fr 1fr;
  @media (max-width: ${MOBILE_WIDTH}) {
    grid-template-columns: 1fr;
  }
`;

const PostLink = styled(Link)`
  position: relative;
  display: grid;
  align-items: center;
  padding: 0 25px;
  min-height: 150px;
  text-decoration: none;
  box-shadow: ${BOX_SHADOW};
  transition: box-shadow 0.2s ease-in-out;
  font-weight: normal;

  & > * {
    position: relative;
    z-index: 2;
  }

  span {
    text-decoration: none;
    position: relative;
    display: block;
    font-size: 1.6rem;

    &.eyebrow {
      font-size: 0.8rem;
      font-style: italic;
    }
  }

  &.align-right {
    grid-column: 2;
    span {
      text-align: right;
    }

    @media (max-width: ${MOBILE_WIDTH}) {
      grid-column: 1;
    }
  }

  &:hover {
    text-decoration: none;
    box-shadow: ${BOX_SHADOW_HOVER};
    span {
      color: white;
    }

    .background-image:before {
      background-color: rgba(0, 0, 0, 0.6);
    }
  }
`;

const BackgroundImage = styled.div.attrs({ className: "background-image" })`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  z-index: 1;
  overflow: hidden;
  transform: translate(-50%, -50%);

  &:before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.6);
    transition: background-color 0.2s ease-in-out;
    z-index: 1;
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
  renderPostLink(post, options = {}) {
    let post_image = get(
      post,
      "frontmatter.featured_image.childImageSharp.fluid"
    );
    if (!post_image) {
      post_image = get(post, "frontmatter.featured_image.publicURL");
    }
    return (
      <PostLink
        to={post.fields.post_type + "/" + post.fields.post_slug}
        className={options.align ? options.align : "align-left"}
      >
        {post_image && (
          <BackgroundImage>
            {typeof post_image === "object" ? (
              <Img fluid={post_image} alt={post.frontmatter.title} />
            ) : (
              <img src={post_image} alt={post.frontmatter.title} />
            )}
          </BackgroundImage>
        )}
        {options.eyebrow && <span className="eyebrow">{options.eyebrow}</span>}
        <span>{post.frontmatter.title}</span>
      </PostLink>
    );
  }
  render() {
    const post = this.props.data.markdownRemark;
    const postType = postTypeFromPath(post.fileAbsolutePath);
    const siteTitle = get(this.props, "data.site.siteMetadata.title");
    const featured_image = this.getFeaturedImage();

    const allPosts = get(this.props, "data.allMarkdownRemark.edges");

    const postIndex = allPosts.findIndex(({ node }) => node.id === post.id);

    const prevPost = postIndex === 0 ? null : allPosts[postIndex - 1].node;
    const nextPost =
      postIndex === allPosts.length - 1 ? null : allPosts[postIndex + 1].node;

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
            <div style={{ marginBottom: "25px", maxWidth: "none" }}>
              {post.frontmatter.tags.map(t => (
                <StyledTag to={`/tagged/${t}`} key={t}>
                  #{t}
                </StyledTag>
              ))}
            </div>
          )}

          {post.frontmatter.repo && (
            <div style={{ maxWidth: "none" }}>
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

          <div
            dangerouslySetInnerHTML={{ __html: post.html }}
            style={{ marginTop: "50px" }}
          />

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
        {(prevPost || nextPost) && (
          <StyledPostLinks>
            {nextPost &&
              this.renderPostLink(nextPost, { eyebrow: "Next Post" })}
            {prevPost &&
              this.renderPostLink(prevPost, {
                eyebrow: "Previous Post",
                align: "align-right"
              })}
          </StyledPostLinks>
        )}
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
    allMarkdownRemark(sort: { fields: frontmatter___date, order: ASC }) {
      edges {
        node {
          id
          fields {
            post_type
            post_slug
          }
          frontmatter {
            title
            featured_image {
              publicURL
              childImageSharp {
                fluid(maxHeight: 150) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`;
