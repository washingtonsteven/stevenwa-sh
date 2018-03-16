import React from "react";
import Card from "../components/Card";
import BlogPlaceholder from "./blog_placeholder.svg";
import get from "lodash/get";
import Link from "gatsby-link";
import { MAIN_COLOR, LIGHT_ACCENT } from "../style";
import { postTypeFromPath } from "../utils/utils";

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
            <Card
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
              {p.node.excerpt}
            </Card>
          ))}
      </div>
    );
  }
}

export default BlogList;
