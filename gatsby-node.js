const _ = require("lodash");
const Promise = require("bluebird");
const path = require("path");
const select = require(`unist-util-select`);
const fs = require(`fs-extra`);
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`
});

const showDrafts = process.env.GATSBY_SHOW_DRAFTS === "false" ? false : null;

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

const tagsQuery = `
{
  tags: allMarkdownRemark(filter: { frontmatter: {tags:{ne: null}} }) {
    edges {
      node {
        frontmatter {
          tags
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
    const tagArchive = path.resolve("./src/templates/tag-archive.js");
    const typeArchive = path.resolve("./src/templates/type-archive.js");

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
          createPage({
            path: `/posts/`,
            component: typeArchive,
            context: {
              typeRegex: `/posts/.*\\.md$/`,
              type: "posts",
              showDrafts
            }
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
          createPage({
            path: `/projects/`,
            component: typeArchive,
            context: {
              typeRegex: `/projects/.*\\.md$/`,
              type: "projects",
              showDrafts
            }
          });
        })
        .then(() => graphql(tagsQuery))
        .then(result => {
          const allTags = result.data.tags.edges.reduce((acc, v, i) => {
            const newTags = v.node.frontmatter.tags.filter(
              t => !acc.includes(t)
            );
            return [...acc, ...newTags];
          }, []);

          _.each(allTags, tag => {
            createPage({
              path: `/tagged/${tag}`,
              component: tagArchive,
              context: { tag, showDrafts }
            });
          });
        })
    );
  });
};

exports.onCreatePage = ({ page, boundActionCreators }) => {
  const { createPage } = boundActionCreators;
  return new Promise(resolve => {
    const updatedContext = Object.assign(page.context, {
      showDrafts
    });
    page.context = updatedContext;
    createPage(page);
    resolve();
  });
};
