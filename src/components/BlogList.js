import React from "react";
import Card from "../components/Card";
import BlogPlaceholder from "./blog_placeholder.svg";
import get from "lodash/get";
import Link from "gatsby-link";
import styled from "styled-components";
import { MAIN_COLOR, LIGHT_ACCENT, BOX_SHADOW, HEADER_FONT } from "../style";
import { postTypeFromPath } from "../utils/utils";
import { rhythm } from "../utils/typography";

const StyledCard = styled(Card)`
  position: relative;
  overflow: inherit;
`;

const StyledBadge = styled.div`
  background-color: white;
  padding: 5px 15px;
  box-shadow: ${BOX_SHADOW};
  position: absolute;
  top: ${rhythm(1 / 2)};
  left: ${rhythm(-1)};
  border-radius: 0.3rem;
  background-color: ${LIGHT_ACCENT};
  color: white;
  font-size: 0.75rem;
  font-family: ${HEADER_FONT};
  text-transform: uppercase;
`;

const image = path =>
  path
    ? ({ className }) => (
        <div className={className}>
          <img
            src={path}
            style={{ marginBottom: 0, display: "block" }}
            alt="featured-image"
          />
        </div>
      )
    : null;

class BlogList extends React.Component {
  render() {
    return (
      <div className={this.props.className}>
        {this.props.posts &&
          this.props.posts.map(p => (
            <StyledCard
              header={
                <Link
                  to={`/${postTypeFromPath(p.node.fileAbsolutePath || "")}${
                    p.node.frontmatter.path
                  }`}
                >
                  {p.node.frontmatter.title}
                </Link>
              }
              key={btoa(p.node.frontmatter.path)}
              image={
                image(get(p.node, "frontmatter.featured_image.publicURL")) ||
                BlogPlaceholder
              }
            >
              <div>
                {p.node.excerpt}
                <StyledBadge>
                  {postTypeFromPath(p.node.fileAbsolutePath || "", {
                    plural: true
                  })}
                </StyledBadge>
              </div>
            </StyledCard>
          ))}
      </div>
    );
  }
}

export default BlogList;
