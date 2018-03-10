const _ = require("lodash");
const Promise = require("bluebird");
const path = require("path");
const select = require(`unist-util-select`);
const fs = require(`fs-extra`);

const remarkQuery = type => `
  {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/${type}/.*\\\\.md$/" } }
      limit: 1000
    ) {
      edges {
        node {
          frontmatter {
            path
          }
        }
      }
    }
  }
`;

const createTypePages = ({ result, slug, reject, createPage, blogPost }) => {
  if (result.errors) {
    console.log(result.errors);
    reject(result.errors);
  }

  _.each(result.data.allMarkdownRemark.edges, edge => {
    createPage({
      path: `/${slug}${edge.node.frontmatter.path}`,
      component: blogPost,
      context: {
        postpath: edge.node.frontmatter.path
      }
    });
  });
};

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;

  return new Promise((resolve, reject) => {
    const pages = [];
    const blogPost = path.resolve("./src/templates/blog-post.js");

    resolve(
      graphql(remarkQuery("posts"))
        .then(result => {
          createTypePages({
            result,
            reject,
            createPage,
            blogPost,
            slug: "post"
          });
        })
        .then(() => graphql(remarkQuery("projects")))
        .then(result => {
          createTypePages({
            result,
            reject,
            createPage,
            blogPost,
            slug: "project"
          });
        })
    );
  });
};
