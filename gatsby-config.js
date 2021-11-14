require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`
});

const { GH_REPO, GH_USER, GH_TOKEN, GH_BRANCH, GH_FILE_PATTERNS } = process.env;

const GH_REPO_URL =
    GH_USER && GH_TOKEN
        ? `https://${GH_USER}:${GH_TOKEN}@github.com/${GH_REPO}`
        : `https://github.com/${GH_REPO}`;

const singular = function(str) {
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

var netlifyCmsPaths = {
  resolve: `gatsby-plugin-netlify-cms-paths`,
  options: {
    cmsConfig: `./static/admin/config.yml`
  }
};

module.exports = {
  siteMetadata: {
    title: "stevenwa.sh",
    author: "Steven Washington",
    description: "Web. Games. Nerdery.",
    siteUrl: "https://stevenwa.sh",
    twitter: "https://twitter.com/esaevian",
    github: "https://github.com/washingtonsteven"
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: "pages"
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/components`,
        name: "components"
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content`,
        name: "content"
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/static/assets`,
        name: "assets"
      }
    },
    `gatsby-transformer-yaml`,
    netlifyCmsPaths,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590
            }
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`
            }
          },
          "gatsby-remark-prismjs",
          "gatsby-remark-copy-linked-files",
          "gatsby-remark-smartypants"
        ]
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: "src/utils/typography.js"
      }
    },
    `gatsby-plugin-react-svg`,
    `gatsby-plugin-layout`,
    {
      resolve: `gatsby-plugin-netlify-cms`,
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`
      }
    },
    {
      resolve: "gatsby-source-git",
      options: {
          name: GH_REPO,
          remote: GH_REPO_URL,
          branch: GH_BRANCH || "main",
          patterns: ((patterns) => {
              try {
                  return JSON.parse(patterns);
              } catch (e) {
                  console.warn("Bad input to GH_FILE_PATTERNS", patterns);
                  return null;
              }
          })(GH_FILE_PATTERNS),
      },
    },
    {
      resolve: "gatsby-plugin-feed",
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                const edgeUrl =
                  site.siteMetadata.siteUrl +
                  "/" +
                  postTypeFromPath(edge.node.fileAbsolutePath) +
                  "/" +
                  edge.node.fields.post_slug;

                const enclosure = {
                  url: edge.node.frontmatter.featured_image
                    ? site.siteMetadata.siteUrl +
                      edge.node.frontmatter.featured_image.publicURL
                    : site.siteMetadata.siteUrl + "/sw_favicon.svg"
                };

                const imgTag = `<img src="${enclosure.url}" />`;

                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  url: edgeUrl,
                  guid: edgeUrl,
                  enclosure: enclosure,
                  custom_elements: [
                    { "content:encoded": imgTag + edge.node.html }
                  ]
                });
              });
            },
            query: `
              {
                allMarkdownRemark(
                  limit:1000, 
                  sort: { fields: [frontmatter___date], order: DESC }
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fileAbsolutePath
                      fields {
                        post_slug
                      }
                      frontmatter {
                        path
                        title
                        date
                        tags
                        featured_image {
                          publicURL
                        }
                      }
                    }
                  }
                }
              }
            `,
            output: "/feed.xml"
          }
        ]
      }
    }
  ]
};
