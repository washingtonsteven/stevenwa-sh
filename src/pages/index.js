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
  SOCIAL_ICON_GRAY,
  TWITTER_BLUE,
  GITHUB_BLACK,
  LIGHTER_ACCENT,
  animateIn
} from "../style";
import { rhythm } from "../utils/typography";
import Card from "../components/Card";

import TwitterIcon from "../components/twitter.svg";
import GithubIcon from "../components/github.svg";

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
    fill: ${SOCIAL_ICON_GRAY};
  }
`;

const StyledGithubIcon = styled(GithubIcon).attrs({ className: "github" })`
  path {
    fill: ${SOCIAL_ICON_GRAY};
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
  svg {
    max-width: 25px;
    vertical-align: middle;

    path {
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
  margin-bottom: ${rhythm(1)};
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
  }

  @media (max-width: ${MOBILE_WIDTH}) {
    position: static;
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
          <HeaderCard disableAnimation>
            <h2 style={{ margin: 0, textAlign: "center" }}>
              Featured Projects
            </h2>
          </HeaderCard>
          {posts.map(({ node: post }, i) => (
            <ArticleCard article={post} key={post.fields.post_slug} index={i} />
          ))}
        </ArticleSection>
      </HighlightGrid>
      <ContentCard style={{ padding: "60px 0" }} disableAnimation>
        <h2>Around the Web</h2>
        <ul>
          <li>Email</li>
          <li>LinkedIn</li>
          <li>Dev.to</li>
          <li>Glitch.me</li>
        </ul>
        <br />
      </ContentCard>
      <ContentCard style={{ padding: "60px 0" }} disableAnimation>
        <h2>Everything else</h2>
        link to /everything
      </ContentCard>
      <ContentCard style={{ padding: "60px 0" }} disableAnimation>
        <h2>For Fun</h2>
        For fun: Tumblr, Discord,
        Spotify(https://open.spotify.com/user/esaevian? ye) Youtube Destiny 2
        twitch
      </ContentCard>
      <ContentCard style={{ padding: "60px 0" }} disableAnimation>
        This is another section down below
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
