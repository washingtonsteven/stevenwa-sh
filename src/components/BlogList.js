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
  border-radius: 0.3rem;
  background-color: ${props =>
    props.postType && postTypeColors[props.postType]
      ? postTypeColors[props.postType]
      : LIGHT_ACCENT};
  color: ${props => props.textColor || "white"};
  font-size: 0.75rem;
  font-family: ${HEADER_FONT};
  text-transform: uppercase;
`;

const image = path =>
  path ? (
    <div>
      <img
        src={path}
        style={{ marginBottom: 0, display: "block" }}
        alt="featured-image"
      />
    </div>
  ) : null;

class BlogList extends React.Component {
  renderPostCard(p) {
    const postURL = `/${postTypeFromPath(p.node.fileAbsolutePath || "")}${
      p.node.frontmatter.path
    }`;
    return (
      <Card
        date={<Link to={postURL}>{p.node.frontmatter.date}</Link>}
        header={<Link to={postURL}>{p.node.frontmatter.title}</Link>}
        key={btoa(p.node.frontmatter.path)}
        image={({ className }) => (
          <Link to={postURL} className={className}>
            {image(get(p.node, "frontmatter.featured_image.publicURL")) || (
              <BlogPlaceholder />
            )}
          </Link>
        )}
      >
        <div>
          <div>{p.node.excerpt}</div>
          <StyledBadge
            postType={postTypeFromPath(p.node.fileAbsolutePath || "")}
          >
            {postTypeFromPath(p.node.fileAbsolutePath || "", {
              plural: true
            })}
          </StyledBadge>
          {p.node.frontmatter.featured && (
            <StyledBadge
              top={rhythm(1.75)}
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
    return (
      <div className={this.props.className}>
        {this.props.featuredPost &&
          this.renderPostCard(this.props.featuredPost)}
        {this.props.posts && this.props.posts.map(p => this.renderPostCard(p))}
      </div>
    );
  }
}

export default BlogList;
