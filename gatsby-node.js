const _ = require("lodash");
const Promise = require("bluebird");
const path = require("path");
const select = require(`unist-util-select`);
const fs = require(`fs-extra`);

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`
});

const filenameFromPath = path => {
  const matches = path.match(/\/([^\/]+).md$/);
  if (matches && matches[1]) return matches[1];
  return null;
};

const singular = str => {
  if (!str) return str;
  if (str.charAt(str.length - 1) !== "s") return str;
  if (str.charAt(str.length - 2) === "e")
    return str.substring(0, str.length - 2);
  return str.substring(0, str.length - 1);
};

const postTypeFromPath = (path, opts = {}) => {
  const matches = path.match(/content\/([^/]+)/);
  return opts.plural ? matches && matches[1] : singular(matches && matches[1]);
};

const remarkQuery = type => `
  {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content\/${type}/" } }
      limit: 1000
    ) {
      edges {
        node {
          fields {
            post_slug
          }
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
  tags: allMarkdownRemark(filter: { fileAbsolutePath:{ regex: "/content\//" }, frontmatter: {tags:{ne: null}} }) {
    edges {
      node {
        fields {
          post_slug
        }
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
      path: `/${slug}/${edge.node.fields.post_slug}`,
      component: blogPost,
      context: {
        post_slug: edge.node.fields.post_slug
      }
    });
  });
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

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
              typeRegex: `/content\/posts/`,
              type: "posts"
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
              typeRegex: `/content\/projects/`,
              type: "projects"
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
              context: { tag }
            });
          });
        })
    );
  });
};

exports.onCreatePage = ({ page, actions }) => {
  const { createPage } = actions;
  return new Promise(resolve => {
    const updatedContext = Object.assign(page.context, {});
    page.context = updatedContext;
    createPage(page);
    resolve();
  });
};

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === "MarkdownRemark" && node.fileAbsolutePath) {
    createNodeField({
      node,
      name: "post_slug",
      value: filenameFromPath(node.fileAbsolutePath)
    });
    createNodeField({
      node,
      name: "post_type",
      value: postTypeFromPath(node.fileAbsolutePath)
    });
  }
};
