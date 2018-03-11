import React from "react";
import BoxWithHeader from "../components/BoxWithHeader";
import BlogPlaceholder from "./blog_placeholder.svg";
import get from "lodash/get";
import { MAIN_COLOR } from "../style";

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
            <BoxWithHeader
              header={p.node.frontmatter.title}
              key={btoa(p.node.frontmatter.path)}
              image={
                image(get(p.node, "frontmatter.featured_image.publicURL")) ||
                BlogPlaceholder
              }
              color={MAIN_COLOR}
            >
              {p.node.excerpt}
            </BoxWithHeader>
          ))}
      </div>
    );
  }
}

export default BlogList;
