import React from "react";
import Card from "../components/Card";
import BlogPlaceholder from "./blog_placeholder.svg";
import get from "lodash/get";
import { Link } from "gatsby";
import Img from "gatsby-image";
import styled from "styled-components";
import { LIGHT_ACCENT, BOX_SHADOW, HEADER_FONT } from "../style";
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

const CardImage = styled.div`
  & img {
    margin-bottom: 0;
  }
`;

const image = (path, imageProps = { alt: "presentational" }) => {
  if (typeof path === "string") {
    if (imageProps.className && typeof imageProps.className === "string")
      imageProps.className += " native-img";
    else imageProps.className = "native-img";
    return (
      <CardImage path={path}>
        {/* trust us eslint, we're putting in alt tags */}
        {/* eslint-disable-next-line */}
        <img src={path} {...imageProps} />
      </CardImage>
    );
  } else if (path) {
    return (
      <CardImage>
        <Img fluid={path} {...imageProps} />
      </CardImage>
    );
  }

  return null;
};

class BlogList extends React.Component {
  renderPostCard(p) {
    const postURL = `/${postTypeFromPath(p.node.fileAbsolutePath || "")}/${
      p.node.fields.post_slug
    }`;
    const postType = postTypeFromPath(p.node.fileAbsolutePath || "");
    const postTypePlural = postTypeFromPath(p.node.fileAbsolutePath || "", {
      plural: true
    });
    let featured_image = get(
      p.node,
      "frontmatter.featured_image.childImageSharp.fluid"
    );
    if (!featured_image)
      featured_image = get(p.node, "frontmatter.featured_image.publicURL");
    return (
      <Card
        date={<Link to={postURL}>{p.node.frontmatter.date}</Link>}
        header={<Link to={postURL}>{p.node.frontmatter.title}</Link>}
        key={p.node.fields.post_slug}
        image={({ className }) => (
          <Link to={postURL} className={className}>
            {image(featured_image, { alt: p.node.frontmatter.title }) || (
              <BlogPlaceholder />
            )}
          </Link>
        )}
      >
        <div>
          <div>{p.node.excerpt}</div>
          <StyledBadge postType={postType}>
            <Link to={`/${postTypePlural}`}>{postTypePlural}</Link>
          </StyledBadge>
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
