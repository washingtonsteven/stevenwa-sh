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
  LIGHTER_ACCENT
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
  transition: box-shadow 0.2s linear;
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
  }

  &:hover {
    text-decoration: none;
    box-shadow: ${BOX_SHADOW_HOVER};

    span {
      text-decoration: underline;
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

  @media (max-width: ${MOBILE_WIDTH}) {
    .card-img {
      max-height: 150px;
      display: block;
      margin: 0 auto;
    }
  }
`;

const ArticleCard = ({ article }) => {
  const post_url = `${article.fields.post_type}/${article.fields.post_slug}`;
  const post_image =
    get(article, "frontmatter.featured_image.childImageSharp.fluid") ||
    get(article, "frontmatter.featured_image.publicURL");
  const post_title = get(article, "frontmatter.title");

  const cardProperties = {
    date: <Link to={post_url}>{get(article, "frontmatter.date")}</Link>,
    header: <Link to={post_url}>{post_title}</Link>,
    image: () => (
      <Link to={post_url}>
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
  grid-template-columns: 1fr 1fr;
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
  margin-bottom: 30px;
  grid-gap: ${rhythm(1)};

  @media (max-width: ${MOBILE_WIDTH}) {
    grid-template-columns: 1fr;
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
          {posts.map(({ node: post }) => (
            <ArticleCard article={post} key={post.fields.post_slug} />
          ))}
        </ArticleSection>
      </HighlightGrid>
      <section style={{ padding: "60px 0" }}>
        This is another section down below
      </section>
      <section style={{ padding: "60px 0" }}>
        This is another section down below
      </section>
      <section style={{ padding: "60px 0" }}>
        This is another section down below
      </section>
      <section style={{ padding: "60px 0" }}>
        This is another section down below
      </section>
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
    allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }) {
      ...postListData
    }
  }
`;
