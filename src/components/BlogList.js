import React from "react";
import BoxWithHeader from "../components/BoxWithHeader";

class BlogList extends React.Component {
  render() {
    return (
      <div className={this.props.className}>
        {this.props.posts &&
          this.props.posts.map(p => (
            <BoxWithHeader
              header={p.node.frontmatter.title}
              key={btoa(p.node.frontmatter.path)}
            >
              {p.node.excerpt}
            </BoxWithHeader>
          ))}
      </div>
    );
  }
}

export default BlogList;
