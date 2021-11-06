import React from "react";
import { graphql, Link } from "gatsby";
import get from "lodash/get";
import Img from "gatsby-image";
import styled from "styled-components";
import {
  LIGHT_SHADE,
  MOBILE_WIDTH,
  BOX_SHADOW,
  BOX_SHADOW_HOVER,
  TWITTER_BLUE,
  GITHUB_BLACK,
  LIGHTER_ACCENT,
  MAIN_COLOR,
  animateIn
} from "../style";
import { rhythm } from "../utils/typography";
import Card from "../components/Card";

import TwitterIcon from "../components/twitter.svg";
import GithubIcon from "../components/github.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StyledHeader = styled.header`
  align-self: start;
  position: sticky;
  top: calc(50px + ${rhythm(0)});
  background-color: ${LIGHT_SHADE};
  padding: 20px;
  box-shadow: ${BOX_SHADOW};
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  opacity: 0;
  animation: ${animateIn} 0.3s ease-in-out forwards;

  @media (max-width: ${MOBILE_WIDTH}) {
    position: relative;
    top: 0;
  }
`;

const StyledTwitterIcon = styled(TwitterIcon).attrs({ className: "twitter" })`
  rect {
    opacity: 0;
  }
  path {
    fill: ${LIGHT_SHADE};
  }
`;

const StyledGithubIcon = styled(GithubIcon).attrs({ className: "github" })`
  path {
    fill: ${LIGHT_SHADE};
  }
`;

const StyledSocialLink = styled.a.attrs({
  target: "_blank",
  rel: "noreferrer noopenter"
})`
  display: block;
  margin: 15px auto;
  text-decoration: none;
  padding: 10px 20px;
  background-color: ${LIGHTER_ACCENT};
  box-shadow: ${BOX_SHADOW};
  transition: box-shadow 0.2s linear, background 0.2s linear;
  color: ${LIGHT_SHADE};
  width: 100%;
  max-width: 215px;
  font-weight: normal;
  svg {
    width: 25px !important;
    height: 25px !important;
    vertical-align: middle;

    path {
      fill: ${LIGHT_SHADE};
      transition: fill 0.2s ease-in-out;
    }
  }

  span {
    display: inline-block;
    margin-left: 15px;
    transition: color 0.2s linear;
  }

  &:hover {
    text-decoration: none;
    background-color: white;
    box-shadow: ${BOX_SHADOW_HOVER};

    span {
      text-decoration: none;
      color: ${LIGHTER_ACCENT};
    }

    svg {
      path {
        fill: ${props => props.hoverColor || MAIN_COLOR};
      }
    }

    svg.twitter {
      path {
        fill: ${TWITTER_BLUE};
      }
    }

    svg.github {
      path {
        fill: ${GITHUB_BLACK};
      }
    }
  }
`;

const Header = ({ title, description, twitter, github }) => {
  return (
    <StyledHeader>
      <h1>{title}</h1>
      <StyledSocialLink href={twitter}>
        <StyledTwitterIcon /> <span>@esaevian</span>
      </StyledSocialLink>
      <StyledSocialLink href={github}>
        <StyledGithubIcon /> <span>washingtonsteven</span>
      </StyledSocialLink>
    </StyledHeader>
  );
};

const StyledCard = styled(Card)`
  margin-bottom: ${rhythm(1)};
  padding-bottom: ${rhythm(1 / 1.5)};

  .card-img {
    max-height: 150px;
  }

  @media (max-width: ${MOBILE_WIDTH}) {
    .card-img {
      display: block;
      margin: 0 auto;
    }
  }
`;

const ArticleCard = ({ article, index }) => {
  const post_url = `/${article.fields.post_type}/${article.fields.post_slug}`;
  const post_image =
    get(article, "frontmatter.featured_image.childImageSharp.fluid") ||
    get(article, "frontmatter.featured_image.publicURL");
  const post_title = get(article, "frontmatter.title");

  const cardProperties = {
    index,
    date: <Link to={post_url}>{get(article, "frontmatter.date")}</Link>,
    header: <Link to={post_url}>{post_title}</Link>,
    image: ({ className }) => (
      <Link to={post_url} className={className}>
        {typeof post_image === "object" ? (
          <Img fluid={post_image} alt={post_title} className="card-img" />
        ) : (
          <img src={post_image} alt={post_title} className="card-img" />
        )}
      </Link>
    )
  };
  return <StyledCard {...cardProperties} />;
};

const ArticleSection = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: ${rhythm(1 / 2)};

  article:last-child {
    margin-bottom: 0;
  }

  @media (max-width: ${MOBILE_WIDTH}) {
    grid-template-columns: 1fr;
  }
`;

const StyledHome = styled.div`
  width: 100%;
  padding: 0 ${rhythm(1)};
`;

const HighlightGrid = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  margin-bottom: ${rhythm(2)};
  grid-gap: ${rhythm(1)};

  @media (max-width: ${MOBILE_WIDTH}) {
    grid-template-columns: 1fr;
  }
`;

const ContentCard = styled(Card)`
  margin-bottom: ${rhythm(0)};

  &:first-of-type {
    margin-bottom: ${rhythm(1)};
  }
`;

const HeaderCard = styled(Card)`
  background-color: ${LIGHTER_ACCENT};
  color: white;
  margin-bottom: ${rhythm(1)};
  position: sticky;
  top: 50px;
  z-index: 3;
  grid-column: 1 / 3;

  h2 {
    margin: 0;
    text-align: center;
  }

  @media (max-width: ${MOBILE_WIDTH}) {
    position: static;
    grid-column: 1;
  }

  a {
    color: ${LIGHT_SHADE};
  }
`;

const StyledLinkSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

  @media (max-width: ${MOBILE_WIDTH}) {
    grid-template-columns: 1fr;
  }
`;

const LinkSection = ({ links }) => (
  <StyledLinkSection>
    {links &&
      links.map(link => (
        <StyledSocialLink
          href={link.url}
          hoverColor={link.hoverColor}
          key={link.url}
        >
          {link.icon} <span>{link.title}</span>
        </StyledSocialLink>
      ))}
  </StyledLinkSection>
);

const EverythingCard = styled(ContentCard)`
  background-color: ${LIGHTER_ACCENT};
  color: white;
  padding: 0;
  user-select: none;
  text-align: center;

  & > div {
    padding: 0;
  }

  a {
    display: block;
    color: white;
    padding: ${rhythm(1)} ${rhythm(2)};

    &:hover {
      text-decoration: none;
    }
  }

  h2 {
    margin-bottom: 0;

    span {
      display: inline-block;
      margin-right: 20px;
    }
  }

  &:hover {
    position: relative;
    z-index: 4;
  }
`;

export default ({ data }) => {
  const [showIcon, setShowIcon] = React.useState(false);

  React.useEffect(() => {
    if (!showIcon) {
      setShowIcon(true);
    }
  }, [setShowIcon, showIcon]);

  const posts = get(data, "allMarkdownRemark.edges");
  const headerImage = get(data, "file.childImageSharp.fluid");
  const pageContent = get(data, "pagesYaml");

  return (
    <StyledHome>
      <HighlightGrid>
        <Header
          image={headerImage}
          title={get(data, "site.siteMetadata.author")}
          description={get(data, "site.siteMetadata.description")}
          twitter={get(data, "site.siteMetadata.twitter")}
          github={get(data, "site.siteMetadata.github")}
        />
        <ArticleSection>
          <HeaderCard disableAnimation disableHover>
            <Link to="/projects">
              <h2>
                <span>Projects</span>
              </h2>
            </Link>
          </HeaderCard>
          {posts.map(({ node: post }, i) => (
            <ArticleCard article={post} key={post.fields.post_slug} index={i} />
          ))}
        </ArticleSection>
      </HighlightGrid>
      <ContentCard disableAnimation disableHover>
        <h2>{pageContent.about_title}</h2>
        {pageContent.about_content.split("\n").map((para, i) => (
          <p key={i} dangerouslySetInnerHTML={{ __html: para }} />
        ))}
      </ContentCard>
      <ContentCard disableAnimation disableHover>
        <h2>me, but elsewhere</h2>
        <LinkSection
          links={pageContent.web_links.map(link => {
            let icon = link.icon.split(" ");
            if (icon.length === 1) icon = icon[0];
            return {
              ...link,
              icon: <FontAwesomeIcon icon={icon} />,
              hoverColor: link.color
            };
          })}
        />
        <LinkSection
          links={pageContent.social_links.map(link => {
            let icon = link.icon.split(" ");
            if (icon.length === 1) icon = icon[0];
            return {
              ...link,
              icon: <FontAwesomeIcon icon={icon} />,
              hoverColor: link.color
            };
          })}
        />
      </ContentCard>
      <EverythingCard disableAnimation>
        <Link to="/everything">
          <h2>
            <span>All Projects, Blog Posts, etc.</span>
            {showIcon && <FontAwesomeIcon icon="arrow-right" />}
          </h2>
        </Link>
      </EverythingCard>
    </StyledHome>
  );
};

export const query = graphql`
  query HomeQuery {
    ...siteMeta
    file(relativePath: { eq: "face.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 250) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    pagesYaml(template_key: { eq: "home-page" }) {
      about_title
      about_content
      web_links {
        color
        icon
        title
        url
      }
      social_links {
        color
        icon
        title
        url
      }
    }
    allMarkdownRemark(
      filter: { fields: { post_type: { eq: "project" } } }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      ...postListData
    }
  }
`;
