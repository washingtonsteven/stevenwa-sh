const singular = function(str) {
  if (!str) return str;
  if (str.charAt(str.length - 1) !== "s") return str;
  if (str.charAt(str.length - 2) === "e")
    return str.substring(0, str.length - 2);
  return str.substring(0, str.length - 1);
};

const postTypeFromPath = function(path, opts = {}) {
  const matches = path.match(/src\/pages\/([^\/]+)/);
  return opts.plural ? matches && matches[1] : singular(matches && matches[1]);
};

module.exports = {
  siteMetadata: {
    title: "stevenwa.sh",
    author: "Steven Washington",
    description: "Stuff that Steve's talkin' about.",
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
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        //trackingId: `ADD YOUR TRACKING ID HERE`,
      }
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: "src/utils/typography.js"
      }
    },
    `@jacobmischka/gatsby-plugin-react-svg`,
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
                  edge.node.frontmatter.path;

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
                  sort: { fields: [frontmatter___date], order: DESC },
                  filter: { frontmatter: { published: { eq: true } } }
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fileAbsolutePath
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
