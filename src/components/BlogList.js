import React from "react";
import Card from "../components/Card";
import BlogPlaceholder from "./blog_placeholder.svg";
import get from "lodash/get";
import Link from "gatsby-link";
import styled from "styled-components";
import {
  MAIN_COLOR,
  LIGHT_ACCENT,
  BOX_SHADOW,
  HEADER_FONT,
  TEXT_COLOR
} from "../style";
import { postTypeFromPath, postTypeColors } from "../utils/utils";
import { rhythm } from "../utils/typography";

const StyledBadge = styled.div`
  background-color: white;
  padding: 3px 10px;
  box-shadow: ${BOX_SHADOW};
  position: absolute;
  top: ${props => props.top || rhythm(1 / 2)};
  right: ${props => props.right || rhythm(-1 / 2)};
  border-radius: 0.1rem;
  background-color: ${props =>
    props.postType && postTypeColors[props.postType]
      ? postTypeColors[props.postType]
      : LIGHT_ACCENT};
  color: ${props => props.textColor || "white"};
  font-size: 0.75rem;
  font-family: ${HEADER_FONT};
  text-transform: uppercase;

  a {
    color: ${props => props.textColor || "white"};
  }
`;

const Warning = styled.h4`
  color: white;
  background-color: #a80000;
  padding: 3px 5px;
`;

const CardImage = styled.div`
  & img {
    margin-bottom: 0;
  }
`;

const image = (path, imgProps = {}) =>
  path ? (
    <CardImage path={path}>
      <img src={path} {...imgProps}  alt="presentational" />
    </CardImage>
  ) : null;

class BlogList extends React.Component {
  renderPostCard(p) {
    const postURL = `/${postTypeFromPath(p.node.fileAbsolutePath || "")}${
      p.node.frontmatter.path
    }`;
    const postType = postTypeFromPath(p.node.fileAbsolutePath || "");
    const postTypePlural = postTypeFromPath(p.node.fileAbsolutePath || "", {
      plural: true
    });
    const featured_image_props = {
      srcSet: get(p.node, "frontmatter.featured_image.childImageSharp.sizes.srcSet"),
      sizes: get(p.node, "frontmatter.featured_iamge.childImageSharp.sizes.sizes")
    }
    return (
      <Card
        date={<Link to={postURL}>{p.node.frontmatter.date}</Link>}
        header={<Link to={postURL}>{p.node.frontmatter.title}</Link>}
        key={p.node.frontmatter.path}
        image={({ className }) => (
          <Link to={postURL} className={className}>
            {image(get(p.node, "frontmatter.featured_image.publicURL"), featured_image_props) || (
              <BlogPlaceholder />
            )}
          </Link>
        )}
      >
        <div>
          {!p.node.frontmatter.published && (
            <Warning>This post is not yet published</Warning>
          )}
          <div>{p.node.excerpt}</div>
          <StyledBadge postType={postType}>
            <Link to={`/${postTypePlural}`}>{postTypePlural}</Link>
          </StyledBadge>
          {p.node.frontmatter.featured && (
            <StyledBadge
              top={rhythm(1.5)}
              textColor={TEXT_COLOR}
              postType="featured"
            >
              Featured
            </StyledBadge>
          )}
        </div>
      </Card>
    );
  }
  render() {
    const firstPost = this.props.posts && this.props.posts[0];
    const restPosts = this.props.posts && this.props.posts.slice(1);

    return (
      <div className={this.props.className}>
        {firstPost && this.renderPostCard(firstPost)}
        {this.props.featuredPost &&
          this.renderPostCard(this.props.featuredPost)}
        {restPosts && restPosts.map(p => this.renderPostCard(p))}
      </div>
    );
  }
}

export default BlogList;
