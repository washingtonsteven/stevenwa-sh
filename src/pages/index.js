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

const StyledFace = styled(Img)`
  max-width: 250px;
  border-radius: 50%;
  justify-self: center;
  width: 100%;
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

const Header = ({ image, title, description, twitter, github }) => {
  return (
    <StyledHeader>
      <h1>{title}</h1>
      <p>{description}</p>
      <StyledFace fluid={image} />
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
  grid-column: 2;
  display: grid;
  grid-template-columns: ${props =>
    props.children.length > 3 ? "1fr 1fr" : "1fr"};
  grid-column-gap: ${rhythm(1 / 2)};

  article:last-child {
    margin-bottom: 0;
  }

  @media (max-width: ${MOBILE_WIDTH}) {
    grid-column: 1;
    grid-template-columns: 1fr;
  }
`;

const StyledHome = styled.div`
  width: 100%;
  padding: 0 20px;
`;

const HighlightGrid = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
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

  h2 {
    margin: 0;
    text-align: center;
  }

  @media (max-width: ${MOBILE_WIDTH}) {
    position: static;
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
  const posts = get(data, "allMarkdownRemark.edges");
  const headerImage = get(data, "file.childImageSharp.fluid");

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
                <span>Featured Projects</span>
              </h2>
            </Link>
          </HeaderCard>
          {posts.map(({ node: post }, i) => (
            <ArticleCard article={post} key={post.fields.post_slug} index={i} />
          ))}
        </ArticleSection>
      </HighlightGrid>
      <ContentCard disableAnimation disableHover>
        <h2>Hello! I make kick-butt websites.</h2>
        <p>
          My goal is to make the web better and better neat interactive
          thingies, games, stories, etc. I work on this on my own as well as a
          part of the{" "}
          <a
            href="https://www.connellypartners.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Connelly Partners
          </a>{" "}
          digital team.
        </p>
        <p>
          On the web side, I'm currently diving deep into React, plumbing the
          depths of what can be done with the library! Also React is a gateway
          drug to sweet modern Javascript. I'm also playing around with game
          development using Unity, Game Maker, and Twine.
        </p>
      </ContentCard>
      <ContentCard disableAnimation disableHover>
        <h2>Around the Web</h2>
        <LinkSection
          links={[
            {
              url: "mailto:washington.steven@gmail.com",
              title: "Email",
              icon: <FontAwesomeIcon icon="envelope" />
            },
            {
              url: "https://www.linkedin.com/in/svwashington/",
              title: "LinkedIn",
              hoverColor: "#0077B5",
              icon: <FontAwesomeIcon icon={["fab", "linkedin"]} />
            },
            {
              url: "https://dev.to/washingtonsteven",
              title: "Dev.to",
              icon: <FontAwesomeIcon icon={["fab", "dev"]} />
            },
            {
              url: "https://glitch.com/@washingtonsteven",
              title: "Glitch.me",
              hoverColor: "rgb(195, 75, 255)",
              icon: <FontAwesomeIcon icon="fish" />
            }
          ]}
        />
      </ContentCard>
      <EverythingCard disableAnimation>
        <Link to="/everything">
          <h2>
            <span>All Projects, Blog Posts, etc.</span>
            <FontAwesomeIcon icon="arrow-right" />
          </h2>
        </Link>
      </EverythingCard>
      <ContentCard disableAnimation disableHover>
        <h2>More stuff</h2>
        <LinkSection
          links={[
            {
              url: "https://open.spotify.com/user/esaevian",
              title: "Spotify",
              hoverColor: "rgb(29, 205, 85)",
              icon: <FontAwesomeIcon icon={["fab", "spotify"]} />
            },
            {
              url: "https://www.last.fm/user/esaevian",
              title: "Last.fm",
              hoverColor: "rgb(178, 0, 1)",
              icon: <FontAwesomeIcon icon={["fab", "lastfm"]} />
            },
            {
              url: "https://www.youtube.com/user/esaevian",
              title: "Youtube",
              hoverColor: "rgb(252, 13, 27)",
              icon: <FontAwesomeIcon icon={["fab", "youtube"]} />
            },
            {
              url: "https://www.twitch.tv/esaevian",
              title: "Twitch",
              hoverColor: "rgb(66, 47, 113)",
              icon: <FontAwesomeIcon icon={["fab", "twitch"]} />
            },
            {
              url: "https://steamcommunity.com/id/esaevian/",
              title: "Steam",
              hoverColor: "rgb(22, 24, 30)",
              icon: <FontAwesomeIcon icon={["fab", "steam"]} />
            }
          ]}
        />
      </ContentCard>
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
    allMarkdownRemark(
      filter: { fields: { post_type: { eq: "project" } } }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      ...postListData
    }
  }
`;
